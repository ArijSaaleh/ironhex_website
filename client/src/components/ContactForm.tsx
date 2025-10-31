import { useState, FormEvent, ChangeEvent } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { useToast } from '../contexts/ToastContext'
import { sanitizeFormData, validateLength } from '../utils/sanitize'
import { useRateLimit, formatTimeRemaining } from '../hooks/useRateLimit'
import { RATE_LIMITS, VALIDATION_LIMITS, VALIDATION_PATTERNS } from '../config/security'
import { RippleButton } from './RippleButton'

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type Status = 'sending' | 'sent' | 'error' | 'rate-limited' | null;

interface ValidationErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function ContactForm() {
  const [form, setForm] = useState<FormData>({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<Status>(null)
  const [errors, setErrors] = useState<ValidationErrors>({})
  const { t } = useLanguage()
  const toast = useToast()
  
  // Rate limiting using centralized configuration
  const rateLimit = useRateLimit('contact-form', RATE_LIMITS.CONTACT_FORM)

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
    
    // Clear error for this field when user starts typing
    if (errors[name as keyof ValidationErrors]) {
      setErrors({ ...errors, [name]: undefined })
    }
  }

  function validateForm(): boolean {
    const newErrors: ValidationErrors = {}
    
    // Validate name
    const nameValidation = validateLength(
      form.name, 
      VALIDATION_LIMITS.NAME.min, 
      VALIDATION_LIMITS.NAME.max
    )
    if (!nameValidation.valid) {
      newErrors.name = nameValidation.message
    }
    
    // Validate email
    if (!VALIDATION_PATTERNS.EMAIL.test(form.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (form.email.length > VALIDATION_LIMITS.EMAIL.max) {
      newErrors.email = `Email must not exceed ${VALIDATION_LIMITS.EMAIL.max} characters`
    }
    
    // Validate message
    const messageValidation = validateLength(
      form.message, 
      VALIDATION_LIMITS.MESSAGE.min, 
      VALIDATION_LIMITS.MESSAGE.max
    )
    if (!messageValidation.valid) {
      newErrors.message = messageValidation.message
    }
    
    // Validate subject (optional but has max length)
    if (form.subject) {
      const subjectValidation = validateLength(
        form.subject, 
        0, 
        VALIDATION_LIMITS.SUBJECT.max
      )
      if (!subjectValidation.valid) {
        newErrors.subject = subjectValidation.message
      }
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    
    // Check rate limit
    if (rateLimit.isBlocked()) {
      const timeRemaining = rateLimit.getTimeUntilReset()
      setStatus('rate-limited')
      toast.warning(
        'Too many attempts',
        `Please wait ${formatTimeRemaining(timeRemaining)} before trying again.`
      )
      return
    }
    
    // Validate form
    if (!validateForm()) {
      toast.error('Validation failed', 'Please check the form for errors.')
      return
    }
    
    // Check rate limit and record attempt
    if (!rateLimit.attempt()) {
      setStatus('rate-limited')
      toast.warning(
        'Too many attempts',
        `Please wait ${formatTimeRemaining(rateLimit.getTimeUntilReset())} before trying again.`
      )
      return
    }
    
    setStatus('sending')
    
    try {
      // Sanitize form data before sending
      const sanitizedData = sanitizeFormData(form)
      
      const res = await fetch('http://localhost:8000/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sanitizedData)
      })
      
      if (res.ok) {
        setStatus('sent')
        setForm({ name: '', email: '', subject: '', message: '' })
        setErrors({})
        
        // Show success toast with undo option
        toast.success(
          'Message sent successfully!',
          "We'll get back to you soon.",
          {
            label: 'View',
            onClick: () => console.log('View message')
          }
        )
        
        // Reset status after delay
        setTimeout(() => setStatus(null), 3000)
      } else {
        setStatus('error')
        const errorData = await res.json().catch(() => ({}))
        toast.error(
          'Failed to send message',
          errorData.message || 'Please try again or contact us directly.'
        )
      }
    } catch (err) {
      console.error('Form submission error:', err)
      setStatus('error')
      toast.error(
        'Network error',
        'Unable to send message. Please check your connection and try again.'
      )
    }
  }

  const inputClasses = "w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-100 placeholder-gray-400 transition-shadow"

  const remainingAttempts = rateLimit.getRemainingAttempts()
  const isRateLimited = rateLimit.isBlocked()

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {isRateLimited && (
        <div className="p-4 bg-red-900/20 border border-red-500 rounded-lg text-red-400 text-sm">
          <p className="font-semibold">⚠️ Too many attempts</p>
          <p>Please wait {formatTimeRemaining(rateLimit.getTimeUntilReset())} before trying again.</p>
        </div>
      )}
      
      {!isRateLimited && remainingAttempts <= 2 && remainingAttempts > 0 && (
        <div className="p-3 bg-yellow-900/20 border border-yellow-500 rounded-lg text-yellow-400 text-sm">
          ⚠️ {remainingAttempts} attempt{remainingAttempts !== 1 ? 's' : ''} remaining
        </div>
      )}

      <div>
        <input 
          name="name"
          type="text"
          placeholder={t('contact.name')}
          value={form.name}
          onChange={handleChange}
          required
          maxLength={VALIDATION_LIMITS.NAME.max}
          disabled={isRateLimited}
          className={`${inputClasses} ${errors.name ? 'border-red-500' : ''}`}
        />
        {errors.name && (
          <p className="text-red-400 text-sm mt-1">{errors.name}</p>
        )}
      </div>
      
      <div>
        <input 
          name="email"
          type="email"
          placeholder={t('contact.email')}
          value={form.email}
          onChange={handleChange}
          required
          disabled={isRateLimited}
          className={`${inputClasses} ${errors.email ? 'border-red-500' : ''}`}
        />
        {errors.email && (
          <p className="text-red-400 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <input 
          name="subject"
          type="text"
          placeholder={t('contact.subject')}
          value={form.subject}
          onChange={handleChange}
          maxLength={VALIDATION_LIMITS.SUBJECT.max}
          disabled={isRateLimited}
          className={`${inputClasses} ${errors.subject ? 'border-red-500' : ''}`}
        />
        {errors.subject && (
          <p className="text-red-400 text-sm mt-1">{errors.subject}</p>
        )}
      </div>

      <div>
        <textarea 
          name="message"
          placeholder={t('contact.message')}
          value={form.message}
          onChange={handleChange}
          required
          rows={4}
          maxLength={VALIDATION_LIMITS.MESSAGE.max}
          disabled={isRateLimited}
          className={`${inputClasses} resize-none ${errors.message ? 'border-red-500' : ''}`}
        />
        {errors.message && (
          <p className="text-red-400 text-sm mt-1">{errors.message}</p>
        )}
        <p className="text-gray-500 text-xs mt-1">
          {form.message.length}/{VALIDATION_LIMITS.MESSAGE.max} characters
        </p>
      </div>

      <div className="flex items-center justify-between">
        <RippleButton 
          type="submit"
          disabled={isRateLimited}
          loading={status === 'sending'}
          variant="primary"
          size="lg"
        >
          {status === 'sending' ? t('contact.sending') : t('contact.send')}
        </RippleButton>
        
        {status === 'sent' && (
          <div className="flex items-center text-green-400 animate-fade-in">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">Sent successfully!</span>
          </div>
        )}
      </div>
    </form>
  )
}

