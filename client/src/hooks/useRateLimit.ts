import { useRef, useCallback } from 'react';

interface RateLimitOptions {
  maxAttempts: number;
  windowMs: number;
  blockDurationMs?: number;
}

interface RateLimitResult {
  attempt: () => boolean;
  isBlocked: () => boolean;
  getRemainingAttempts: () => number;
  getTimeUntilReset: () => number;
  reset: () => void;
}

/**
 * Client-side rate limiting hook to prevent abuse
 * @param key - Unique identifier for the rate limit (e.g., 'contact-form')
 * @param options - Rate limiting configuration
 * @returns Rate limiting controls
 */
export function useRateLimit(
  key: string,
  options: RateLimitOptions
): RateLimitResult {
  const { maxAttempts, windowMs, blockDurationMs = windowMs } = options;
  
  const attemptsRef = useRef<number[]>([]);
  const blockedUntilRef = useRef<number>(0);

  const cleanupOldAttempts = useCallback(() => {
    const now = Date.now();
    attemptsRef.current = attemptsRef.current.filter(
      (timestamp) => now - timestamp < windowMs
    );
  }, [windowMs]);

  const isBlocked = useCallback((): boolean => {
    const now = Date.now();
    if (blockedUntilRef.current > now) {
      return true;
    }
    blockedUntilRef.current = 0;
    return false;
  }, []);

  const attempt = useCallback((): boolean => {
    if (isBlocked()) {
      return false;
    }

    cleanupOldAttempts();
    const now = Date.now();

    if (attemptsRef.current.length >= maxAttempts) {
      // Block the user
      blockedUntilRef.current = now + blockDurationMs;
      
      // Store in localStorage for persistence across page reloads
      try {
        localStorage.setItem(
          `rateLimit_${key}`,
          JSON.stringify({
            blockedUntil: blockedUntilRef.current,
            attempts: attemptsRef.current,
          })
        );
      } catch (e) {
        // Ignore localStorage errors
      }
      
      return false;
    }

    attemptsRef.current.push(now);
    
    // Update localStorage
    try {
      localStorage.setItem(
        `rateLimit_${key}`,
        JSON.stringify({
          blockedUntil: blockedUntilRef.current,
          attempts: attemptsRef.current,
        })
      );
    } catch (e) {
      // Ignore localStorage errors
    }

    return true;
  }, [key, maxAttempts, blockDurationMs, isBlocked, cleanupOldAttempts]);

  const getRemainingAttempts = useCallback((): number => {
    if (isBlocked()) return 0;
    cleanupOldAttempts();
    return Math.max(0, maxAttempts - attemptsRef.current.length);
  }, [maxAttempts, isBlocked, cleanupOldAttempts]);

  const getTimeUntilReset = useCallback((): number => {
    const now = Date.now();
    
    if (blockedUntilRef.current > now) {
      return blockedUntilRef.current - now;
    }
    
    cleanupOldAttempts();
    if (attemptsRef.current.length === 0) return 0;
    
    const oldestAttempt = Math.min(...attemptsRef.current);
    return Math.max(0, windowMs - (now - oldestAttempt));
  }, [windowMs, cleanupOldAttempts]);

  const reset = useCallback(() => {
    attemptsRef.current = [];
    blockedUntilRef.current = 0;
    try {
      localStorage.removeItem(`rateLimit_${key}`);
    } catch (e) {
      // Ignore localStorage errors
    }
  }, [key]);

  // Initialize from localStorage on mount
  const initializeFromStorage = useCallback(() => {
    try {
      const stored = localStorage.getItem(`rateLimit_${key}`);
      if (stored) {
        const data = JSON.parse(stored);
        const now = Date.now();
        
        if (data.blockedUntil > now) {
          blockedUntilRef.current = data.blockedUntil;
        }
        
        if (Array.isArray(data.attempts)) {
          attemptsRef.current = data.attempts.filter(
            (timestamp: number) => now - timestamp < windowMs
          );
        }
      }
    } catch (e) {
      // Ignore errors, start fresh
    }
  }, [key, windowMs]);

  // Initialize on first render
  useRef(() => initializeFromStorage()).current();

  return {
    attempt,
    isBlocked,
    getRemainingAttempts,
    getTimeUntilReset,
    reset,
  };
}

/**
 * Format milliseconds to human-readable time
 */
export function formatTimeRemaining(ms: number): string {
  const seconds = Math.ceil(ms / 1000);
  
  if (seconds < 60) {
    return `${seconds} second${seconds !== 1 ? 's' : ''}`;
  }
  
  const minutes = Math.ceil(seconds / 60);
  return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
}
