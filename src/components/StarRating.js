import React from 'react';
import PropTypes from 'prop-types';

const StarRating = ({ 
  rating = 0, 
  maxStars = 5, 
  size = 'md',
  color = '#ffc107',
  emptyColor = '#e4e5e9',
  className = ''
}) => {
  const clampedRating = Math.max(0, Math.min(maxStars, rating));
  
  const sizeMap = {
    sm: '0.875rem',   
    md: '1.25rem',    
    lg: '1.75rem'     
  };
  
  const fontSize = sizeMap[size] || sizeMap.md;
  
  const renderStars = () => {
    const stars = [];
    
    for (let i = 1; i <= maxStars; i++) {
      const difference = clampedRating - i + 1;
      
      let starIcon;
      let starColor;
      
      if (difference >= 1) {
        starIcon = '★';
        starColor = color;
      } else if (difference > 0 && difference < 1) {
        starIcon = '★';
        starColor = color;
      } else {
        starIcon = '☆';
        starColor = emptyColor;
      }
      
      stars.push(
        <span 
          key={i}
          style={{ 
            color: starColor,
            fontSize: fontSize,
            marginRight: '2px'
          }}
          aria-hidden="true"
        >
          {starIcon}
        </span>
      );
    }
    
    return stars;
  };
  
  return (
    <div 
      className={`star-rating ${className}`}
      role="img"
      aria-label={`Rating: ${clampedRating} out of ${maxStars} stars`}
      style={{ display: 'inline-block', lineHeight: 1 }}
    >
      {renderStars()}
    </div>
  );
};

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
  maxStars: PropTypes.number,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  color: PropTypes.string,
  emptyColor: PropTypes.string,
  className: PropTypes.string
};

export default StarRating;
