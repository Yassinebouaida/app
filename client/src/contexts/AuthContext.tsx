import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';

// Types
interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'craftsman' | 'admin';
  avatar?: string;
  isVerified: boolean;
  language: string;
  phone?: string;
  location?: {
    city: string;
    district: string;
  };
  craftsman?: any;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: any) => Promise<void>;
  clearError: () => void;
  checkAuth: () => Promise<void>;
}

// Actions
type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'AUTH_FAIL'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: User }
  | { type: 'CLEAR_ERROR' }
  | { type: 'SET_LOADING'; payload: boolean };

// Initial State
const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  isLoading: false,
  isAuthenticated: false,
  error: null,
};

// Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      };
    case 'AUTH_FAIL':
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        token: null,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        error: null,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

// Create Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook to use Auth Context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// API Base URL
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Configure axios
axios.defaults.baseURL = API_URL;

// Auth Provider Component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Set auth token in axios header
  useEffect(() => {
    if (state.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
      localStorage.setItem('token', state.token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  }, [state.token]);

  // Check if user is authenticated on app start
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      checkAuth();
    }
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<void> => {
    try {
      dispatch({ type: 'AUTH_START' });
      
      const response = await axios.post('/auth/login', {
        email,
        password,
      });

      const { token, user } = response.data;

      dispatch({
        type: 'AUTH_SUCCESS',
        payload: { user, token },
      });
    } catch (error: any) {
      const message = error.response?.data?.message || 'فشل في تسجيل الدخول';
      dispatch({ type: 'AUTH_FAIL', payload: message });
      throw error;
    }
  };

  // Register function
  const register = async (userData: any): Promise<void> => {
    try {
      dispatch({ type: 'AUTH_START' });

      const response = await axios.post('/auth/register', userData);

      const { token, user } = response.data;

      dispatch({
        type: 'AUTH_SUCCESS',
        payload: { user, token },
      });
    } catch (error: any) {
      const message = error.response?.data?.message || 'فشل في إنشاء الحساب';
      dispatch({ type: 'AUTH_FAIL', payload: message });
      throw error;
    }
  };

  // Logout function
  const logout = (): void => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  };

  // Update profile function
  const updateProfile = async (userData: any): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      const response = await axios.put('/auth/me', userData);

      dispatch({ type: 'UPDATE_USER', payload: response.data.data });
    } catch (error: any) {
      const message = error.response?.data?.message || 'فشل في تحديث الملف الشخصي';
      dispatch({ type: 'AUTH_FAIL', payload: message });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Check authentication status
  const checkAuth = async (): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      const response = await axios.get('/auth/me');

      dispatch({
        type: 'AUTH_SUCCESS',
        payload: {
          user: response.data.data,
          token: state.token || localStorage.getItem('token') || '',
        },
      });
    } catch (error: any) {
      dispatch({ type: 'LOGOUT' });
      localStorage.removeItem('token');
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Clear error function
  const clearError = (): void => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    updateProfile,
    clearError,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};