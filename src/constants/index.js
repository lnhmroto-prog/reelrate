export const COLLECTIONS = {
  USERS: 'users',
  REVIEWS: 'reviews',
  MOVIES: 'movies'
};

export const TIMEOUTS = {
  FIREBASE_QUERY: 8000,
  FIREBASE_SIMPLE_QUERY: 5000,
  API_REQUEST: 10000
};

export const PAGINATION = {
  REVIEWS_PER_PAGE: 20,
  MOVIES_PER_PAGE: 20,
  MAX_PAGES_DISPLAY: 5
};

export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 6,
  MIN_USERNAME_LENGTH: 3,
  MIN_REVIEW_LENGTH: 10,
  MAX_REVIEW_LENGTH: 1000,
  MIN_RATING: 1,
  MAX_RATING: 5
};

export const API_ENDPOINTS = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  MOVIES: '/api/movies',
  REVIEWS: '/api/reviews',
  USERS: '/api/users'
};

export const IMAGE_SIZES = {
  POSTER_SMALL: 'w185',
  POSTER_MEDIUM: 'w500',
  BACKDROP_LARGE: 'w1280',
  PROFILE_SMALL: 'w185'
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your internet connection.',
  FIREBASE_UNAVAILABLE: 'Database temporarily unavailable. Please try again later.',
  AUTHENTICATION_REQUIRED: 'You must be logged in to perform this action.',
  PERMISSION_DENIED: 'Access denied. Please check your permissions.',
  NOT_FOUND: 'The requested resource was not found.',
  GENERIC_ERROR: 'An unexpected error occurred. Please try again.'
};

export const SUCCESS_MESSAGES = {
  REVIEW_CREATED: 'Review submitted successfully!',
  REVIEW_UPDATED: 'Review updated successfully!',
  REVIEW_DELETED: 'Review deleted successfully!',
  PROFILE_UPDATED: 'Profile updated successfully!',
  LOGIN_SUCCESS: 'Welcome back!',
  REGISTER_SUCCESS: 'Account created successfully!'
};
