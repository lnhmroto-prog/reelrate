const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const makeRequest = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `API Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

export const movieAPI = {
  search: (query) => makeRequest(`/api/movies/search?query=${encodeURIComponent(query)}`),
  getPopular: () => makeRequest('/api/movies/popular'),
  getTrending: () => makeRequest('/api/movies/trending/day'),
  getDetails: (movieId) => makeRequest(`/api/movies/${movieId}`),
};

export const reviewAPI = {
  getAll: (filters = {}) => {
    const params = new URLSearchParams(filters);
    return makeRequest(`/api/reviews?${params.toString()}`);
  },
  getById: (reviewId) => makeRequest(`/api/reviews/${reviewId}`),
  create: (reviewData, token) => makeRequest('/api/reviews', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(reviewData),
  }),
  update: (reviewId, reviewData, token) => makeRequest(`/api/reviews/${reviewId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(reviewData),
  }),
  delete: (reviewId, userId, token) => makeRequest(`/api/reviews/${reviewId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ userId }),
  }),
  markHelpful: (reviewId) => makeRequest(`/api/reviews/${reviewId}/helpful`, {
    method: 'POST',
  }),
  getStats: () => makeRequest('/api/reviews/stats/summary'),
};

export const userAPI = {
  getAll: () => makeRequest('/api/users'),
  getById: (userId) => makeRequest(`/api/users/${userId}`),
  getProfile: (userId, requestingUserId) => 
    makeRequest(`/api/users/${userId}/profile?requestingUserId=${requestingUserId}`),
  create: (userData) => makeRequest('/api/users', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),
  update: (userId, userData) => makeRequest(`/api/users/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(userData),
  }),
  delete: (userId, requestingUserId) => makeRequest(`/api/users/${userId}`, {
    method: 'DELETE',
    body: JSON.stringify({ requestingUserId }),
  }),
  getStats: () => makeRequest('/api/users/stats/summary'),
};

const api = {
  movies: movieAPI,
  reviews: reviewAPI,
  users: userAPI,
};

export default api;
