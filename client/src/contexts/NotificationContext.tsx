import React, { createContext, useContext, useState, useCallback } from 'react';
import { Snackbar, Alert, AlertColor } from '@mui/material';

// Types
interface Notification {
  id: string;
  message: string;
  type: AlertColor;
  duration?: number;
}

interface NotificationContextType {
  showNotification: (message: string, type?: AlertColor, duration?: number) => void;
  showSuccess: (message: string, duration?: number) => void;
  showError: (message: string, duration?: number) => void;
  showWarning: (message: string, duration?: number) => void;
  showInfo: (message: string, duration?: number) => void;
  hideNotification: () => void;
}

// Create Context
const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Hook to use Notification Context
export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

// Notification Provider Component
export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notification, setNotification] = useState<Notification | null>(null);

  // Generate unique ID for notifications
  const generateId = (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  // Show notification function
  const showNotification = useCallback((
    message: string,
    type: AlertColor = 'info',
    duration: number = 6000
  ): void => {
    const id = generateId();
    setNotification({
      id,
      message,
      type,
      duration,
    });
  }, []);

  // Show success notification
  const showSuccess = useCallback((message: string, duration: number = 4000): void => {
    showNotification(message, 'success', duration);
  }, [showNotification]);

  // Show error notification
  const showError = useCallback((message: string, duration: number = 8000): void => {
    showNotification(message, 'error', duration);
  }, [showNotification]);

  // Show warning notification
  const showWarning = useCallback((message: string, duration: number = 6000): void => {
    showNotification(message, 'warning', duration);
  }, [showNotification]);

  // Show info notification
  const showInfo = useCallback((message: string, duration: number = 6000): void => {
    showNotification(message, 'info', duration);
  }, [showNotification]);

  // Hide notification function
  const hideNotification = useCallback((): void => {
    setNotification(null);
  }, []);

  // Handle snackbar close
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') {
      return;
    }
    hideNotification();
  };

  const value: NotificationContextType = {
    showNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    hideNotification,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      
      {/* Snackbar for displaying notifications */}
      <Snackbar
        open={!!notification}
        autoHideDuration={notification?.duration || 6000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        sx={{
          mt: 8, // Margin from top to avoid overlapping with navbar
        }}
      >
        {notification && (
          <Alert
            onClose={handleClose}
            severity={notification.type}
            variant="filled"
            sx={{
              width: '100%',
              borderRadius: 2,
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              '& .MuiAlert-message': {
                fontSize: '1rem',
                fontWeight: 500,
              },
            }}
          >
            {notification.message}
          </Alert>
        )}
      </Snackbar>
    </NotificationContext.Provider>
  );
};