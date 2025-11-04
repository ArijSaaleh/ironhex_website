"""Email Service using SendGrid"""
import os
from typing import Optional
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, Email, To, Content
from app.config.settings import settings


class EmailService:
    """Email service using SendGrid API"""
    
    def __init__(self):
        self.api_key = settings.SENDGRID_API_KEY
        self.from_email = settings.SENDGRID_FROM_EMAIL
        self.from_name = settings.SENDGRID_FROM_NAME
        self.notification_email = settings.NOTIFICATION_EMAIL
        
        if not self.api_key:
            print("⚠️  SendGrid API key not configured. Email sending will be disabled.")
            self.client = None
        else:
            self.client = SendGridAPIClient(self.api_key)
    
    def _is_configured(self) -> bool:
        """Check if SendGrid is properly configured"""
        return self.client is not None
    
    async def send_contact_notification(
        self,
        name: str,
        email: str,
        subject: str,
        message: str
    ) -> bool:
        """
        Send notification email to admin about new contact message
        
        Args:
            name: Contact's name
            email: Contact's email
            subject: Message subject
            message: Message content
            
        Returns:
            True if email sent successfully, False otherwise
        """
        if not self._is_configured():
            print(f"📧 [DEMO MODE] Would send notification about message from {name} <{email}>")
            return False
        
        try:
            # Create email content
            html_content = f"""
            <html>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                        <h2 style="color: #10b981; border-bottom: 2px solid #10b981; padding-bottom: 10px;">
                            🔔 New Contact Message
                        </h2>
                        
                        <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <p><strong>From:</strong> {name}</p>
                            <p><strong>Email:</strong> <a href="mailto:{email}">{email}</a></p>
                            <p><strong>Subject:</strong> {subject}</p>
                        </div>
                        
                        <div style="background-color: #fff; padding: 20px; border-left: 4px solid #10b981; margin: 20px 0;">
                            <p style="margin: 0; white-space: pre-wrap;">{message}</p>
                        </div>
                        
                        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">
                            <p>This notification was sent from your IRONHEX website contact form.</p>
                            <p style="margin: 0;">© {settings.SENDGRID_FROM_NAME} - Technology Solutions</p>
                        </div>
                    </div>
                </body>
            </html>
            """
            
            # Create the email message
            message = Mail(
                from_email=Email(self.from_email, self.from_name),
                to_emails=To(self.notification_email),
                subject=f"[IRONHEX] New Contact: {subject}",
                html_content=Content("text/html", html_content)
            )
            
            # Send the email
            response = self.client.send(message)
            
            if response.status_code in [200, 201, 202]:
                print(f"✅ Notification email sent successfully to {self.notification_email}")
                return True
            else:
                print(f"❌ Failed to send notification email. Status: {response.status_code}")
                return False
                
        except Exception as e:
            print(f"❌ Error sending notification email: {str(e)}")
            return False
    
    async def send_reply_email(
        self,
        to_email: str,
        to_name: str,
        from_email: str,
        subject: str,
        body: str
    ) -> bool:
        """
        Send reply email to customer
        
        Args:
            to_email: Recipient's email address
            to_name: Recipient's name
            from_email: Reply-to email address
            subject: Email subject
            body: Email body content
            
        Returns:
            True if email sent successfully, False otherwise
        """
        if not self._is_configured():
            print(f"📧 [DEMO MODE] Would send reply to {to_name} <{to_email}>")
            print(f"   Subject: {subject}")
            return False
        
        try:
            # Create HTML email with proper formatting
            html_content = f"""
            <html>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                        <div style="text-align: center; margin-bottom: 30px;">
                            <h1 style="color: #10b981; margin: 0;">IRONHEX</h1>
                            <p style="color: #6b7280; margin: 5px 0;">Technology Solutions</p>
                        </div>
                        
                        <div style="background-color: #fff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                            <p style="margin-bottom: 20px;">Dear {to_name},</p>
                            
                            <div style="white-space: pre-wrap; line-height: 1.8;">
                                {body}
                            </div>
                        </div>
                        
                        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px; text-align: center;">
                            <p>This email was sent from <a href="mailto:{from_email}" style="color: #10b981; text-decoration: none;">{from_email}</a></p>
                            <p style="margin: 10px 0;">
                                <strong style="color: #10b981;">IRONHEX</strong> - Secure Technology Solutions
                            </p>
                            <p style="margin: 0;">🇹🇳 Made with ❤️ in Tunisia</p>
                        </div>
                    </div>
                </body>
            </html>
            """
            
            # Create the email message
            message = Mail(
                from_email=Email(from_email, self.from_name),
                to_emails=To(to_email, to_name),
                subject=subject,
                html_content=Content("text/html", html_content)
            )
            
            # Send the email
            response = self.client.send(message)
            
            if response.status_code in [200, 201, 202]:
                print(f"✅ Reply email sent successfully to {to_name} <{to_email}>")
                return True
            else:
                print(f"❌ Failed to send reply email. Status: {response.status_code}")
                return False
                
        except Exception as e:
            print(f"❌ Error sending reply email: {str(e)}")
            return False
    
    async def send_demo_request_notification(
        self,
        platform_name: str,
        full_name: str,
        email: str,
        phone: str,
        company_name: Optional[str],
        message: Optional[str]
    ) -> bool:
        """
        Send notification about new demo request
        
        Args:
            platform_name: Name of the platform requested
            full_name: Requestor's full name
            email: Requestor's email
            phone: Requestor's phone
            company_name: Company name (optional)
            message: Additional message (optional)
            
        Returns:
            True if email sent successfully, False otherwise
        """
        if not self._is_configured():
            print(f"📧 [DEMO MODE] Would send demo request notification for {platform_name} from {full_name}")
            return False
        
        try:
            company_info = f"<p><strong>Company:</strong> {company_name}</p>" if company_name else ""
            message_info = f"""
                <div style="background-color: #fff; padding: 20px; border-left: 4px solid #10b981; margin: 20px 0;">
                    <p><strong>Message:</strong></p>
                    <p style="margin: 0; white-space: pre-wrap;">{message}</p>
                </div>
            """ if message else ""
            
            html_content = f"""
            <html>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                        <h2 style="color: #10b981; border-bottom: 2px solid #10b981; padding-bottom: 10px;">
                            🎯 New Demo Request
                        </h2>
                        
                        <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border: 2px solid #10b981;">
                            <p style="font-size: 18px; margin: 0;"><strong>Platform:</strong> {platform_name}</p>
                        </div>
                        
                        <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <p><strong>Name:</strong> {full_name}</p>
                            <p><strong>Email:</strong> <a href="mailto:{email}">{email}</a></p>
                            <p><strong>Phone:</strong> {phone}</p>
                            {company_info}
                        </div>
                        
                        {message_info}
                        
                        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">
                            <p>This notification was sent from your IRONHEX website demo request form.</p>
                            <p style="margin: 0;">© {settings.SENDGRID_FROM_NAME} - Technology Solutions</p>
                        </div>
                    </div>
                </body>
            </html>
            """
            
            # Create the email message
            message_obj = Mail(
                from_email=Email(self.from_email, self.from_name),
                to_emails=To(self.notification_email),
                subject=f"[IRONHEX] New Demo Request: {platform_name}",
                html_content=Content("text/html", html_content)
            )
            
            # Send the email
            response = self.client.send(message_obj)
            
            if response.status_code in [200, 201, 202]:
                print(f"✅ Demo request notification sent successfully")
                return True
            else:
                print(f"❌ Failed to send demo request notification. Status: {response.status_code}")
                return False
                
        except Exception as e:
            print(f"❌ Error sending demo request notification: {str(e)}")
            return False


# Global email service instance
email_service = EmailService()
