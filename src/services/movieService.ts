// services/userService.js
import { baseURL } from "@/HelperData/datavariables";
import { responseError } from "@/HelperFunctions/SwalFunctions";
import axios from "axios";

const API_URL = baseURL;

export const getTrendingMovies = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/Movies/Trending`);
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


export const getRecommendedMovies = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/Movies/Recommended`);
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

export const getMovies = async () => {
  try {
    const response = await axios.post(`${API_URL}/api/Movies/getMovies`,{
      "languages": [
      ],
      "genres": [
      ]
    });
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
