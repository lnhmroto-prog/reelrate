import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChange, getUserProfile } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (user) => {
      setCurrentUser(user);
      
      if (user) {
        try {
          const profileResult = await Promise.race([
            getUserProfile(user.uid),
            new Promise((_, reject) => 
              setTimeout(() => reject(new Error('Profile fetch timeout')), 5000)
            )
          ]);
          
          if (profileResult.success) {
            setUserProfile(profileResult.data);
          } else {
            console.warn('Failed to fetch user profile:', profileResult.error);
            setUserProfile({
              username: user.displayName || user.email?.split('@')[0],
              email: user.email,
              bio: "",
              joinDate: new Date(),
              totalReviews: 0,
              averageRating: 0
            });
          }
        } catch (error) {
          console.warn('Profile fetch error:', error.message);
          setUserProfile({
            username: user.displayName || user.email?.split('@')[0],
            email: user.email,
            bio: "",
            joinDate: new Date(),
            totalReviews: 0,
            averageRating: 0
          });
        }
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userProfile,
    loading,
    isAuthenticated: !!currentUser,
    updateUserProfile: (profileData) => {
      setUserProfile(prev => ({ ...prev, ...profileData }));
    }
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};