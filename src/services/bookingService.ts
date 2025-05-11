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
