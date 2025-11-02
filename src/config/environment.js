export const DEV_CONFIG = {
  enableFirebaseLogging: process.env.NODE_ENV === 'development',
  enableOfflineMode: true,
  connectionTimeout: 10000, 
  retryAttempts: 3
};

export let firebaseStatus = {
  connected: false,
  lastError: null,
  retryCount: 0
};

export const logFirebaseStatus = (status, error = null) => {
  firebaseStatus.connected = status;
  firebaseStatus.lastError = error;
  
  if (DEV_CONFIG.enableFirebaseLogging) {
    console.log('Firebase Status:', {
      connected: status,
      error: error?.message || null,
      timestamp: new Date().toISOString()
    });
  }
};

export const isLocalEnvironment = () => {
  return window.location.hostname === 'localhost' || 
        window.location.hostname === '127.0.0.1' ||
        window.location.hostname === '::1';
};