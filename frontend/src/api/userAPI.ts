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

interface ILoginReqData {
  id: string;
  password: string;
}

interface ILoginResponse {
  emojiUrl: string;
  token: string;
}

const signUpAPI = async (data: ISignupReqData): Promise<ISignupResponse> => {
  const axiosInstance = createAxiosInstance()
  const response = await axiosInstance.post('/accounts', JSON.stringify(data));

  return response.data;
};

const loginAPI = async (data: ILoginReqData): Promise<ILoginResponse> => {
  const response = await axiosInstance.post(
    '/accounts/login',
    JSON.stringify(data),
  );

  return response.data;
};

export { signUpAPI, loginAPI };
