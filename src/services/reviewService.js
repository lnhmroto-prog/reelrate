import { 
  collection, 
  doc, 
  addDoc, 
  getDocs, 
  getDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  limit,
  increment
} from "firebase/firestore";
import { db, handleFirestoreError } from "./firebase";
import { COLLECTIONS, VALIDATION } from "../constants";

export const createReview = async (reviewData) => {
  try {
    if (reviewData.rating < VALIDATION.MIN_RATING || reviewData.rating > VALIDATION.MAX_RATING) {
      return { 
        success: false, 
        error: `Rating must be between ${VALIDATION.MIN_RATING} and ${VALIDATION.MAX_RATING}` 
      };
    }
    
    if (reviewData.comment.length < VALIDATION.MIN_REVIEW_LENGTH) {
      return { 
        success: false, 
        error: `Review must be at least ${VALIDATION.MIN_REVIEW_LENGTH} characters` 
      };
    }
    
    if (reviewData.comment.length > VALIDATION.MAX_REVIEW_LENGTH) {
      return { 
        success: false, 
        error: `Review must be no more than ${VALIDATION.MAX_REVIEW_LENGTH} characters` 
      };
    }
    
    const docRef = await addDoc(collection(db, COLLECTIONS.REVIEWS), {
      ...reviewData,
      helpful: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    return { success: true, id: docRef.id };
  } catch (error) {
    const errorMessage = handleFirestoreError(error, 'Create review');
    return { success: false, error: errorMessage };
  }
};

export const getReviews = async (filters = {}) => {
  try {
    let q = collection(db, COLLECTIONS.REVIEWS);
    
    if (filters.movieId) {
      q = query(q, where("movieId", "==", parseInt(filters.movieId)));
    }
    
    if (filters.userId) {
      q = query(q, where("userId", "==", filters.userId));
    }
    
    if (filters.limit) {
      q = query(q, limit(parseInt(filters.limit)));
    }
    
    const querySnapshot = await getDocs(q);
    const reviews = [];
    
    querySnapshot.forEach((doc) => {
      reviews.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate()
      });
    });
    
    reviews.sort((a, b) => {
      const dateA = a.createdAt || new Date(0);
      const dateB = b.createdAt || new Date(0);
      return dateB - dateA;
    });
    
    return { success: true, data: reviews };
  } catch (error) {
    const errorMessage = handleFirestoreError(error, 'Get reviews');
    return { success: false, error: errorMessage };
  }
};

export const getReview = async (reviewId) => {
  try {
    const docRef = doc(db, COLLECTIONS.REVIEWS, reviewId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { 
        success: true, 
        data: {
          id: docSnap.id,
          ...docSnap.data(),
          createdAt: docSnap.data().createdAt?.toDate(),
          updatedAt: docSnap.data().updatedAt?.toDate()
        }
      };
    } else {
      return { success: false, error: "Review not found" };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateReview = async (reviewId, updateData) => {
  try {
    const docRef = doc(db, COLLECTIONS.REVIEWS, reviewId);
    await updateDoc(docRef, {
      ...updateData,
      updatedAt: new Date()
    });
    
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const deleteReview = async (reviewId) => {
  try {
    await deleteDoc(doc(db, COLLECTIONS.REVIEWS, reviewId));
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const markReviewHelpful = async (reviewId) => {
  try {
    const docRef = doc(db, COLLECTIONS.REVIEWS, reviewId);
    await updateDoc(docRef, {
      helpful: increment(1)
    });
    
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getReviewStats = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTIONS.REVIEWS));
    let totalReviews = 0;
    let totalRating = 0;
    const ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      totalReviews++;
      totalRating += data.rating;
      ratingDistribution[data.rating]++;
    });
    
    const averageRating = totalReviews > 0 ? (totalRating / totalReviews) : 0;
    
    return {
      success: true,
      data: {
        totalReviews,
        averageRating: Math.round(averageRating * 10) / 10,
        ratingDistribution
      }
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
};