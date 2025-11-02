import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { COLLECTIONS, VALIDATION } from "../constants";

export const registerUser = async (email, password, username) => {
  try {
    if (username.length < VALIDATION.MIN_USERNAME_LENGTH) {
      return { 
        success: false, 
        error: `Username must be at least ${VALIDATION.MIN_USERNAME_LENGTH} characters` 
      };
    }
    
    if (password.length < VALIDATION.MIN_PASSWORD_LENGTH) {
      return { 
        success: false, 
        error: `Password must be at least ${VALIDATION.MIN_PASSWORD_LENGTH} characters` 
      };
    }
    
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    await updateProfile(user, {
      displayName: username
    });
    
    await setDoc(doc(db, COLLECTIONS.USERS, user.uid), {
      username: username,
      email: email,
      bio: "",
      joinDate: new Date(),
      totalReviews: 0,
      averageRating: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    return { success: true, user: user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getCurrentUser = () => {
  return auth.currentUser;
};

export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

export const getUserProfile = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, COLLECTIONS.USERS, userId));
    if (userDoc.exists()) {
      return { success: true, data: userDoc.data() };
    } else {
      return { success: false, error: "User profile not found" };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateUserProfile = async (userId, profileData) => {
  try {
    await updateDoc(doc(db, COLLECTIONS.USERS, userId), {
      ...profileData,
      updatedAt: new Date()
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};