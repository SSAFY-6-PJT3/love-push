/**
 * @author Hyeonsooryu
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

class UserService {
  public static async Signup(data: ISignupReqData): Promise<ISignupResponse> {
    const response = await axiosInstance.post<ISignupResponse>(
      '/accounts',
      JSON.stringify(data),
    );

    return response.data;
  }
}

export default UserService;
