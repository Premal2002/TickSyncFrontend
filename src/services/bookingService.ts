// services/movieService.js

import axiosInstance from "@/HelperFunctions/axiosInstance";
import { responseError } from "@/HelperFunctions/SwalFunctions";

export const getLatestSeatsLayout = async (showId: any) => {
  try {
    const response = await axiosInstance.get(
      `/api/Booking/getLatestSeatsLayout/${showId}`
    );
    return response;
  } catch (error: any) {
    handleError(error);
  }
};

export const lockSeats = async (seatLockRequest: any) => {
  try {
    const response = await axiosInstance.post(
      `/api/Booking/lockSeats`,
      seatLockRequest
    );
    return response;
  } catch (error: any) {
    handleError(error);
  }
};

export const initiateBooking = async (initiateBookingRequest: any) => {
  try {
    const response = await axiosInstance.post(
      `/api/Booking/initiateBooking`,
      initiateBookingRequest
    );
    return response;
  } catch (error: any) {
    handleError(error);
  }
};

export const cancelBooking = async (cancelBookingRequest: any) => {
  try {
    const response = await axiosInstance.post(
      `/api/Booking/cancelBooking`,
      cancelBookingRequest
    );
    return response;
  } catch (error: any) {
    handleError(error);
  }
};

export const createRazorpayOrder = async (createRazorpayOrderReq: any) => {
  try {
    const response = await axiosInstance.post(
      `/api/Booking/createRazorpayOrder`,
      createRazorpayOrderReq
    );
    return response;
  } catch (error: any) {
    handleError(error);
  }
};

export const paymentCallback = async (paymentCallback: any) => {
  try {
    const response = await axiosInstance.post(
      `/api/Booking/paymentCallback`,
      paymentCallback
    );
    return response;
  } catch (error: any) {
    handleError(error);
  }
};

// Reusable error handler
const handleError = (error: any) => {
  if (error.response) {
    responseError(error.response.data);
  } else if (error.request) {
    responseError("No response received from server!");
  } else {
    console.log("Error", error.message);
  }
};

export const getBookingHistory = async (userId:any) => {
  try {
    const response = await axiosInstance.get(
      `/api/Booking/getBookingHistory/${userId}`
    );
    return response;
  } catch (error: any) {
    handleError(error);
  }
};