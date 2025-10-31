/**
 * Input sanitization utilities to prevent XSS and injection attacks
 */

/**
 * Sanitize string input by removing potentially dangerous characters and patterns
 */
export function sanitizeString(input: string): string {
  if (!input) return '';
  
  return input
    // Remove HTML tags
    .replace(/<[^>]*>/g, '')
    // Remove script tags and content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    // Remove event handlers
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
    // Remove javascript: protocol
    .replace(/javascript:/gi, '')
    // Remove data: protocol (except for images in specific contexts)
    .replace(/data:(?!image)/gi, '')
    // Trim whitespace
    .trim();
}

/**
 * Sanitize email input
 */
export function sanitizeEmail(email: string): string {
  if (!email) return '';
  
  // Basic email validation and sanitization
  const sanitized = email.toLowerCase().trim();
  
  // Remove any characters that shouldn't be in an email
  return sanitized.replace(/[^a-z0-9@._+-]/g, '');
}

/**
 * Sanitize form data object
 */
export function sanitizeFormData<T extends Record<string, any>>(data: T): T {
  const sanitized = { ...data };
  
  for (const key in sanitized) {
    if (typeof sanitized[key] === 'string') {
      if (key === 'email') {
        sanitized[key] = sanitizeEmail(sanitized[key]) as any;
      } else {
        sanitized[key] = sanitizeString(sanitized[key]) as any;
      }
    }
  }
  
  return sanitized;
}

/**
 * Validate and sanitize URL
 */
export function sanitizeUrl(url: string): string {
  if (!url) return '';
  
  try {
    const parsed = new URL(url);
    // Only allow http and https protocols
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return '';
    }
    return parsed.toString();
  } catch {
    return '';
  }
}

/**
 * Escape HTML special characters
 */
export function escapeHtml(text: string): string {
  if (!text) return '';
  
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  
  return text.replace(/[&<>"'/]/g, (char) => map[char]);
}

/**
 * Validate input length
 */
export function validateLength(
  input: string,
  min: number = 0,
  max: number = 1000
): { valid: boolean; message?: string } {
  const length = input.trim().length;
  
  if (length < min) {
    return { valid: false, message: `Input must be at least ${min} characters` };
  }
  
  if (length > max) {
    return { valid: false, message: `Input must not exceed ${max} characters` };
  }
  
  return { valid: true };
}
