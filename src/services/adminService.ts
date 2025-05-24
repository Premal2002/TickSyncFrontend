// services/userService.js
import { baseURL } from "@/HelperData/datavariables";
import { responseError } from "@/HelperFunctions/SwalFunctions";
import axiosInstance from "@/HelperFunctions/axiosInstance";

const API_URL = baseURL;

export const getAllCounts = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}/api/Admin/getAllDataCounts`);
    return response;
  } catch (error : any) {
     handleError(error);
  }
};

export const getEntityData = async (entiy : string) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/api/Admin/getEntityData/${entiy}`);
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
