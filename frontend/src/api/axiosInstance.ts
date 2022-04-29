/**
 * @author Hyeonsooryu
 */

import axios from 'axios';

const createAxiosInstance = () => {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      'Content-type': 'application/json',
    },
  });

  return axiosInstance;
};

export const axiosInstance = createAxiosInstance();
