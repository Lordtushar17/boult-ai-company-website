import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Shield, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutTime, setLockoutTime] = useState(0);
  
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    // Check if account is locked
    const lockoutEnd = localStorage.getItem('lockoutEnd');
    if (lockoutEnd && Date.now() < parseInt(lockoutEnd)) {
      setIsLocked(true);
      setLockoutTime(parseInt(lockoutEnd));
      
      const timer = setInterval(() => {
        if (Date.now() >= parseInt(lockoutEnd)) {
          setIsLocked(false);
          setLockoutTime(0);
          localStorage.removeItem('lockoutEnd');
          localStorage.removeItem('loginAttempts');
          clearInterval(timer);
        }
      }, 1000);
      
      return () => clearInterval(timer);
    }

    // Get current attempts
    const currentAttempts = localStorage.getItem('loginAttempts');
    if (currentAttempts) {
      setAttempts(parseInt(currentAttempts));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLocked) {
      setError('Account is temporarily locked. Please try again later.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const success = await login(formData.email, formData.password);
      
      if (success) {
        // Clear attempts on successful login
        localStorage.removeItem('loginAttempts');
        localStorage.removeItem('lockoutEnd');
        navigate('/admin/dashboard');
      } else {
        // Increment failed attempts
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        localStorage.setItem('loginAttempts', newAttempts.toString());
        
        if (newAttempts >= 5) {
          // Lock account for 15 minutes
          const lockoutEnd = Date.now() + (15 * 60 * 1000);
          localStorage.setItem('lockoutEnd', lockoutEnd.toString());
          setIsLocked(true);
          setLockoutTime(lockoutEnd);
          setError('Too many failed attempts. Account locked for 15 minutes.');
        } else {
          setError(`Invalid credentials. ${5 - newAttempts} attempts remaining.`);
        }
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatLockoutTime = () => {
    if (!lockoutTime) return '';
    const remaining = Math.ceil((lockoutTime - Date.now()) / 1000 / 60);
    return `${remaining} minute${remaining !== 1 ? 's' : ''}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1F44] to-[#1a3a6b] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#F97316] rounded-full mb-4">
            <Shield size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-poppins font-bold text-white mb-2">
            Admin Login
          </h1>
          <p className="text-gray-300 font-roboto">
            Yantrashilpa Technologies Pvt Ltd
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-roboto font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                disabled={isLocked}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F97316] focus:border-transparent transition-colors font-roboto disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="admin@yantrashilpa.com"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-roboto font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  disabled={isLocked}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F97316] focus:border-transparent transition-colors font-roboto disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLocked}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:cursor-not-allowed"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle size={20} className="text-red-500 flex-shrink-0" />
                <span className="text-red-700 font-roboto text-sm">{error}</span>
              </div>
            )}

            {/* Lockout Warning */}
            {isLocked && (
              <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <AlertCircle size={20} className="text-yellow-500 flex-shrink-0" />
                <span className="text-yellow-700 font-roboto text-sm">
                  Account locked for {formatLockoutTime()}
                </span>
              </div>
            )}

            {/* Attempts Warning */}
            {attempts > 0 && attempts < 5 && !isLocked && (
              <div className="flex items-center gap-2 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <AlertCircle size={20} className="text-orange-500 flex-shrink-0" />
                <span className="text-orange-700 font-roboto text-sm">
                  {5 - attempts} attempt{5 - attempts !== 1 ? 's' : ''} remaining
                </span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || isLocked}
              className="w-full bg-[#F97316] hover:bg-[#0A1F44] text-white py-3 px-4 rounded-lg font-roboto font-medium transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing In...
                </>
              ) : (
                <>
                  <Shield size={20} />
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Security Notice */}
          <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-blue-500 flex-shrink-0" />
              <span className="text-blue-700 font-roboto text-xs">
                This login is protected by advanced security measures
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-gray-400 font-roboto text-sm">
            © 2025 Yantrashilpa Technologies Pvt Ltd
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;