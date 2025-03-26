import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Set base URL and default headers for axios
  axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5050';
  axios.defaults.headers.post['Content-Type'] = 'application/json';

  // Add a request interceptor
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['x-auth-token'] = token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );

  // Load user from token
  useEffect(() => {
    const loadUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // Check if token is expired
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          // Token is expired
          logout();
          setLoading(false);
          return;
        }

        // Set auth token header
        axios.defaults.headers.common['x-auth-token'] = token;
        
        // Get user data
        const res = await axios.get('/auth/me');
        setUser(res.data);
        setIsAuthenticated(true);
        setLoading(false);
      } catch (err) {
        console.error(err);
        logout();
        setLoading(false);
      }
    };

    loadUser();
  }, [token]);

  // Register user
  const register = async (formData) => {
    try {
      setLoading(true);
      setError(null);
      
      // Verification check for required fields
      if (!formData.role) {
        console.error('Registration error: Missing role field');
        setError('Registration failed: Role is required');
        setLoading(false);
        return false;
      }
      
      // Log registration data without sensitive information
      const debugData = { ...formData };
      delete debugData.password;
      console.log('Registration data being sent:', debugData);
      console.log('API endpoint:', `${axios.defaults.baseURL}/auth/register`);
      
      const res = await axios.post('/auth/register', formData);
      console.log('Registration response:', res.data);
      
      // Set token in local storage
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      
      // Load user
      await loadUser();
      
      return true;
    } catch (err) {
      console.error('Registration error details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      setError(err.response?.data?.msg || 'Registration failed. Please check network connection.');
      setLoading(false);
      return false;
    }
  };

  // Login user
  const login = async (email, password, role) => {
    try {
      setLoading(true);
      setError(null);
      
      // Log request details (without password)
      console.log('Login attempt:', { email, role });
      
      // Make sure we're using the correct API endpoint
      const endpoint = '/auth/login';
      console.log('Using API endpoint:', axios.defaults.baseURL + endpoint);
      
      // Add headers explicitly
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const res = await axios.post(endpoint, { email, password, role }, config);
      
      if (res.data && res.data.token) {
        console.log('Login successful');
        // Set token in local storage
        localStorage.setItem('token', res.data.token);
        setToken(res.data.token);
        
        // Set auth header
        axios.defaults.headers.common['x-auth-token'] = res.data.token;
        
        // Load user data
        await loadUser();
        return true;
      } else {
        throw new Error('No token received from server');
      }
    } catch (err) {
      console.error('Login error:', err);
      const errorMessage = err.response?.data?.msg || err.message || 'Login failed';
      setError(errorMessage);
      setLoading(false);
      return false;
    }
  };

  // Logout user
  const logout = () => {
    // Remove token from local storage
    localStorage.removeItem('token');
    setToken(null);
    
    // Remove auth header
    delete axios.defaults.headers.common['x-auth-token'];
    
    // Reset state
    setUser(null);
    setIsAuthenticated(false);
    setLoading(false);
  };

  // Load user from token
  const loadUser = async () => {
    try {
      console.log('Loading user data...'); // Debug log
      const res = await axios.get('/auth/me');
      console.log('User data loaded:', res.data); // Debug log
      setUser(res.data);
      setIsAuthenticated(true);
      setLoading(false);
    } catch (err) {
      console.error('Error loading user:', err.response?.data || err.message);
      setError(err.response?.data?.msg || 'Failed to load user');
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        loading,
        error,
        register,
        login,
        logout,
        loadUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}; 