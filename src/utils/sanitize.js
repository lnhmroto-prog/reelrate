import DOMPurify from 'dompurify';

export const sanitizeHTML = (dirty, options = {}) => {
  if (!dirty) return '';
  
  const defaultOptions = {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
    ALLOWED_ATTR: ['href', 'target'],
    ALLOW_DATA_ATTR: false,
    ...options
  };
  
  return DOMPurify.sanitize(dirty, defaultOptions);
};

export const sanitizeText = (dirty) => {
  if (!dirty) return '';
  
  return DOMPurify.sanitize(dirty, { 
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: []
  });
};

export const escapeHTML = (text) => {
  if (!text) return '';
  
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
};

export const validateAndSanitize = (input, validation = {}) => {
  const {
    minLength = 0,
    maxLength = Infinity,
    pattern = null,
    required = false
  } = validation;
  
  if (required && (!input || input.trim().length === 0)) {
    return {
      isValid: false,
      sanitized: '',
      error: 'This field is required'
    };
  }
  
  const sanitized = sanitizeText(input).trim();
  
  if (sanitized.length < minLength) {
    return {
      isValid: false,
      sanitized,
      error: `Must be at least ${minLength} characters`
    };
  }
  
  if (sanitized.length > maxLength) {
    return {
      isValid: false,
      sanitized: sanitized.substring(0, maxLength),
      error: `Must be no more than ${maxLength} characters`
    };
  }
  
  if (pattern && !pattern.test(sanitized)) {
    return {
      isValid: false,
      sanitized,
      error: 'Invalid format'
    };
  }
  
  return {
    isValid: true,
    sanitized,
    error: null
  };
};
