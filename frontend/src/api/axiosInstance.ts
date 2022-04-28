/**
 * @author Hyeonsooryu
 */

import axios from 'axios';

const createAxiosInstance = (token:string | null) => {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + {token}
    },
  });

  return axiosInstance;
};

export default createAxiosInstance;
