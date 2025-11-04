import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiUrl } from '../config/api'

interface DemoRequest {
  id: number;
  platform_id: string;
  platform_name: string;
  platform_category: string;
  full_name: string;
  email: string;
  phone: string;
  company_name: string | null;
  message: string | null;
  timestamp: string;
  is_read: boolean;
  read_at: string | null;
  status: string;
  demo_scheduled_at: string | null;
  notes: string | null;
}

export default function DemoRequests() {
  const [demoRequests, setDemoRequests] = useState<DemoRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [editingRequest, setEditingRequest] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({
    status: '',
    notes: '',
    demo_scheduled_at: ''
  });

  const token = localStorage.getItem('access_token');

  useEffect(() => {
    fetchCurrentUser();
    fetchDemoRequests();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const response = await fetch(apiUrl('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const user = await response.json();
        setCurrentUser(user);
      }
    } catch (err) {
      console.error('Failed to fetch current user:', err);
    }
  };

  const fetchDemoRequests = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(apiUrl('/api/demo-requests', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setDemoRequests(data);
      } else {
        setError('Failed to fetch demo requests');
      }
    } catch (err) {
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkRead = async (requestId: number) => {
    try {
      const response = await fetch(`/api/demo-requests/${requestId}/mark-read`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchDemoRequests();
      }
    } catch (err) {
      console.error('Failed to mark as read:', err);
    }
  };

  const handleEdit = (request: DemoRequest) => {
    setEditingRequest(request.id);
    setEditForm({
      status: request.status,
      notes: request.notes || '',
      demo_scheduled_at: request.demo_scheduled_at ? new Date(request.demo_scheduled_at).toISOString().slice(0, 16) : ''
    });
  };

  const handleSaveEdit = async (requestId: number) => {
    try {
      const response = await fetch(`/api/demo-requests/${requestId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          status: editForm.status,
          notes: editForm.notes || null,
          demo_scheduled_at: editForm.demo_scheduled_at || null
        })
      });

      if (response.ok) {
        setEditingRequest(null);
        fetchDemoRequests();
      } else {
        setError('Failed to update request');
      }
    } catch (err) {
      setError('Failed to update request');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    window.location.href = '/admin';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'contacted':
        return 'bg-blue-100 text-blue-800';
      case 'scheduled':
        return 'bg-purple-100 text-purple-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const analytics = {
    total: demoRequests.length,
    pending: demoRequests.filter(r => r.status === 'pending').length,
    scheduled: demoRequests.filter(r => r.status === 'scheduled').length,
    completed: demoRequests.filter(r => r.status === 'completed').length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-xl border-b-4 border-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src="/logo_icon.png" alt="IRONHEX Logo" className="h-16 w-auto" />
              <div>
                <h1 className="text-2xl font-bold text-white">IRONHEX</h1>
                <p className="text-gray-300 text-sm">Demo Requests Management</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-gray-400 text-xs uppercase tracking-wide">Logged in as</p>
                <p className="text-white font-semibold text-lg">{currentUser?.username || 'Admin'}</p>
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
              to="/admin"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-sm"
            >
              <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Dashboard
            </Link>
            <button
              onClick={fetchDemoRequests}
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium uppercase tracking-wide">Total Requests</p>
                <p className="text-4xl font-bold mt-2">{analytics.total}</p>
              </div>
              <div className="bg-blue-400 bg-opacity-30 rounded-full p-3">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-sm font-medium uppercase tracking-wide">Pending</p>
                <p className="text-4xl font-bold mt-2">{analytics.pending}</p>
              </div>
              <div className="bg-yellow-400 bg-opacity-30 rounded-full p-3">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium uppercase tracking-wide">Scheduled</p>
                <p className="text-4xl font-bold mt-2">{analytics.scheduled}</p>
              </div>
              <div className="bg-purple-400 bg-opacity-30 rounded-full p-3">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium uppercase tracking-wide">Completed</p>
                <p className="text-4xl font-bold mt-2">{analytics.completed}</p>
              </div>
              <div className="bg-green-400 bg-opacity-30 rounded-full p-3">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 rounded-md bg-red-50 p-4">
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

        {/* Demo Requests List */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Demo Requests</h2>
          <p className="text-sm text-gray-600 mt-1">Manage demo requests from website visitors</p>
        </div>

        {loading ? (
          <div className="text-center py-16 bg-white rounded-xl shadow">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-4 border-primary"></div>
            <p className="mt-4 text-gray-600 font-medium">Loading demo requests...</p>
          </div>
        ) : demoRequests.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow">
            <div className="bg-gray-100 rounded-full p-4 w-20 h-20 mx-auto flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">No demo requests yet</h3>
            <p className="mt-2 text-sm text-gray-500">Demo requests will appear here when visitors request demos.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {demoRequests.map((request) => (
              <div
                key={request.id}
                className={`bg-white shadow-lg rounded-xl overflow-hidden border-l-4 hover:shadow-xl transition-all ${
                  !request.is_read ? 'border-l-orange-500 bg-orange-50 bg-opacity-30' : 'border-l-blue-500'
                }`}
              >
                <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="bg-primary bg-opacity-10 rounded-full p-2">
                          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{request.full_name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <a href={`mailto:${request.email}`} className="text-sm text-primary hover:underline font-medium">
                              {request.email}
                            </a>
                            <span className="text-gray-300">•</span>
                            <a href={`tel:${request.phone}`} className="text-sm text-gray-600 hover:underline">
                              {request.phone}
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        {!request.is_read && (
                          <span className="px-3 py-1 text-xs font-bold rounded-full bg-orange-500 text-white shadow-sm">
                            🔔 NEW
                          </span>
                        )}
                        <span className={`px-3 py-1 text-xs font-bold rounded-full ${getStatusColor(request.status)} shadow-sm`}>
                          {request.status.toUpperCase()}
                        </span>
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-200 text-gray-700">
                          ID: {request.id}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-sm text-gray-600 mb-1">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {new Date(request.timestamp).toLocaleDateString()}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {new Date(request.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-6 py-5">
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Requested Platform</span>
                      <div className="mt-1 flex items-center gap-2">
                        <h4 className="text-lg font-semibold text-gray-900">{request.platform_name}</h4>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">
                          {request.platform_category}
                        </span>
                      </div>
                    </div>
                    {request.company_name && (
                      <div>
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Company</span>
                        <p className="text-lg font-semibold text-gray-900 mt-1">{request.company_name}</p>
                      </div>
                    )}
                  </div>

                  {request.message && (
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-4">
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Additional Information</span>
                      <p className="text-gray-700 mt-2">{request.message}</p>
                    </div>
                  )}

                  {editingRequest === request.id ? (
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 mb-4">
                      <h4 className="text-sm font-semibold text-gray-900 mb-3">Update Request</h4>
                      <div className="grid gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
                          <select
                            value={editForm.status}
                            onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                          >
                            <option value="pending">Pending</option>
                            <option value="contacted">Contacted</option>
                            <option value="scheduled">Scheduled</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Demo Scheduled At</label>
                          <input
                            type="datetime-local"
                            value={editForm.demo_scheduled_at}
                            onChange={(e) => setEditForm({ ...editForm, demo_scheduled_at: e.target.value })}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Notes</label>
                          <textarea
                            value={editForm.notes}
                            onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                            rows={3}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Add internal notes..."
                          />
                        </div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => handleSaveEdit(request.id)}
                          className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark"
                        >
                          Save Changes
                        </button>
                        <button
                          onClick={() => setEditingRequest(null)}
                          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {(request.demo_scheduled_at || request.notes) && (
                        <div className="bg-green-50 rounded-lg p-4 border border-green-200 mb-4">
                          {request.demo_scheduled_at && (
                            <div className="mb-2">
                              <span className="text-xs font-semibold text-green-700 uppercase tracking-wide">Demo Scheduled</span>
                              <p className="text-green-900 font-medium mt-1">
                                {new Date(request.demo_scheduled_at).toLocaleString()}
                              </p>
                            </div>
                          )}
                          {request.notes && (
                            <div>
                              <span className="text-xs font-semibold text-green-700 uppercase tracking-wide">Admin Notes</span>
                              <p className="text-green-900 mt-1">{request.notes}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  )}

                  <div className="flex justify-end gap-3">
                    {!request.is_read && (
                      <button
                        onClick={() => handleMarkRead(request.id)}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Mark as Read
                      </button>
                    )}
                    <button
                      onClick={() => handleEdit(request)}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-primary hover:bg-primary-dark"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      {editingRequest === request.id ? 'Cancel' : 'Update'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

