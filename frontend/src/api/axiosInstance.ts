/**
 * @author Hyeonsooryu
 */

import axios from 'axios';

const createAxiosInstance = (token?: string) => {
  const defaultHeader = {
    'Content-type': 'application/json',
  }

  const JWTHeader = {
    'Content-type': 'application/json',
    'Authorization': `Bearer ${token}`
  }

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: token ? JWTHeader : defaultHeader
  });
  
  return axiosInstance;
};

export default createAxiosInstance;
