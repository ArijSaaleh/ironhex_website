import React, { useState, useEffect } from "react";
import { api } from "../config/api";
import { Link } from "react-router-dom";
import ChangePasswordModal from "../components/ChangePasswordModal";
import MessageReplyModal from "../components/MessageReplyModal";

export default function Admin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(
    localStorage.getItem("access_token") || ""
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [mustChangePassword, setMustChangePassword] = useState(false);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [activeView, setActiveView] = useState("dashboard"); // 'dashboard', 'messages', 'demo-requests', 'users'
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768); // Start closed on mobile

  // Demo requests state
  const [demoRequests, setDemoRequests] = useState([]);
  const [editingRequest, setEditingRequest] = useState(null);
  const [editForm, setEditForm] = useState({
    status: "",
    notes: "",
    demo_scheduled_at: "",
  });

  // Users management state
  const [users, setUsers] = useState([]);
  const [showCreateUserForm, setShowCreateUserForm] = useState(false);
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [analytics, setAnalytics] = useState({
    totalMessages: 0,
    unreadMessages: 0,
    repliedMessages: 0,
    todayMessages: 0,
    totalDemoRequests: 0,
    pendingDemos: 0,
    totalUsers: 0,
  });

  // Check if token is valid on mount
  useEffect(() => {
    if (token) {
      verifyToken();
    }
  }, []);

  // Update analytics whenever data changes
  useEffect(() => {
    updateAnalytics(messages, demoRequests, users);
  }, [messages, demoRequests, users]);

  const verifyToken = async () => {
    try {
      const response = await fetch(api("/api/auth/me"), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const user = await response.json();
        setCurrentUser(user);
        setIsLoggedIn(true);
        setMustChangePassword(user.must_change_password);

        if (!user.must_change_password) {
          fetchMessages();
          fetchDemoRequests();
          fetchUsers();
        }
      } else {
        // Token invalid or expired
        localStorage.removeItem("access_token");
        setToken("");
        setIsLoggedIn(false);
      }
    } catch (err) {
      console.error("Token verification failed:", err);
      localStorage.removeItem("access_token");
      setToken("");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Create URL-encoded form data for OAuth2 password flow
      const formData = new URLSearchParams();
      formData.append("username", username);
      formData.append("password", password);

      const response = await fetch(api("/api/auth/login"), {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const accessToken = data.access_token;

        setToken(accessToken);
        localStorage.setItem("access_token", accessToken);

        // Get user info
        const userResponse = await fetch(api("/api/auth/me"), {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (userResponse.ok) {
          const user = await userResponse.json();
          setCurrentUser(user);
          setIsLoggedIn(true);
          setMustChangePassword(
            data.must_change_password || user.must_change_password
          );

          if (!data.must_change_password && !user.must_change_password) {
            fetchMessages(accessToken);
            fetchDemoRequests(accessToken);
            fetchUsers(accessToken);
          }
        }
      } else {
        const errorData = await response.json();
        setError(errorData.detail || "Invalid credentials");
      }
    } catch (err) {
      setError("Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (authToken = token) => {
    setLoading(true);
    try {
      const response = await fetch(api("/api/messages"), {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(data);
        // Don't update analytics here, let useEffect handle it
      } else if (response.status === 401) {
        // Unauthorized - token expired
        setIsLoggedIn(false);
        localStorage.removeItem("access_token");
        setError("Session expired. Please login again.");
      } else {
        setError("Failed to fetch messages");
      }
    } catch (err) {
      setError("Failed to fetch messages");
    } finally {
      setLoading(false);
    }
  };

  const fetchDemoRequests = async (authToken = token) => {
    try {
      const response = await fetch(api("/api/demo-requests"), {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setDemoRequests(data);
        // Don't update analytics here, let useEffect handle it
      }
    } catch (err) {
      console.error("Failed to fetch demo requests:", err);
    }
  };

  const fetchUsers = async (authToken = token) => {
    try {
      const response = await fetch(api("/api/auth/users"), {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(data);
        // Don't update analytics here, let useEffect handle it
      }
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  const updateAnalytics = (msgs, demos, usrs) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const stats = {
      totalMessages: msgs.length,
      unreadMessages: msgs.filter((m) => !m.is_read).length,
      repliedMessages: msgs.filter((m) => m.reply_count > 0).length,
      todayMessages: msgs.filter((m) => {
        const msgDate = new Date(m.timestamp);
        msgDate.setHours(0, 0, 0, 0);
        return msgDate.getTime() === today.getTime();
      }).length,
      totalDemoRequests: demos.length,
      pendingDemos: demos.filter((d) => d.status === "pending").length,
      totalUsers: usrs.length,
    };
    setAnalytics(stats);
  };

  const handleLogout = async () => {
    try {
      await fetch(api("/api/auth/logout"), {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      console.error("Logout error:", err);
    }

    setIsLoggedIn(false);
    setToken("");
    setUsername("");
    setPassword("");
    setMessages([]);
    setCurrentUser(null);
    localStorage.removeItem("access_token");
  };

  const handleRefresh = () => {
    fetchMessages();
  };

  const handlePasswordChangeSuccess = async () => {
    setShowPasswordModal(false);
    setMustChangePassword(false);

    // Refresh user info to verify password was changed
    try {
      const response = await fetch(api("/api/auth/me"), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const user = await response.json();
        setCurrentUser(user);
        setMustChangePassword(user.must_change_password);
      }
    } catch (err) {
      console.error("Failed to refresh user info:", err);
    }

    fetchMessages();
  };

  const handleReply = (msg) => {
    setSelectedMessage(msg);
    setShowReplyModal(true);
  };

  const handleReplySuccess = () => {
    fetchMessages();
    setShowReplyModal(false);
    setSelectedMessage(null);
  };

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
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary opacity-10 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 opacity-10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500 opacity-5 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        {/* Login Card */}
        <div className="max-w-md w-full space-y-8 relative z-10">
          {/* Logo Section */}
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-primary blur-xl opacity-50 animate-pulse"></div>
                <img
                  src="/logo_icon.png"
                  alt="IRONHEX Logo"
                  className="h-24 w-auto relative z-10 drop-shadow-2xl"
                />
              </div>
            </div>
            <h2 className="text-4xl font-extrabold text-white mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-400 text-sm">
              Sign in to access your admin dashboard
            </p>
          </div>

          {/* Login Form Card */}
          <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-gray-700/50">
            <form className="space-y-6" onSubmit={handleLogin}>
              {/* Username Input */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="block w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="block w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="rounded-lg bg-red-500/10 border border-red-500/50 p-4 animate-shake">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-red-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-300">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-gradient-to-r from-primary to-blue-600 hover:from-primary-dark hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Signing in...
                    </>
                  ) : (
                    <>
                      <span className="absolute left-0 inset-y-0 flex items-center pl-4">
                        <svg
                          className="h-5 w-5 text-white/80 group-hover:text-white transition-colors"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                          />
                        </svg>
                      </span>
                      Sign in to Dashboard
                    </>
                  )}
                </button>
              </div>

              {/* Forgot Password Link */}
              <div className="text-center">
                <Link
                  to="/forgot-password"
                  className="text-sm text-gray-400 hover:text-primary transition-colors font-medium inline-flex items-center gap-1"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                    />
                  </svg>
                  Forgot your password?
                </Link>
              </div>
            </form>
          </div>

          {/* Footer Text */}
          <div className="text-center">
            <p className="text-xs text-gray-500">
              Protected by enterprise-grade security
            </p>
          </div>
        </div>
      </div>
    );
  }

  const handleRefreshAll = () => {
    fetchMessages();
    fetchDemoRequests();
    fetchUsers();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-gray-800/50 backdrop-blur-xl border-b border-gray-700/50 p-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <img src="/logo_icon.png" alt="IRONHEX" className="h-10 w-auto" />
          <div>
            <h1 className="text-white font-bold text-lg">IRONHEX</h1>
            <p className="text-gray-400 text-xs">Admin Panel</p>
          </div>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-gray-400 hover:text-white transition-colors p-2"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {sidebarOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:relative z-50 md:z-auto w-64 ${
          sidebarOpen ? "md:w-64" : "md:w-20"
        } bg-gray-800/50 backdrop-blur-xl border-r border-gray-700/50 transition-all duration-300 flex flex-col h-[calc(100vh-73px)] md:h-screen overflow-y-auto`}
      >
        {/* Logo Section - Desktop Only */}
        <div className="hidden md:block p-4 border-b border-gray-700/50">
          <div className="flex items-center justify-between">
            {sidebarOpen ? (
              <div className="flex items-center space-x-3">
                <img
                  src="/logo_icon.png"
                  alt="IRONHEX"
                  className="h-10 w-auto"
                />
                <div>
                  <h1 className="text-white font-bold text-lg">IRONHEX</h1>
                  <p className="text-gray-400 text-xs">Admin Panel</p>
                </div>
              </div>
            ) : (
              <img
                src="/logo_icon.png"
                alt="IRONHEX"
                className="h-10 w-auto mx-auto"
              />
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {sidebarOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 5l7 7-7 7M5 5l7 7-7 7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => {
              setActiveView("dashboard");
              // Close sidebar on mobile after selection
              if (window.innerWidth < 768) setSidebarOpen(false);
            }}
            className={`w-full flex items-center ${
              sidebarOpen ? "justify-start px-4" : "justify-center"
            } py-3 rounded-lg transition-all ${
              activeView === "dashboard"
                ? "bg-primary text-white shadow-lg"
                : "text-gray-400 hover:bg-gray-700/50 hover:text-white"
            }`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            {sidebarOpen && <span className="ml-3 font-medium">Dashboard</span>}
          </button>

          <button
            onClick={() => {
              setActiveView("messages");
              if (window.innerWidth < 768) setSidebarOpen(false);
            }}
            className={`w-full flex items-center ${
              sidebarOpen ? "justify-start px-4" : "justify-center"
            } py-3 rounded-lg transition-all relative ${
              activeView === "messages"
                ? "bg-primary text-white shadow-lg"
                : "text-gray-400 hover:bg-gray-700/50 hover:text-white"
            }`}
          >
            <div className="relative">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
              {analytics.unreadMessages > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold">
                  {analytics.unreadMessages}
                </span>
              )}
            </div>
            {sidebarOpen && (
              <span className="ml-3 font-medium">Contact Messages</span>
            )}
          </button>

          <button
            onClick={() => {
              setActiveView("demo-requests");
              if (window.innerWidth < 768) setSidebarOpen(false);
            }}
            className={`w-full flex items-center ${
              sidebarOpen ? "justify-start px-4" : "justify-center"
            } py-3 rounded-lg transition-all relative ${
              activeView === "demo-requests"
                ? "bg-primary text-white shadow-lg"
                : "text-gray-400 hover:bg-gray-700/50 hover:text-white"
            }`}
          >
            <div className="relative">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              {analytics.pendingDemos > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold">
                  {analytics.pendingDemos}
                </span>
              )}
            </div>
            {sidebarOpen && (
              <span className="ml-3 font-medium">Demo Requests</span>
            )}
          </button>

          <button
            onClick={() => {
              setActiveView("users");
              if (window.innerWidth < 768) setSidebarOpen(false);
            }}
            className={`w-full flex items-center ${
              sidebarOpen ? "justify-start px-4" : "justify-center"
            } py-3 rounded-lg transition-all ${
              activeView === "users"
                ? "bg-primary text-white shadow-lg"
                : "text-gray-400 hover:bg-gray-700/50 hover:text-white"
            }`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            {sidebarOpen && (
              <span className="ml-3 font-medium">User Management</span>
            )}
          </button>
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-gray-700/50">
          {sidebarOpen ? (
            <div className="mb-3">
              <p className="text-gray-400 text-xs uppercase tracking-wide">
                Logged in as
              </p>
              <p className="text-white font-semibold truncate">
                {currentUser?.username}
              </p>
            </div>
          ) : null}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            {sidebarOpen && <span className="ml-2 font-medium">Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto w-full">
        {/* Top Header */}
        <div className="bg-gray-800/30 backdrop-blur-xl border-b border-gray-700/50 sticky top-0 md:top-0 z-10">
          <div className="px-4 md:px-8 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white">
                {activeView === "dashboard" && "Dashboard Overview"}
                {activeView === "messages" && "Contact Messages"}
                {activeView === "demo-requests" && "Demo Requests"}
                {activeView === "users" && "User Management"}
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                {activeView === "dashboard" &&
                  "Welcome to your admin control panel"}
                {activeView === "messages" &&
                  "Manage and respond to contact form submissions"}
                {activeView === "demo-requests" &&
                  "Track and manage demo requests"}
                {activeView === "users" && "Manage admin users and permissions"}
              </p>
            </div>
            <button
              onClick={handleRefreshAll}
              disabled={loading}
              className="inline-flex items-center px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors disabled:opacity-50 shadow-lg"
            >
              <svg
                className={`-ml-1 mr-2 h-5 w-5 ${
                  loading ? "animate-spin" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Refresh
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-4 md:p-6 lg:p-8">
          {/* Dashboard View */}
          {activeView === "dashboard" && (
            <>
              {/* Analytics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
                {/* Total Messages */}
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-transform">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm font-medium uppercase tracking-wide">
                        Total Messages
                      </p>
                      <p className="text-4xl font-bold mt-2">
                        {analytics.totalMessages}
                      </p>
                    </div>
                    <div className="bg-blue-400 bg-opacity-30 rounded-full p-3">
                      <svg
                        className="w-8 h-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm text-blue-100">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                    All time
                  </div>
                </div>

                {/* Unread Messages */}
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-transform">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100 text-sm font-medium uppercase tracking-wide">
                        Unread
                      </p>
                      <p className="text-4xl font-bold mt-2">
                        {analytics.unreadMessages}
                      </p>
                    </div>
                    <div className="bg-orange-400 bg-opacity-30 rounded-full p-3">
                      <svg
                        className="w-8 h-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm text-orange-100">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Needs attention
                  </div>
                </div>

                {/* Replied Messages */}
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-transform">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm font-medium uppercase tracking-wide">
                        Replied
                      </p>
                      <p className="text-4xl font-bold mt-2">
                        {analytics.repliedMessages}
                      </p>
                    </div>
                    <div className="bg-green-400 bg-opacity-30 rounded-full p-3">
                      <svg
                        className="w-8 h-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm text-green-100">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {analytics.totalMessages > 0
                      ? Math.round(
                          (analytics.repliedMessages /
                            analytics.totalMessages) *
                            100
                        )
                      : 0}
                    % response rate
                  </div>
                </div>

                {/* Today's Messages */}
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-transform">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm font-medium uppercase tracking-wide">
                        Today
                      </p>
                      <p className="text-4xl font-bold mt-2">
                        {analytics.todayMessages}
                      </p>
                    </div>
                    <div className="bg-purple-400 bg-opacity-30 rounded-full p-3">
                      <svg
                        className="w-8 h-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm text-purple-100">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Last 24 hours
                  </div>
                </div>
              </div>

              {/* Quick Stats Section */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-4">
                  Quick Overview
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <button
                    onClick={() => setActiveView("demo-requests")}
                    className="bg-gray-800/50 backdrop-blur-xl rounded-lg p-4 border border-gray-700/50 hover:border-primary transition-all text-left"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Demo Requests</p>
                        <p className="text-2xl font-bold text-white">
                          {analytics.totalDemoRequests}
                        </p>
                      </div>
                      <div className="bg-purple-500/20 rounded-full p-3">
                        <svg
                          className="w-6 h-6 text-purple-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    </div>
                    {analytics.pendingDemos > 0 && (
                      <p className="text-orange-400 text-xs mt-2">
                        {analytics.pendingDemos} pending
                      </p>
                    )}
                  </button>

                  <button
                    onClick={() => setActiveView("users")}
                    className="bg-gray-800/50 backdrop-blur-xl rounded-lg p-4 border border-gray-700/50 hover:border-primary transition-all text-left"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Admin Users</p>
                        <p className="text-2xl font-bold text-white">
                          {analytics.totalUsers}
                        </p>
                      </div>
                      <div className="bg-blue-500/20 rounded-full p-3">
                        <svg
                          className="w-6 h-6 text-blue-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    <p className="text-gray-500 text-xs mt-2">
                      Active accounts
                    </p>
                  </button>

                  <div className="bg-gray-800/50 backdrop-blur-xl rounded-lg p-4 border border-gray-700/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Response Rate</p>
                        <p className="text-2xl font-bold text-white">
                          {analytics.totalMessages > 0
                            ? Math.round(
                                (analytics.repliedMessages /
                                  analytics.totalMessages) *
                                  100
                              )
                            : 0}
                          %
                        </p>
                      </div>
                      <div className="bg-green-500/20 rounded-full p-3">
                        <svg
                          className="w-6 h-6 text-green-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    <p className="text-gray-500 text-xs mt-2">
                      {analytics.repliedMessages} of {analytics.totalMessages}{" "}
                      replied
                    </p>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-4">
                  Recent Messages
                </h3>
                <p className="text-sm text-gray-400">
                  Latest contact form submissions
                </p>
              </div>

              {/* Messages Preview */}
              {loading ? (
                <div className="text-center py-16 bg-gray-800/30 rounded-xl shadow">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-4 border-primary"></div>
                  <p className="mt-4 text-gray-100 font-medium">
                    Loading messages...
                  </p>
                </div>
              ) : messages.length === 0 ? (
                <div className="text-center py-16 bg-gray-800/30 rounded-xl shadow">
                  <div className="bg-gray-700/50 rounded-full p-4 w-20 h-20 mx-auto flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                      />
                    </svg>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-gray-100">
                    No messages yet
                  </h3>
                  <p className="mt-2 text-sm text-gray-400">
                    Contact form submissions will appear here.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.slice(0, 3).map((msg) => (
                    <div
                      key={msg.id}
                      className={`bg-gray-800/50 backdrop-blur-xl shadow-lg rounded-xl overflow-hidden border-l-4 hover:shadow-2xl transition-all ${
                        !msg.is_read
                          ? "border-l-orange-500"
                          : msg.reply_count > 0
                          ? "border-l-green-500"
                          : "border-l-gray-600"
                      }`}
                    >
                      <div className="px-6 py-4 bg-gradient-to-r from-gray-800/80 to-gray-700/80 border-b border-gray-600/50">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="bg-primary bg-opacity-20 rounded-full p-2">
                                <svg
                                  className="w-5 h-5 text-primary"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                  />
                                </svg>
                              </div>
                              <div>
                                <h3 className="text-lg font-bold text-white">
                                  {msg.name}
                                </h3>
                                <a
                                  href={`mailto:${msg.email}`}
                                  className="text-sm text-primary hover:underline font-medium"
                                >
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
                                  ✓ {msg.reply_count}{" "}
                                  {msg.reply_count === 1 ? "Reply" : "Replies"}
                                </span>
                              )}
                              <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-700 text-gray-300">
                                ID: {msg.id}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center text-sm text-gray-400 mb-1">
                              <svg
                                className="w-4 h-4 mr-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                              {new Date(msg.timestamp).toLocaleDateString()}
                            </div>
                            <div className="flex items-center text-sm text-gray-400">
                              <svg
                                className="w-4 h-4 mr-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              {new Date(msg.timestamp).toLocaleTimeString()}
                            </div>
                            {msg.is_read && msg.read_at && (
                              <span className="text-xs text-gray-500 block mt-1">
                                ✓ Read: {new Date(msg.read_at).toLocaleString()}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="px-6 py-5">
                        <div className="mb-4">
                          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                            Subject
                          </span>
                          <h4 className="text-lg font-semibold text-white mt-1">
                            {msg.subject || "No subject"}
                          </h4>
                        </div>
                        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                            Message
                          </span>
                          <p className="text-gray-300 whitespace-pre-wrap leading-relaxed mt-2">
                            {msg.message}
                          </p>
                        </div>

                        {/* View All Button */}
                        <div className="flex justify-between items-center mt-5">
                          <button
                            onClick={() => setActiveView("messages")}
                            className="text-sm text-primary hover:text-primary-dark font-medium"
                          >
                            View all messages →
                          </button>
                          <button
                            onClick={() => handleReply(msg)}
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-primary to-blue-600 hover:from-primary-dark hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all shadow-md hover:shadow-lg"
                          >
                            <svg
                              className="-ml-1 mr-2 h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                              />
                            </svg>
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Messages View */}
          {activeView === "messages" && (
            <>
              {loading ? (
                <div className="text-center py-16 bg-gray-800/30 rounded-xl shadow">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-4 border-primary"></div>
                  <p className="mt-4 text-gray-100 font-medium">
                    Loading messages...
                  </p>
                </div>
              ) : messages.length === 0 ? (
                <div className="text-center py-16 bg-gray-800/30 rounded-xl shadow">
                  <div className="bg-gray-700/50 rounded-full p-4 w-20 h-20 mx-auto flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                      />
                    </svg>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-gray-100">
                    No messages yet
                  </h3>
                  <p className="mt-2 text-sm text-gray-400">
                    Contact form submissions will appear here.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`bg-gray-800/50 backdrop-blur-xl shadow-lg rounded-xl overflow-hidden border-l-4 hover:shadow-2xl transition-all ${
                        !msg.is_read
                          ? "border-l-orange-500"
                          : msg.reply_count > 0
                          ? "border-l-green-500"
                          : "border-l-gray-600"
                      }`}
                    >
                      <div className="px-6 py-4 bg-gradient-to-r from-gray-800/80 to-gray-700/80 border-b border-gray-600/50">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="bg-primary bg-opacity-20 rounded-full p-2">
                                <svg
                                  className="w-5 h-5 text-primary"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                  />
                                </svg>
                              </div>
                              <div>
                                <h3 className="text-lg font-bold text-white">
                                  {msg.name}
                                </h3>
                                <a
                                  href={`mailto:${msg.email}`}
                                  className="text-sm text-primary hover:underline font-medium"
                                >
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
                                  ✓ {msg.reply_count}{" "}
                                  {msg.reply_count === 1 ? "Reply" : "Replies"}
                                </span>
                              )}
                              <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-700 text-gray-300">
                                ID: {msg.id}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center text-sm text-gray-400 mb-1">
                              <svg
                                className="w-4 h-4 mr-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                              {new Date(msg.timestamp).toLocaleDateString()}
                            </div>
                            <div className="flex items-center text-sm text-gray-400">
                              <svg
                                className="w-4 h-4 mr-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              {new Date(msg.timestamp).toLocaleTimeString()}
                            </div>
                            {msg.is_read && msg.read_at && (
                              <span className="text-xs text-gray-500 block mt-1">
                                ✓ Read: {new Date(msg.read_at).toLocaleString()}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="px-6 py-5">
                        <div className="mb-4">
                          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                            Subject
                          </span>
                          <h4 className="text-lg font-semibold text-white mt-1">
                            {msg.subject || "No subject"}
                          </h4>
                        </div>
                        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                            Message
                          </span>
                          <p className="text-gray-300 whitespace-pre-wrap leading-relaxed mt-2">
                            {msg.message}
                          </p>
                        </div>

                        {/* Reply Button */}
                        <div className="flex justify-end mt-5">
                          <button
                            onClick={() => handleReply(msg)}
                            className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-primary to-blue-600 hover:from-primary-dark hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all shadow-md hover:shadow-lg transform hover:scale-105"
                          >
                            <svg
                              className="-ml-1 mr-2 h-5 w-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                              />
                            </svg>
                            {msg.reply_count > 0
                              ? "Reply Again"
                              : "Reply to Message"}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Demo Requests View */}
          {activeView === "demo-requests" && (
            <div className="text-gray-100">
              <p className="text-center py-8">
                Demo Requests view - Coming soon with full demo management
              </p>
            </div>
          )}

          {/* Users View */}
          {activeView === "users" && (
            <>
              {/* Create User Button */}
              <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="text-xl font-bold text-white">Admin Users</h3>
                  <p className="text-sm text-gray-400 mt-1">
                    Manage administrator accounts and permissions
                  </p>
                </div>
                <button
                  onClick={() => setShowCreateUserForm(!showCreateUserForm)}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors shadow-lg"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  {showCreateUserForm ? "Cancel" : "Create New User"}
                </button>
              </div>

              {/* Create User Form */}
              {showCreateUserForm && (
                <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-6 mb-6 border border-gray-700/50">
                  <h4 className="text-lg font-bold text-white mb-4">
                    Create New Admin User
                  </h4>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      // Handle user creation
                      if (
                        userFormData.password !== userFormData.confirmPassword
                      ) {
                        setError("Passwords do not match");
                        return;
                      }
                      if (userFormData.password.length < 8) {
                        setError("Password must be at least 8 characters");
                        return;
                      }
                      // Create user API call
                      fetch(api("/api/auth/register"), {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({
                          username: userFormData.username,
                          email: userFormData.email,
                          password: userFormData.password,
                        }),
                      })
                        .then((res) => res.json())
                        .then((data) => {
                          if (data.id) {
                            fetchUsers();
                            setShowCreateUserForm(false);
                            setUserFormData({
                              username: "",
                              email: "",
                              password: "",
                              confirmPassword: "",
                            });
                            setError("");
                          } else {
                            setError(data.detail || "Failed to create user");
                          }
                        })
                        .catch((err) => setError("Failed to create user"));
                    }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Username
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-2 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Enter username"
                          value={userFormData.username}
                          onChange={(e) =>
                            setUserFormData({
                              ...userFormData,
                              username: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          required
                          className="w-full px-4 py-2 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Enter email"
                          value={userFormData.email}
                          onChange={(e) =>
                            setUserFormData({
                              ...userFormData,
                              email: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Password
                        </label>
                        <input
                          type="password"
                          required
                          className="w-full px-4 py-2 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Enter password"
                          value={userFormData.password}
                          onChange={(e) =>
                            setUserFormData({
                              ...userFormData,
                              password: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          required
                          className="w-full px-4 py-2 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Confirm password"
                          value={userFormData.confirmPassword}
                          onChange={(e) =>
                            setUserFormData({
                              ...userFormData,
                              confirmPassword: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    {error && (
                      <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 text-red-300 text-sm">
                        {error}
                      </div>
                    )}
                    <button
                      type="submit"
                      className="w-full py-2 bg-gradient-to-r from-primary to-blue-600 hover:from-primary-dark hover:to-blue-700 text-white rounded-lg font-semibold transition-colors shadow-lg"
                    >
                      Create User
                    </button>
                  </form>
                </div>
              )}

              {/* Users List */}
              {loading ? (
                <div className="text-center py-16 bg-gray-800/30 rounded-xl">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-4 border-primary"></div>
                  <p className="mt-4 text-gray-100 font-medium">
                    Loading users...
                  </p>
                </div>
              ) : users.length === 0 ? (
                <div className="text-center py-16 bg-gray-800/30 rounded-xl">
                  <div className="bg-gray-700/50 rounded-full p-4 w-20 h-20 mx-auto flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-gray-100">
                    No users found
                  </h3>
                  <p className="mt-2 text-sm text-gray-400">
                    Create your first admin user to get started.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {users.map((user) => (
                    <div
                      key={user.id}
                      className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-6 border border-gray-700/50 hover:border-primary transition-all"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="bg-primary/20 rounded-full p-3">
                            <svg
                              className="w-6 h-6 text-primary"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-white">
                              {user.username}
                            </h4>
                            {user.is_super_admin && (
                              <span className="inline-block px-2 py-1 text-xs font-bold rounded-full bg-yellow-500/20 text-yellow-400 mt-1">
                                SUPER ADMIN
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-400">
                          <svg
                            className="w-4 h-4 mr-2 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                          <span className="truncate">{user.email}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-400">
                          <svg
                            className="w-4 h-4 mr-2 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          Created: {new Date(user.created_at).toLocaleDateString()}
                        </div>
                        {user.last_login && (
                          <div className="flex items-center text-sm text-gray-400">
                            <svg
                              className="w-4 h-4 mr-2 flex-shrink-0"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                              />
                            </svg>
                            Last login: {new Date(user.last_login).toLocaleString()}
                          </div>
                        )}
                        {!user.last_login && (
                          <div className="flex items-center text-sm text-gray-500">
                            <svg
                              className="w-4 h-4 mr-2 flex-shrink-0"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            Never logged in
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
                        <div className="flex items-center space-x-2">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              user.is_active
                                ? "bg-green-500"
                                : "bg-gray-500"
                            }`}
                          ></div>
                          <span
                            className={`text-sm font-medium ${
                              user.is_active
                                ? "text-green-400"
                                : "text-gray-400"
                            }`}
                          >
                            {user.is_active ? "Active" : "Inactive"}
                          </span>
                        </div>
                        {user.id !== currentUser?.id && !user.is_super_admin && (
                          <button
                            onClick={() => {
                              if (
                                confirm(
                                  `Are you sure you want to delete user "${user.username}"?`
                                )
                              ) {
                                fetch(api(`/api/auth/users/${user.id}`), {
                                  method: "DELETE",
                                  headers: {
                                    Authorization: `Bearer ${token}`,
                                  },
                                })
                                  .then((res) => {
                                    if (res.ok) {
                                      fetchUsers();
                                    }
                                  })
                                  .catch((err) =>
                                    console.error("Failed to delete user:", err)
                                  );
                              }
                            }}
                            className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Reply Modal */}
      {showReplyModal && selectedMessage && (
        <MessageReplyModal
          message={selectedMessage}
          currentUser={currentUser}
          onClose={() => {
            setShowReplyModal(false);
            setSelectedMessage(null);
          }}
          onSuccess={handleReplySuccess}
        />
      )}
    </div>
  );
}
