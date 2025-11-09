"""Rate limiting middleware to prevent brute force attacks"""
from fastapi import Request, HTTPException, status
from collections import defaultdict
from datetime import datetime, timedelta
from typing import Dict, Tuple
import asyncio


class RateLimiter:
    """Simple in-memory rate limiter"""
    
    def __init__(self):
        # Store: {identifier: [(timestamp, count)]}
        self.requests: Dict[str, list] = defaultdict(list)
        self.lock = asyncio.Lock()
    
    async def is_rate_limited(
        self,
        identifier: str,
        max_requests: int = 5,
        window_seconds: int = 300  # 5 minutes
    ) -> Tuple[bool, int]:
        """
        Check if identifier has exceeded rate limit
        Returns (is_limited, requests_made)
        """
        async with self.lock:
            now = datetime.utcnow()
            cutoff = now - timedelta(seconds=window_seconds)
            
            # Clean old entries
            self.requests[identifier] = [
                ts for ts in self.requests[identifier]
                if ts > cutoff
            ]
            
            # Check current count
            current_count = len(self.requests[identifier])
            
            if current_count >= max_requests:
                return True, current_count
            
            # Add new request timestamp
            self.requests[identifier].append(now)
            return False, current_count + 1
    
    async def cleanup_old_entries(self, max_age_hours: int = 24):
        """Periodically clean up old entries to prevent memory bloat"""
        async with self.lock:
            cutoff = datetime.utcnow() - timedelta(hours=max_age_hours)
            identifiers_to_remove = []
            
            for identifier, timestamps in self.requests.items():
                # Remove old timestamps
                self.requests[identifier] = [
                    ts for ts in timestamps if ts > cutoff
                ]
                # Mark empty lists for removal
                if not self.requests[identifier]:
                    identifiers_to_remove.append(identifier)
            
            # Remove empty entries
            for identifier in identifiers_to_remove:
                del self.requests[identifier]


# Global rate limiter instance
rate_limiter = RateLimiter()


async def check_rate_limit(
    request: Request,
    max_requests: int = 5,
    window_seconds: int = 300,
    identifier_key: str = "ip"
):
    """
    Check rate limit for a request
    
    Args:
        request: FastAPI request object
        max_requests: Maximum requests allowed
        window_seconds: Time window in seconds
        identifier_key: Either 'ip' for IP-based or 'username' for user-based
    """
    if identifier_key == "ip":
        # Get client IP
        forwarded = request.headers.get("X-Forwarded-For")
        identifier = forwarded.split(",")[0] if forwarded else request.client.host
    else:
        # For username-based limiting, extract from request body
        # This should be called after parsing the body
        identifier = getattr(request.state, "username", request.client.host)
    
    is_limited, count = await rate_limiter.is_rate_limited(
        identifier, max_requests, window_seconds
    )
    
    if is_limited:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail=f"Too many requests. Please try again later. ({count}/{max_requests} requests in {window_seconds}s)",
            headers={"Retry-After": str(window_seconds)}
        )
    
    return identifier

