import React, { useState, useEffect } from 'react'
import { api } from '../config/api'
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
  const [analytics, setAnalytics] = useState({
    totalMessages: 0,
    unreadMessages: 0,
    repliedMessages: 0,
    todayMessages: 0
  })

  // Check if token is valid on mount
  useEffect(() => {
    if (token) {
      verifyToken()
    }
  }, [])

  const verifyToken = async () => {
    try {
  const response = await fetch(api('/api/auth/me'), {
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

  const response = await fetch(api('/api/auth/login'), {
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
  const userResponse = await fetch(api('/api/auth/me'), {
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
  const response = await fetch(api('/api/messages'), {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setMessages(data)
        
        // Calculate analytics
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        
        const stats = {
          totalMessages: data.length,
          unreadMessages: data.filter(m => !m.is_read).length,
          repliedMessages: data.filter(m => m.reply_count > 0).length,
          todayMessages: data.filter(m => {
            const msgDate = new Date(m.timestamp)
            msgDate.setHours(0, 0, 0, 0)
            return msgDate.getTime() === today.getTime()
          }).length
        }
        setAnalytics(stats)
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
  await fetch(api('/api/auth/logout'), {
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
  const response = await fetch(api('/api/auth/me'), {
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
    <div className="min-h-screen bg-gray-50">
      {/* Top Banner with Logo */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-xl border-b-4 border-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src="/logo_icon.png" alt="IRONHEX Logo" className="h-16 w-auto" />
              <div>
                <h1 className="text-2xl font-bold text-white">IRONHEX</h1>
                <p className="text-gray-300 text-sm">Admin Control Panel</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-gray-400 text-xs uppercase tracking-wide">Logged in as</p>
                <p className="text-white font-semibold text-lg">{currentUser?.username}</p>
              </div>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-red-500 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 shadow-sm transition-all"
              >
                <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Action Buttons */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3 justify-end">
            <Link
              to="/admin/users"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-sm"
            >
              <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Manage Users
            </Link>
            <Link
              to="/admin/demo-requests"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-sm"
            >
              <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Demo Requests
            </Link>
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 shadow-sm"
            >
              <svg className={`-ml-1 mr-2 h-5 w-5 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Messages */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium uppercase tracking-wide">Total Messages</p>
                <p className="text-4xl font-bold mt-2">{analytics.totalMessages}</p>
              </div>
              <div className="bg-blue-400 bg-opacity-30 rounded-full p-3">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-blue-100">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              All time
            </div>
          </div>

          {/* Unread Messages */}
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium uppercase tracking-wide">Unread</p>
                <p className="text-4xl font-bold mt-2">{analytics.unreadMessages}</p>
              </div>
              <div className="bg-orange-400 bg-opacity-30 rounded-full p-3">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-orange-100">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Needs attention
            </div>
          </div>

          {/* Replied Messages */}
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium uppercase tracking-wide">Replied</p>
                <p className="text-4xl font-bold mt-2">{analytics.repliedMessages}</p>
              </div>
              <div className="bg-green-400 bg-opacity-30 rounded-full p-3">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-100">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {analytics.totalMessages > 0 ? Math.round((analytics.repliedMessages / analytics.totalMessages) * 100) : 0}% response rate
            </div>
          </div>

          {/* Today's Messages */}
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium uppercase tracking-wide">Today</p>
                <p className="text-4xl font-bold mt-2">{analytics.todayMessages}</p>
              </div>
              <div className="bg-purple-400 bg-opacity-30 rounded-full p-3">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-purple-100">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Last 24 hours
            </div>
          </div>
        </div>

        {/* Messages Section Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Recent Messages</h2>
          <p className="text-sm text-gray-600 mt-1">Manage and respond to contact form submissions</p>
        </div>

        {/* Messages List */}
        {loading ? (
          <div className="text-center py-16 bg-white rounded-xl shadow">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-4 border-primary"></div>
            <p className="mt-4 text-gray-600 font-medium">Loading messages...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow">
            <div className="bg-gray-100 rounded-full p-4 w-20 h-20 mx-auto flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">No messages yet</h3>
            <p className="mt-2 text-sm text-gray-500">Contact form submissions will appear here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`bg-white shadow-lg rounded-xl overflow-hidden border-l-4 hover:shadow-xl transition-all ${
                !msg.is_read ? 'border-l-orange-500 bg-orange-50 bg-opacity-30' : msg.reply_count > 0 ? 'border-l-green-500' : 'border-l-gray-300'
              }`}>
                <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="bg-primary bg-opacity-10 rounded-full p-2">
                          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{msg.name}</h3>
                          <a href={`mailto:${msg.email}`} className="text-sm text-primary hover:underline font-medium">
                            {msg.email}
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        {!msg.is_read && (
                          <span className="px-3 py-1 text-xs font-bold rounded-full bg-orange-500 text-white shadow-sm">
                            🔔 NEW
                          </span>
                        )}
                        {msg.reply_count > 0 && (
                          <span className="px-3 py-1 text-xs font-bold rounded-full bg-green-500 text-white shadow-sm">
                            ✓ {msg.reply_count} {msg.reply_count === 1 ? 'Reply' : 'Replies'}
                          </span>
                        )}
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-200 text-gray-700">
                          ID: {msg.id}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-sm text-gray-600 mb-1">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {new Date(msg.timestamp).toLocaleDateString()}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </div>
                      {msg.is_read && msg.read_at && (
                        <span className="text-xs text-gray-400 block mt-1">
                          ✓ Read: {new Date(msg.read_at).toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="px-6 py-5">
                  <div className="mb-4">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Subject</span>
                    <h4 className="text-lg font-semibold text-gray-900 mt-1">
                      {msg.subject || 'No subject'}
                    </h4>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Message</span>
                    <p className="text-gray-700 whitespace-pre-wrap leading-relaxed mt-2">{msg.message}</p>
                  </div>
                  
                  {/* Reply Button */}
                  <div className="flex justify-end mt-5">
                    <button
                      onClick={() => handleReply(msg)}
                      className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-primary to-blue-600 hover:from-primary-dark hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all shadow-md hover:shadow-lg transform hover:scale-105"
                    >
                      <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                      </svg>
                      {msg.reply_count > 0 ? 'Reply Again' : 'Reply to Message'}
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
          currentUser={currentUser}
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
