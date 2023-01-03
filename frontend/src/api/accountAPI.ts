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
  token: string;
  emojiUrl: string;
  seq: string;
  firstName: string;
  lastName: string;
  schoolSeq: string;
  schoolName: string;
}

interface IReportReqData {
  reported?: number;
}

const signUpAPI = async (data: ISignupReqData): Promise<ISignupResponse> => {
  const response = await axiosInstance.post('/accounts', JSON.stringify(data));

  return response.data;
};

const idVaidateAPI = async (id: string): Promise<{ message: string }> => {
  const response = await axiosInstance.get('/accounts', { params: { id: id } });

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
  const response = await axiosInstance.post(
    '/accounts/report',
    JSON.stringify(data),
    { headers: { token: `Bearer ${token}` } },
  );
  return response.data;
};

export { signUpAPI, idVaidateAPI, loginAPI, reportAPI };
