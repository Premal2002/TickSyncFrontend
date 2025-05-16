// services/userService.js
import { baseURL } from "@/HelperData/datavariables";
import { responseError } from "@/HelperFunctions/SwalFunctions";
import axios from "axios";

const API_URL = baseURL;

export const registerUser = async (userData: any) => {
  try {
    const response = await axios.post(`${API_URL}/api/Users`, userData);
    return response;
  } catch (error : any) {
     handleError(error);
  }
};

export const loginUser = async (userLoginData: any) => {
  try {
    const response = await axios.post(`${API_URL}/api/Auth/login`, userLoginData);
    return response;
  } catch (error : any) {
    handleError(error);
  }
};


export const forgotPassword = async (email: any) => {
  try {
    const response = await axios.post(`${API_URL}/api/Auth/forgot-password`, email);
    return response;
  } catch (error : any) {
     handleError(error);
  }
};

export const verifyOtpApi = async (verifyOtpObj : any) => {
  try {
    const response = await axios.post(`${API_URL}/api/Auth/verify-reset-code`, verifyOtpObj);
    return response;
  } catch (error : any) {
     handleError(error);
  }
};

export const resetPasswordApi = async (resetPasswordObj : any) => {
  try {
    const response = await axios.post(`${API_URL}/api/Auth/reset-password`, resetPasswordObj);
    return response;
  } catch (error : any) {
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
