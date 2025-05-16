// services/movieService.js
import { baseURL } from "@/HelperData/datavariables";
import { responseError } from "@/HelperFunctions/SwalFunctions";
import axios from "axios";

const API_URL = baseURL;

export const getTrendingMovies = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/Movies/Trending`);
    return response;
  } catch (error: any) {
    handleError(error);
  }
};

export const getRecommendedMovies = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/Movies/Recommended`);
    return response;
  } catch (error: any) {
    handleError(error);
  }
};

export const getMovies = async (
  filters: { languages: string[]; genres: string[] },
  page: number = 1,
  limit: number = 8
) => {
  try {
    const response = await axios.post(`${API_URL}/api/Movies/getMovies`, {
      ...filters,
      page,
      limit,
    });
    return response;
  } catch (error: any) {
    handleError(error);
  }
};


export const getMovieById = async (movieId : any) => {
  try {
    const response = await axios.get(`${API_URL}/api/Movies/${movieId}`);
    return response;
  } catch (error: any) {
    handleError(error);
  }
};


export const getMovieShows = async (movieId : any) => {
  try {
    const response = await axios.get(`${API_URL}/api/Movies/getMovieShows/${movieId}`);
    return response;
  } catch (error: any) {
    handleError(error);
  }
};


export const getRelatedMovies = async (movieId : any) => {
  try {
    const response = await axios.post(`${API_URL}/api/Movies/getRelatedMovies/${movieId}`);
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