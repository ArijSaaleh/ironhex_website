"""Input validation and sanitization utilities"""
import re
import html
from typing import Optional


def sanitize_html(text: str, max_length: Optional[int] = None) -> str:
    """
    Sanitize HTML content to prevent XSS attacks
    
    Args:
        text: Input text to sanitize
        max_length: Maximum allowed length (None for no limit)
    
    Returns:
        Sanitized text with HTML entities escaped
    """
    if not text:
        return ""
    
    # Escape HTML entities
    sanitized = html.escape(text)
    
    # Limit length if specified
    if max_length and len(sanitized) > max_length:
        sanitized = sanitized[:max_length]
    
    return sanitized


def validate_email_format(email: str) -> bool:
    """
    Validate email format using regex
    
    Args:
        email: Email address to validate
    
    Returns:
        True if valid, False otherwise
    """
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return bool(re.match(pattern, email))


def validate_username(username: str) -> tuple[bool, Optional[str]]:
    """
    Validate username format
    
    Args:
        username: Username to validate
    
    Returns:
        Tuple of (is_valid, error_message)
    """
    if not username:
        return False, "Username is required"
    
    if len(username) < 3:
        return False, "Username must be at least 3 characters"
    
    if len(username) > 50:
        return False, "Username cannot exceed 50 characters"
    
    # Allow alphanumeric and underscores only
    if not re.match(r'^[a-zA-Z0-9_]+$', username):
        return False, "Username can only contain letters, numbers, and underscores"
    
    return True, None


def validate_password_strength(password: str) -> tuple[bool, Optional[str]]:
    """
    Validate password strength
    
    Requirements:
    - At least 8 characters
    - At least one uppercase letter
    - At least one lowercase letter
    - At least one digit
    - At least one special character
    
    Args:
        password: Password to validate
    
    Returns:
        Tuple of (is_valid, error_message)
    """
    if not password:
        return False, "Password is required"
    
    if len(password) < 8:
        return False, "Password must be at least 8 characters long"
    
    if len(password) > 128:
        return False, "Password cannot exceed 128 characters"
    
    if not re.search(r'[A-Z]', password):
        return False, "Password must contain at least one uppercase letter"
    
    if not re.search(r'[a-z]', password):
        return False, "Password must contain at least one lowercase letter"
    
    if not re.search(r'\d', password):
        return False, "Password must contain at least one digit"
    
    if not re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
        return False, "Password must contain at least one special character (!@#$%^&*(),.?\":{}|<>)"
    
    # Check for common weak passwords
    weak_passwords = [
        'password', 'password123', '12345678', 'qwerty123',
        'admin123', 'letmein', 'welcome123', 'monkey123'
    ]
    if password.lower() in weak_passwords:
        return False, "This password is too common. Please choose a stronger password"
    
    return True, None


def sanitize_message_input(text: str, max_length: int = 5000) -> str:
    """
    Sanitize message input to prevent injection attacks
    
    Args:
        text: Message text to sanitize
        max_length: Maximum allowed length
    
    Returns:
        Sanitized message text
    """
    if not text:
        return ""
    
    # Remove any null bytes
    text = text.replace('\x00', '')
    
    # Escape HTML
    text = html.escape(text)
    
    # Limit length
    if len(text) > max_length:
        text = text[:max_length]
    
    # Remove excessive whitespace
    text = re.sub(r'\s+', ' ', text).strip()
    
    return text


def validate_url(url: str) -> bool:
    """
    Validate URL format
    
    Args:
        url: URL to validate
    
    Returns:
        True if valid, False otherwise
    """
    pattern = r'^https?://[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(/.*)?$'
    return bool(re.match(pattern, url))

