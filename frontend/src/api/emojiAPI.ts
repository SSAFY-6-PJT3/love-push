/**
 * @author Hanseunghun
 */

import { axiosInstance } from './axiosInstance';

export type SlidesProps = {
  id: string;
  emoji: string;
};

export interface IReadEmojiResponse {
  data: Array<SlidesProps>
}

interface IReadEmojiUserReqData {
  userId: string;
}

interface IReadEmojiUserResponse {
  id: string;
  emoji: string;
}

interface IUpdateEmojiReqData {
  emoji: string;
}


const updateEmojiAPI = async (data: IUpdateEmojiReqData, token: string) => {
  const response = await axiosInstance.post('/accounts/emoji', JSON.stringify(data), {headers: {Authentication: `Bearer ${token}`}});
  return response;
};

const readEmojiUserAPI = async (data: IReadEmojiUserReqData): Promise<IReadEmojiUserResponse> => {
  const response = await axiosInstance.get(`/accounts/${data.userId}/emoji`);
  return response.data;
};

const readEmojiAPI = async (): Promise<IReadEmojiResponse> => {
  const response = await axiosInstance.get('/accounts/emoji');
  return response.data;
};

export { readEmojiAPI, updateEmojiAPI, readEmojiUserAPI };