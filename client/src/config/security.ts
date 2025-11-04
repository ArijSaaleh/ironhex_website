/**
 * Security Configuration for IronHex Website
 * 
 * This file centralizes security-related configurations and constants.
 */

/**
 * Rate Limiting Configuration
 */
export const RATE_LIMITS = {
  // Contact form: 5 submissions per 5 minutes, 15 minute block
  CONTACT_FORM: {
    maxAttempts: 5,
    windowMs: 5 * 60 * 1000,
    blockDurationMs: 15 * 60 * 1000,
  },
  
  // Login attempts: 5 attempts per 15 minutes, 30 minute block
  LOGIN: {
    maxAttempts: 5,
    windowMs: 15 * 60 * 1000,
    blockDurationMs: 30 * 60 * 1000,
  },
  
  // API calls: 100 requests per minute
  API: {
    maxAttempts: 100,
    windowMs: 60 * 1000,
    blockDurationMs: 60 * 1000,
  },
} as const;

/**
 * Input Validation Limits
 */
export const VALIDATION_LIMITS = {
  // Contact form
  NAME: { min: 2, max: 100 },
  EMAIL: { max: 254 }, // RFC 5321
  SUBJECT: { max: 200 },
  MESSAGE: { min: 10, max: 2000 },
  
  // General
  URL: { max: 2048 },
  DESCRIPTION: { max: 500 },
  TITLE: { max: 150 },
} as const;

/**
 * Content Security Policy Directives
 * Applied in index.html
 */
export const CSP_DIRECTIVES = {
  'default-src': ["'self'"],
  'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
  'style-src': ["'self'", "'unsafe-inline'", 'https://cdnjs.cloudflare.com'],
  'font-src': ["'self'", 'https://cdnjs.cloudflare.com'],
  'img-src': ["'self'", 'data:', 'https:', 'http:'],
  'connect-src': ["'self'", 'http://localhost:8000', 'https://api.ironhex-tech.com'],
  'frame-src': ["'self'"],
  'object-src': ["'none'"],
  'base-uri': ["'self'"],
  'form-action': ["'self'"],
} as const;

/**
 * Security Headers
 */
export const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
} as const;

/**
 * Allowed origins for CORS (for reference, implemented on backend)
 */
export const ALLOWED_ORIGINS = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://ironhex-tech.com',
  'https://www.ironhex-tech.com',
] as const;

/**
 * Regex patterns for validation
 */
export const VALIDATION_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^\+?[\d\s\-()]+$/,
  URL: /^https?:\/\/.+/,
  ALPHANUMERIC: /^[a-zA-Z0-9]+$/,
  NO_HTML: /^[^<>]*$/,
} as const;

/**
 * Dangerous patterns to check for in user input
 */
export const DANGEROUS_PATTERNS = [
  /<script[^>]*>.*?<\/script>/gi,
  /javascript:/gi,
  /on\w+\s*=/gi,
  /<iframe/gi,
  /eval\(/gi,
  /expression\(/gi,
] as const;

/**
 * Check if a string contains dangerous patterns
 */
export function containsDangerousContent(input: string): boolean {
  return DANGEROUS_PATTERNS.some(pattern => pattern.test(input));
}

/**
 * Session timeout (milliseconds)
 */
export const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

/**
 * Token expiry times
 */
export const TOKEN_EXPIRY = {
  ACCESS_TOKEN: 15 * 60, // 15 minutes (in seconds for JWT)
  REFRESH_TOKEN: 7 * 24 * 60 * 60, // 7 days (in seconds for JWT)
  PASSWORD_RESET: 60 * 60, // 1 hour (in seconds)
} as const;
