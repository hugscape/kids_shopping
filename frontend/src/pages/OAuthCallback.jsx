import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { CheckCircle, XCircle, Loader } from 'lucide-react';

const OAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { handleOAuthSuccess, handleOAuthError } = useAuth();
  const [status, setStatus] = useState('loading'); // loading, success, error
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Check if this is a success or error callback
    const error = searchParams.get('error');
    const token = searchParams.get('token');
    const userData = searchParams.get('user');

    if (error) {
      setStatus('error');
      setMessage(error === 'access_denied' ? 'Access was denied' : error);
      setTimeout(() => navigate('/'), 3000);
    } else if (token && userData) {
      try {
        const user = JSON.parse(decodeURIComponent(userData));
        handleOAuthSuccess(user, token);
        setStatus('success');
        setMessage('Successfully signed in!');
        setTimeout(() => navigate('/'), 2000);
      } catch (err) {
        setStatus('error');
        setMessage('Failed to process authentication data');
        setTimeout(() => navigate('/'), 3000);
      }
    } else {
      // No parameters, redirect to home
      navigate('/');
    }
  }, [searchParams, navigate, handleOAuthSuccess, handleOAuthError]);

  const renderContent = () => {
    switch (status) {
      case 'loading':
        return (
          <div className="text-center">
            <Loader className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Processing Sign-In...
            </h2>
            <p className="text-gray-600">
              Please wait while we complete your authentication.
            </p>
          </div>
        );

      case 'success':
        return (
          <div className="text-center">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Welcome to Hugscape!
            </h2>
            <p className="text-gray-600 mb-4">
              You have been successfully signed in.
            </p>
            <p className="text-sm text-gray-500">
              Redirecting to home page...
            </p>
          </div>
        );

      case 'error':
        return (
          <div className="text-center">
            <XCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Sign-In Failed
            </h2>
            <p className="text-gray-600 mb-4">
              {message}
            </p>
            <p className="text-sm text-gray-500">
              Redirecting to home page...
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">H</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Hugscape</h1>
          </div>
          
          {renderContent()}
          
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/')}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Go to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OAuthCallback;
