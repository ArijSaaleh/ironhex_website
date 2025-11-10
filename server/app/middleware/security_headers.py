"""Security headers middleware"""
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response
from app.config.settings import settings


class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    """
    Add security headers to all responses
    
    Headers added:
    - Strict-Transport-Security (HSTS)
    - X-Content-Type-Options
    - X-Frame-Options
    - X-XSS-Protection
    - Referrer-Policy
    - Permissions-Policy
    - Content-Security-Policy (strict)
    """
    
    async def dispatch(self, request: Request, call_next):
        response: Response = await call_next(request)
        
        # HSTS - Force HTTPS for 1 year
        response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
        
        # Prevent MIME type sniffing
        response.headers["X-Content-Type-Options"] = "nosniff"
        
        # Prevent clickjacking - SAMEORIGIN allows framing by same origin
        response.headers["X-Frame-Options"] = "SAMEORIGIN"
        
        # XSS Protection (legacy, but still useful for older browsers)
        response.headers["X-XSS-Protection"] = "1; mode=block"
        
        # Referrer Policy - Only send origin when navigating to different origins
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        
        # Permissions Policy - Disable unnecessary browser features
        response.headers["Permissions-Policy"] = (
            "geolocation=(), "
            "microphone=(), "
            "camera=(), "
            "payment=(), "
            "usb=(), "
            "magnetometer=(), "
            "gyroscope=(), "
            "accelerometer=()"
        )
        
        # Content Security Policy - Strict and secure
        # Note: This is for the API. Frontend should have its own CSP via meta tag or CDN
        if settings.DEBUG:
            # Development mode - more relaxed for debugging
            csp = (
                "default-src 'self'; "
                "script-src 'self'; "
                "style-src 'self'; "
                "font-src 'self'; "
                "img-src 'self' data:; "
                "connect-src 'self' http://localhost:* https://api.ironhex-tech.com; "
                "frame-ancestors 'none'; "
                "base-uri 'self'; "
                "form-action 'self'; "
                "object-src 'none'"
            )
        else:
            # Production mode - strict policy
            csp = (
                "default-src 'self'; "
                "script-src 'self'; "
                "style-src 'self'; "
                "font-src 'self'; "
                "img-src 'self'; "
                "connect-src 'self' https://api.ironhex-tech.com https://ironhexwebsite-production.up.railway.app; "
                "frame-ancestors 'none'; "
                "base-uri 'self'; "
                "form-action 'self'; "
                "object-src 'none'; "
                "upgrade-insecure-requests"
            )
        
        response.headers["Content-Security-Policy"] = csp
        
        return response

