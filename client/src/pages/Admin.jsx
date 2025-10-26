import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ChangePasswordModal from '../components/ChangePasswordModal'
import MessageReplyModal from '../components/MessageReplyModal'

export default function Admin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState(localStorage.getItem('access_token') || '')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [messages, setMessages] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [mustChangePassword, setMustChangePassword] = useState(false)
  const [showReplyModal, setShowReplyModal] = useState(false)
  const [selectedMessage, setSelectedMessage] = useState(null)

  // Check if token is valid on mount
  useEffect(() => {
    if (token) {
      verifyToken()
    }
  }, [])

  const verifyToken = async () => {
    try {
      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const user = await response.json()
        setCurrentUser(user)
        setIsLoggedIn(true)
        setMustChangePassword(user.must_change_password)
        
        if (!user.must_change_password) {
          fetchMessages()
        }
      } else {
        // Token invalid or expired
        localStorage.removeItem('access_token')
        setToken('')
        setIsLoggedIn(false)
      }
    } catch (err) {
      console.error('Token verification failed:', err)
      localStorage.removeItem('access_token')
      setToken('')
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Create URL-encoded form data for OAuth2 password flow
      const formData = new URLSearchParams()
      formData.append('username', username)
      formData.append('password', password)

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData
      })

      if (response.ok) {
        const data = await response.json()
        const accessToken = data.access_token
        
        setToken(accessToken)
        localStorage.setItem('access_token', accessToken)
        
        // Get user info
        const userResponse = await fetch('/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        })
        
        if (userResponse.ok) {
          const user = await userResponse.json()
          setCurrentUser(user)
          setIsLoggedIn(true)
          setMustChangePassword(data.must_change_password || user.must_change_password)
          
          if (!data.must_change_password && !user.must_change_password) {
            fetchMessages(accessToken)
          }
        }
      } else {
        const errorData = await response.json()
        setError(errorData.detail || 'Invalid credentials')
      }
    } catch (err) {
      setError('Failed to connect to server')
    } finally {
      setLoading(false)
    }
  }

  const fetchMessages = async (authToken = token) => {
    setLoading(true)
    try {
      const response = await fetch('/api/messages', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setMessages(data)
      } else if (response.status === 401) {
        // Unauthorized - token expired
        setIsLoggedIn(false)
        localStorage.removeItem('access_token')
        setError('Session expired. Please login again.')
      } else {
        setError('Failed to fetch messages')
      }
    } catch (err) {
      setError('Failed to fetch messages')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
    } catch (err) {
      console.error('Logout error:', err)
    }
    
    setIsLoggedIn(false)
    setToken('')
    setUsername('')
    setPassword('')
    setMessages([])
    setCurrentUser(null)
    localStorage.removeItem('access_token')
  }

  const handleRefresh = () => {
    fetchMessages()
  }

  const handlePasswordChangeSuccess = async () => {
    setShowPasswordModal(false)
    setMustChangePassword(false)
    
    // Refresh user info to verify password was changed
    try {
      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.ok) {
        const user = await response.json()
        setCurrentUser(user)
        setMustChangePassword(user.must_change_password)
      }
    } catch (err) {
      console.error('Failed to refresh user info:', err)
    }
    
    fetchMessages()
  }

  const handleReply = (msg) => {
    setSelectedMessage(msg)
    setShowReplyModal(true)
  }
  
  const handleReplySuccess = () => {
    fetchMessages()
    setShowReplyModal(false)
    setSelectedMessage(null)
  }

  // Show password change modal if required
  if (isLoggedIn && mustChangePassword) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <ChangePasswordModal
          isRequired={true}
          onSuccess={handlePasswordChangeSuccess}
          onClose={() => {}} // Cannot close if required
        />
      </div>
    )
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Admin Login
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Sign in to access the admin dashboard
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-800">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg className="h-5 w-5 text-white group-hover:text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </span>
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>

            <div className="text-center">
              <Link 
                to="/forgot-password" 
                className="text-sm text-primary hover:text-primary-dark font-medium"
              >
                Forgot your password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="mt-2 text-sm text-gray-600">
                Welcome back, <span className="font-medium">{currentUser?.username}</span>
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/admin/users"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Manage Users
              </Link>
              <button
                onClick={handleRefresh}
                disabled={loading}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
              >
                <svg className={`-ml-1 mr-2 h-5 w-5 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Messages List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="mt-2 text-gray-600">Loading messages...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No messages</h3>
            <p className="mt-1 text-sm text-gray-500">No contact form submissions yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{msg.name}</h3>
                      <a href={`mailto:${msg.email}`} className="text-sm text-primary hover:underline">
                        {msg.email}
                      </a>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-gray-500 block">ID: {msg.id}</span>
                      <span className="text-xs text-gray-500 block mt-1">
                        {new Date(msg.timestamp).toLocaleDateString()} {new Date(msg.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="px-6 py-4">
                  <h4 className="text-md font-medium text-gray-900 mb-2">
                    <span className="text-gray-600">Subject:</span> {msg.subject || 'No subject'}
                  </h4>
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed mb-4">{msg.message}</p>
                  
                  {/* Reply Button */}
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleReply(msg)}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
                    >
                      <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                      </svg>
                      Reply to Message
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reply Modal */}
      {showReplyModal && selectedMessage && (
        <MessageReplyModal
          message={selectedMessage}
          onClose={() => {
            setShowReplyModal(false)
            setSelectedMessage(null)
          }}
          onSuccess={handleReplySuccess}
        />
      )}
    </div>
  )
}
