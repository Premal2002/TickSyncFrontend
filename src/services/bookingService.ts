// services/movieService.js
import { baseURL } from "@/HelperData/datavariables";
import { responseError } from "@/HelperFunctions/SwalFunctions";
import axios from "axios";

const API_URL = baseURL;

export const getLatestSeatsLayout = async (showId:any) => {  
  try {
    const response = await axios.get(`${API_URL}/api/Booking/getLatestSeatsLayout/${showId}`);
    return response;
  } catch (error: any) {
    if (error.response) {
      responseError(error.response.data);
    } else if (error.request) {
      // console.log('No response received:', error.request);
      responseError("No response received from server!");
    } else {
      console.log("Error", error.message);
    }
  }
};

export const lockSeats = async (seatLockRequest:any) => {  
  try {
    const response = await axios.post(`${API_URL}/api/Booking/lockSeats`,seatLockRequest);
    return response;
  } catch (error: any) {
    if (error.response) {
      responseError(error.response.data);
    } else if (error.request) {
      // console.log('No response received:', error.request);
      responseError("No response received from server!");
    } else {
      console.log("Error", error.message);
    }
  }
};

export const initiateBooking = async (initiateBookingRequest:any) => {  
  try {
    const response = await axios.post(`${API_URL}/api/Booking/initiateBooking`,initiateBookingRequest);
    return response;
  } catch (error: any) {
    if (error.response) {
      responseError(error.response.data);
    } else if (error.request) {
      // console.log('No response received:', error.request);
      responseError("No response received from server!");
    } else {
      console.log("Error", error.message);
    }
  }
};

export const confirmBooking = async (confirmBookingRequest:any) => {  
  try {
    const response = await axios.post(`${API_URL}/api/Booking/confirmBooking`,confirmBookingRequest);
    return response;
  } catch (error: any) {
    if (error.response) {
      responseError(error.response.data);
    } else if (error.request) {
      // console.log('No response received:', error.request);
      responseError("No response received from server!");
    } else {
      console.log("Error", error.message);
    }
  }
};


export const cancelBooking = async (cancelBookingRequest:any) => {  
  try {
    const response = await axios.post(`${API_URL}/api/Booking/cancelBooking`,cancelBookingRequest);
    return response;
  } catch (error: any) {
    if (error.response) {
      responseError(error.response.data);
    } else if (error.request) {
      // console.log('No response received:', error.request);
      responseError("No response received from server!");
    } else {
      console.log("Error", error.message);
    }
  }
};

export const createRazorpayOrder = async (createRazorpayOrderReq:any) => {  
  try {
    const response = await axios.post(`${API_URL}/api/Booking/createRazorpayOrder`,createRazorpayOrderReq);
    return response;
  } catch (error: any) {
    if (error.response) {
      responseError(error.response.data);
    } else if (error.request) {
      // console.log('No response received:', error.request);
      responseError("No response received from server!");
    } else {
      console.log("Error", error.message);
    }
  }
};

export const paymentCallback = async (paymentCallback:any) => {  
  try {
    const response = await axios.post(`${API_URL}/api/Booking/paymentCallback`,paymentCallback);
    return response;
  } catch (error: any) {
    if (error.response) {
      responseError(error.response.data);
    } else if (error.request) {
      // console.log('No response received:', error.request);
      responseError("No response received from server!");
    } else {
      console.log("Error", error.message);
    }
  }
};
