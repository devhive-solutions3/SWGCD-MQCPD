import { db } from './firebaseconfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

/**
 * Validates the booking data before saving to Firestore
 * @param {Object} data - The booking data to validate
 * @returns {Object} - Object containing isValid and error message if any
 */
const validateBookingData = (data) => {
  const requiredFields = ['fullname', 'email', 'program', 'serviceType', 'date'];
  
  for (const field of requiredFields) {
    if (!data[field] || data[field].trim() === '') {
      return {
        isValid: false,
        error: `Please fill in the ${field} field`
      };
    }
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return {
      isValid: false,
      error: 'Please enter a valid email address'
    };
  }

  return { isValid: true };
};

/**
 * Saves a booking to Firestore
 * @param {Object} data - The booking data to save
 * @returns {Promise<Object>} - Object containing success status and message
 */
export const saveBookingToFirestore = async (data) => {
  try {
    // Validate the data first
    const validation = validateBookingData(data);
    if (!validation.isValid) {
      return {
        success: false,
        message: validation.error
      };
    }

    // Add timestamp to the data
    const bookingData = {
      ...data,
      createdAt: serverTimestamp(),
      status: 'pending' // Initial status for the booking
    };

    // Save to Firestore
    const docRef = await addDoc(collection(db, 'bookings'), bookingData);
    
    return {
      success: true,
      message: 'Booking saved successfully',
      bookingId: docRef.id
    };
  } catch (error) {
    console.error('Error saving booking:', error);
    return {
      success: false,
      message: 'Failed to save booking. Please try again.'
    };
  }
}; 