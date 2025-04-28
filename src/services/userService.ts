// services/userService.js
import { baseURL } from '@/baseUrl';
import axios from 'axios';

const API_URL = baseURL; 

// export const getUserById = async (userId : number) => {
//   try {
//     const response = await axios.get(`${API_URL}/users/${userId}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error getting user by ID:', error);
//     throw error;
//   }
// };

export const registerUser = async (userData : any) => {
  try {
    const response = await axios.post(`${API_URL}/api/Users`, userData);
    return response;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const LoginUser = async (userLoginData : any) => {
    try {
      const response = await axios.post(`${API_URL}/api/Auth/login`, userLoginData);
      return response;
    } catch (error : any) {
    //   console.error('Error Signing user:', error);
      return  error.response;
    }
  };
