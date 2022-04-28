/**
 * @author Hyeonsooryu
 */

import createAxiosInstance from './axiosInstance';

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
  const axiosInstance = createAxiosInstance()
  const response = await axiosInstance.post('/accounts', JSON.stringify(data));

  return response.data;
};

export default signUpAPI;
