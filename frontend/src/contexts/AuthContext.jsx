import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('hugscape-token'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state
  useEffect(() => {
    if (token) {
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, [token]);

  // Set up axios interceptor for JWT token
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Fetch user profile from token
  const fetchUserProfile = async () => {
    try {
      const response = await axios.get('/api/auth/profile');
      setUser(response.data.user);
      setError(null);
    } catch (err) {
      console.error('Error fetching user profile:', err);
      // Token might be expired, remove it
      logout();
    } finally {
      setLoading(false);
    }
  };

  // Google Sign-In
  const signInWithGoogle = () => {
    // Redirect to Spring Boot OAuth2 endpoint
    window.location.href = '/api/oauth2/authorization/google';
  };

  // Handle OAuth callback success
  const handleOAuthSuccess = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('hugscape-token', authToken);
    setError(null);
  };

  // Handle OAuth callback error
  const handleOAuthError = (errorMessage) => {
    setError(errorMessage);
    setLoading(false);
  };

  // Logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('hugscape-token');
    delete axios.defaults.headers.common['Authorization'];
  };

  // Update user profile
  const updateProfile = async (profileData) => {
    try {
      const response = await axios.put('/api/auth/profile', profileData);
      setUser(response.data.user);
      return { success: true, message: response.data.message };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to update profile';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  // Refresh token
  const refreshToken = async () => {
    try {
      const response = await axios.post('/api/auth/refresh');
      const newToken = response.data.token;
      setToken(newToken);
      localStorage.setItem('hugscape-token', newToken);
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      return true;
    } catch (err) {
      console.error('Error refreshing token:', err);
      logout();
      return false;
    }
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return user !== null && token !== null;
  };

  // Check if user has specific role (for future use)
  const hasRole = (role) => {
    // For now, all authenticated users have basic access
    // This can be extended later with role-based access control
    return isAuthenticated();
  };

  const value = {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    hasRole,
    signInWithGoogle,
    handleOAuthSuccess,
    handleOAuthError,
    logout,
    updateProfile,
    refreshToken,
    fetchUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
