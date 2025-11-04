import { useState, useEffect, FormEvent } from 'react'
import RichTextEditor from './RichTextEditor'
import { apiUrl } from '../config/api'

interface Message {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}

interface CurrentUser {
  email: string;
  username: string;
}

interface Reply {
  id: number;
  reply_from_email: string;
  admin_username: string;
  reply_subject: string;
  reply_body: string;
  sent_at: string;
}

interface MessageReplyModalProps {
  message: Message;
  currentUser: CurrentUser;
  onClose: () => void;
  onSuccess: () => void;
}

interface ReplyFormData {
  replyFromEmail: string;
  replySubject: string;
  replyBody: string;
}

export default function MessageReplyModal({ message, currentUser, onClose, onSuccess }: MessageReplyModalProps) {
  const [formData, setFormData] = useState<ReplyFormData>({
    replyFromEmail: currentUser?.email || 'contact@ironhex-tech.com',
    replySubject: '',
    replyBody: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [replies, setReplies] = useState<Reply[]>([])
  const [showReplies, setShowReplies] = useState(false)

  useEffect(() => {
    // Set default email to current user's email and subject
    setFormData(prev => ({
      ...prev,
      replyFromEmail: currentUser?.email || 'contact@ironhex-tech.com',
      replySubject: `Re: ${message.subject || 'Your Inquiry'}`
    }))
    
    // Fetch existing replies
    fetchReplies()
  }, [message, currentUser])

  const fetchReplies = async () => {
    try {
      const token = localStorage.getItem('access_token')
      const response = await fetch(apiUrl(`/api/messages/${message.id}/replies`), {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setReplies(data)
      }
    } catch (err) {
      console.error('Failed to fetch replies:', err)
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const token = localStorage.getItem('access_token')
      const response = await fetch(apiUrl(`/api/messages/${message.id}/reply`), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          message_id: message.id,
          reply_from_email: formData.replyFromEmail,
          reply_subject: formData.replySubject,
          reply_body: formData.replyBody
        })
      })

      if (response.ok) {
        onSuccess()
        onClose()
      } else {
        const data = await response.json()
        setError(data.detail || 'Failed to send reply')
      }
    } catch (err) {
      setError('Failed to connect to server')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" 
          onClick={onClose}
        ></div>

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          {/* Header */}
          <div className="bg-primary px-6 py-4 flex items-center justify-between">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <h3 className="text-lg leading-6 font-medium text-white">
                Reply to Message
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="bg-white px-6 py-4">
            {/* Original Message */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-semibold text-gray-900">{message.name}</h4>
                  <p className="text-sm text-gray-600">{message.email}</p>
                  <p className="text-sm text-gray-500">{formatDate(message.timestamp)}</p>
                </div>
                {replies.length > 0 && (
                  <button
                    onClick={() => setShowReplies(!showReplies)}
                    className="text-sm text-primary hover:text-primary-dark flex items-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {replies.length} {replies.length === 1 ? 'Reply' : 'Replies'}
                  </button>
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Subject: {message.subject || 'No Subject'}</p>
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{message.message}</p>
              </div>
            </div>

            {/* Previous Replies */}
            {showReplies && replies.length > 0 && (
              <div className="mb-6 space-y-3">
                <h4 className="text-sm font-semibold text-gray-700">Previous Replies:</h4>
                {replies.map((reply) => (
                  <div key={reply.id} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">From: {reply.reply_from_email}</p>
                        <p className="text-xs text-gray-600">By: {reply.admin_username} • {formatDate(reply.sent_at)}</p>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-gray-700 mb-1">{reply.reply_subject}</p>
                    <div 
                      className="text-sm text-gray-700 prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: reply.reply_body }}
                    />
                  </div>
                ))}
              </div>
            )}

            {error && (
              <div className="mb-4 rounded-md bg-red-50 p-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            {/* Reply Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* From Email - Read Only */}
              <div>
                <label htmlFor="replyFromEmail" className="block text-sm font-medium text-gray-700 mb-2">
                  Sending From:
                </label>
                <input
                  type="email"
                  id="replyFromEmail"
                  value={formData.replyFromEmail}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 cursor-not-allowed"
                />
                <p className="mt-1 text-xs text-gray-500">Replies will be sent from your account email</p>
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="replySubject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject:
                </label>
                <input
                  type="text"
                  id="replySubject"
                  required
                  value={formData.replySubject}
                  onChange={(e) => setFormData({ ...formData, replySubject: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter subject"
                />
              </div>

              {/* Rich Text Editor */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message:
                </label>
                <RichTextEditor
                  value={formData.replyBody}
                  onChange={(html) => setFormData({ ...formData, replyBody: html })}
                  placeholder="Type your reply here..."
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending...' : 'Send Reply'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
