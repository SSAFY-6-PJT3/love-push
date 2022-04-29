/**
 * @author Hyeonsooryu
 * @modified Hanseunghun
 */

import { axiosInstance } from './axiosInstance';

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

interface IReportReqData {
  id?: string;
}


const signUpAPI = async (data: ISignupReqData): Promise<ISignupResponse> => {
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

const reportAPI = async (data: IReportReqData, token: string) => {
  const response = await axiosInstance.post('/accounts/report', JSON.stringify(data), {headers: {Authentication: `Bearer ${token}`}});
  return response.data;
};

export { signUpAPI, loginAPI, reportAPI };
