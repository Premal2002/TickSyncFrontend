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
    if (error.response) {
      // console.error("Error registering user:", error);
      responseError(error.response.data);
    } else if (error.request) {
      // console.log('No response received:', error.request);
      responseError("No response received from server!")
    } else {
      console.log('Error', error.message);
    }
  }
};

export const LoginUser = async (userLoginData: any) => {
  try {
    const response = await axios.post(`${API_URL}/api/Auth/login`, userLoginData);
    return response;
  } catch (error : any) {
    if (error.response) {
      responseError(error.response.data);
    } else if (error.request) {
      // console.log('No response received:', error.request);
      responseError("No response received from server!")
    } else {
      console.log('Error', error.message);
    }
  }
};
