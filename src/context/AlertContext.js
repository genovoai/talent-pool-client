import React, { createContext, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const AlertContext = createContext();

const alertReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ALERT':
      return [...state, action.payload];
    case 'REMOVE_ALERT':
      return state.filter(alert => alert.id !== action.payload);
    default:
      return state;
  }
};

export const AlertProvider = ({ children }) => {
  const [state, dispatch] = useReducer(alertReducer, []);

  // Set alert
  const setAlert = (msg, severity = 'info', timeout = 5000) => {
    const id = uuidv4();
    
    dispatch({
      type: 'SET_ALERT',
      payload: { msg, severity, id }
    });

    setTimeout(() => {
      dispatch({
        type: 'REMOVE_ALERT',
        payload: id
      });
    }, timeout);
    
    return id;
  };

  // Remove alert
  const removeAlert = (id) => {
    dispatch({
      type: 'REMOVE_ALERT',
      payload: id
    });
  };

  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert,
        removeAlert
      }}
    >
      {children}
    </AlertContext.Provider>
  );
}; 