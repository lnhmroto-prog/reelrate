import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, enableNetwork, disableNetwork } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);

console.log('Firebase initialized with project:', firebaseConfig.projectId);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const handleFirestoreError = (error, operation = 'Firestore operation') => {
  console.error(`${operation} failed:`, {
    code: error.code,
    message: error.message,
    details: error.details || 'No additional details'
  });
  
  switch (error.code) {
    case 'permission-denied':
      return 'Access denied. Please check your authentication.';
    case 'unavailable':
      return 'Service temporarily unavailable. Please try again later.';
    case 'failed-precondition':
      if (error.message.includes('index')) {
        return 'Database index required. Using fallback data instead.';
      }
      return 'Operation failed due to system state. Please refresh and try again.';
    case 'unauthenticated':
      return 'Authentication required. Please log in.';
    default:
      return error.message || 'An unexpected error occurred.';
  }
};

export const checkNetworkStatus = async () => {
  try {
    await enableNetwork(db);
    console.log('Firebase network enabled');
    return true;
  } catch (error) {
    console.error('Firebase network check failed:', error);
    await disableNetwork(db);
    return false;
  }
};

export default app;