import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  role: string;
  lastLogin: Date;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on app load
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (token) {
        // Verify token with backend
        const response = await fetch('/api/auth/verify', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData.user);
        } else {
          localStorage.removeItem('adminToken');
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('adminToken');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // For demo purposes, using hardcoded credentials
      // In production, this should call your secure backend API
      if (email === 'admin@yantrashilpa.com' && password === 'YantraAdmin2025!') {
        const mockUser: User = {
          id: '1',
          email: 'admin@yantrashilpa.com',
          role: 'admin',
          lastLogin: new Date()
        };

        // Generate mock JWT token (in production, this comes from backend)
        const mockToken = btoa(JSON.stringify({
          userId: mockUser.id,
          email: mockUser.email,
          role: mockUser.role,
          exp: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
        }));

        localStorage.setItem('adminToken', mockToken);
        setUser(mockUser);

        // Log successful login
        console.log('Admin login successful:', {
          email,
          timestamp: new Date().toISOString(),
          ip: 'client-ip' // In production, get from backend
        });

        return true;
      }

      // Log failed login attempt
      console.log('Failed login attempt:', {
        email,
        timestamp: new Date().toISOString(),
        ip: 'client-ip'
      });

      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setUser(null);
    
    // Log logout
    console.log('Admin logout:', {
      timestamp: new Date().toISOString()
    });
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};