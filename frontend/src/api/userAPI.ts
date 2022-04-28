/**
 * @author Hyeonsooryu
 */

import axiosInstance from './axiosInstance';

interface ISignupReqData {
  emoji: string;
  id: string;
  password: string;
}

interface ISignupResponse {
  emoji: string;
  id: string;
  seq: number;
}

const signUpAPI = async (data: ISignupReqData): Promise<ISignupResponse> => {
  const response = await axiosInstance(null).post('/accounts', JSON.stringify(data));

  return response.data;
};

export default signUpAPI;
