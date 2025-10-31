# Security Implementation Guide

## Overview

This document outlines the security features implemented in the IronHex website client-side application.

## 🔒 Security Features

### 1. Content Security Policy (CSP)

**Location:** `client/index.html`

A strict Content Security Policy has been implemented to prevent XSS attacks and unauthorized resource loading.

**Key Directives:**
- `default-src 'self'` - Only allow resources from same origin by default
- `script-src 'self' 'unsafe-inline' 'unsafe-eval'` - Scripts from same origin (note: inline/eval for React development)
- `style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com` - Styles from same origin and Font Awesome CDN
- `img-src 'self' data: https: http:` - Images from same origin and external sources
- `connect-src 'self' http://localhost:8000` - API connections to backend
- `object-src 'none'` - No plugins allowed
- `upgrade-insecure-requests` - Automatically upgrade HTTP to HTTPS

**Additional Security Headers:**
- `X-Content-Type-Options: nosniff` - Prevent MIME type sniffing
- `X-Frame-Options: SAMEORIGIN` - Prevent clickjacking
- `X-XSS-Protection: 1; mode=block` - Enable browser XSS protection
- `Referrer-Policy: strict-origin-when-cross-origin` - Control referrer information

### 2. Rate Limiting (Client-Side)

**Location:** `client/src/hooks/useRateLimit.ts`

Client-side rate limiting prevents abuse and excessive API calls.

**Implementation:**
```typescript
const rateLimit = useRateLimit('contact-form', {
  maxAttempts: 5,           // 5 attempts allowed
  windowMs: 5 * 60 * 1000,  // Within 5 minutes
  blockDurationMs: 15 * 60 * 1000  // 15 minute block if exceeded
});
```

**Features:**
- Tracks attempts using timestamps
- Persistent storage via localStorage
- Automatic cleanup of old attempts
- Visual feedback to users
- Configurable per feature (contact form, login, API calls, etc.)

**Usage Example:**
```typescript
if (!rateLimit.attempt()) {
  // Show error: Too many attempts
  return;
}
// Proceed with action
```

**Configuration:** `client/src/config/security.ts`
- Contact Form: 5 attempts per 5 minutes
- Login: 5 attempts per 15 minutes
- API Calls: 100 requests per minute

### 3. Input Sanitization

**Location:** `client/src/utils/sanitize.ts`

Comprehensive input sanitization prevents XSS, injection attacks, and malicious input.

**Functions:**

#### `sanitizeString(input: string)`
Removes dangerous patterns:
- HTML tags (`<script>`, `<iframe>`, etc.)
- Event handlers (`onclick`, `onerror`, etc.)
- JavaScript protocol (`javascript:`)
- Data protocol (except images)
- Excess whitespace

#### `sanitizeEmail(email: string)`
Validates and cleans email addresses:
- Converts to lowercase
- Removes invalid characters
- Ensures proper format

#### `sanitizeFormData<T>(data: T)`
Sanitizes entire form objects:
- Applies appropriate sanitization per field type
- Handles nested objects
- Type-safe with TypeScript

#### `validateLength(input, min, max)`
Enforces length constraints:
- Minimum length validation
- Maximum length validation
- Returns validation result with error message

**Example Usage:**
```typescript
const sanitizedData = sanitizeFormData({
  name: userInput.name,
  email: userInput.email,
  message: userInput.message
});
```

## 📋 Implementation in Contact Form

**Location:** `client/src/components/ContactForm.tsx`

The contact form demonstrates all three security features:

1. **Rate Limiting**
   - Maximum 5 submissions per 5 minutes
   - 15-minute cooldown if limit exceeded
   - Visual warnings at 2 attempts remaining

2. **Input Sanitization**
   - All inputs sanitized before submission
   - Email validation with regex
   - Length validation for all fields

3. **Validation Rules**
   - Name: 2-100 characters
   - Email: Valid format, max 254 characters
   - Subject: 0-200 characters (optional)
   - Message: 10-2000 characters

## 🛡️ Security Configuration

**Location:** `client/src/config/security.ts`

Centralized security configuration for easy maintenance:

```typescript
export const RATE_LIMITS = {
  CONTACT_FORM: { maxAttempts: 5, windowMs: 300000, blockDurationMs: 900000 },
  LOGIN: { maxAttempts: 5, windowMs: 900000, blockDurationMs: 1800000 },
  API: { maxAttempts: 100, windowMs: 60000, blockDurationMs: 60000 },
};

export const VALIDATION_LIMITS = {
  NAME: { min: 2, max: 100 },
  EMAIL: { max: 254 },
  SUBJECT: { max: 200 },
  MESSAGE: { min: 10, max: 2000 },
};

export const VALIDATION_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^\+?[\d\s\-()]+$/,
  URL: /^https?:\/\/.+/,
};
```

## 🔧 Best Practices

### For Developers

1. **Always sanitize user input** before processing or displaying
   ```typescript
   const safe = sanitizeString(userInput);
   ```

2. **Implement rate limiting** for any user action that:
   - Submits data to the server
   - Triggers expensive operations
   - Could be abused by bots

3. **Validate on both client and server**
   - Client validation for UX
   - Server validation for security

4. **Use centralized configuration**
   - Update `security.ts` for global changes
   - Don't hardcode security values

5. **Test security features**
   - Try to bypass rate limiting
   - Submit malicious input
   - Test with disabled JavaScript

### For Security

- **Never trust client-side validation alone** - Always validate on the server
- **Keep dependencies updated** - Run `npm audit` regularly
- **Monitor for vulnerabilities** - Use tools like Snyk or GitHub Dependabot
- **Review CSP regularly** - Tighten policies when possible
- **Log security events** - Track rate limit violations, suspicious input

## 🚀 Production Checklist

Before deploying to production:

- [ ] Update CSP `connect-src` to include production API URL
- [ ] Remove `'unsafe-inline'` and `'unsafe-eval'` from CSP if possible
- [ ] Enable HTTPS (CSP will auto-upgrade)
- [ ] Test all forms with sanitization enabled
- [ ] Verify rate limiting works across page reloads
- [ ] Check localStorage persistence
- [ ] Test error handling for blocked users
- [ ] Review and tighten validation rules
- [ ] Enable server-side rate limiting (backend)
- [ ] Set up security monitoring and alerts

## 📊 Monitoring

Key metrics to monitor:

1. **Rate Limit Violations**
   - Track how often users hit limits
   - Identify potential abuse patterns

2. **Sanitization Catches**
   - Log instances of dangerous input
   - Investigate sources of malicious data

3. **CSP Violations**
   - Browser reports CSP violations
   - Use report-uri directive to collect reports

4. **Form Submission Success Rate**
   - Monitor legitimate vs. blocked submissions
   - Adjust rate limits if too restrictive

## 🔗 Related Files

- `client/index.html` - CSP headers
- `client/src/hooks/useRateLimit.ts` - Rate limiting hook
- `client/src/utils/sanitize.ts` - Input sanitization utilities
- `client/src/config/security.ts` - Security configuration
- `client/src/components/ContactForm.tsx` - Implementation example

## 📚 Additional Resources

- [OWASP XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- [Content Security Policy Reference](https://content-security-policy.com/)
- [OWASP Input Validation Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html)
- [Rate Limiting Best Practices](https://cloud.google.com/architecture/rate-limiting-strategies-techniques)
