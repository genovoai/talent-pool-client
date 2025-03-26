import React, { createContext, useReducer, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const ProfileContext = createContext();

const initialState = {
  profile: null,
  loading: true,
  error: null
};

const profileReducer = (state, action) => {
  switch (action.type) {
    case 'GET_PROFILE':
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case 'PROFILE_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case 'CLEAR_PROFILE':
      return {
        ...state,
        profile: null,
        loading: false
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};

export const ProfileProvider = ({ children }) => {
  const [state, dispatch] = useReducer(profileReducer, initialState);
  useContext(AuthContext); // We still need the AuthContext for axios defaults

  // Get current user's profile
  const getCurrentProfile = async () => {
    try {
      dispatch({ type: 'SET_LOADING' });
      
      const res = await axios.get('/profile/me');
      
      dispatch({
        type: 'GET_PROFILE',
        payload: res.data
      });
      
      return res.data;
    } catch (err) {
      // Don't treat 404 (profile not found) as an error, just clear loading
      if (err.response && err.response.status === 404) {
        dispatch({ type: 'CLEAR_PROFILE' });
      } else {
        dispatch({
          type: 'PROFILE_ERROR',
          payload: err.response && err.response.data ? err.response.data.msg : 'An error occurred'
        });
      }
      
      return null;
    }
  };

  // Create or update profile
  const createProfile = async (profileData) => {
    dispatch({ type: 'SET_LOADING' });
    
    // Format skills to ensure they're always arrays
    if (profileData.skills && typeof profileData.skills === 'string') {
      profileData.skills = profileData.skills.split(',').map(skill => skill.trim()).filter(skill => skill);
    }
    
    try {
      const res = await axios.post('/profile', profileData);
      
      dispatch({
        type: 'GET_PROFILE',
        payload: res.data
      });
      
      return true;
    } catch (err) {
      dispatch({
        type: 'PROFILE_ERROR',
        payload: err.response && err.response.data ? err.response.data.msg : 'An error occurred'
      });
      
      return false;
    }
  };

  // Clear profile on logout
  const clearProfile = () => {
    dispatch({ type: 'CLEAR_PROFILE' });
  };

  return (
    <ProfileContext.Provider
      value={{
        profile: state.profile,
        loading: state.loading,
        error: state.error,
        getCurrentProfile,
        createProfile,
        clearProfile
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}; 