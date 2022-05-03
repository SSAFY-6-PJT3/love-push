/**
 * @author Hanseunghun
 */

import { axiosInstance } from './axiosInstance';

export type SlidesProps = {
  emojiUrl: string;
};

interface IReadEmojiReqData {
  emojiUrl: string;
}

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
  emojiUrl: SlidesProps;
}


const updateEmojiAPI = async (data: IUpdateEmojiReqData, token: string) => {
  console.log(data)
  console.log(token)
  const response = await axiosInstance.post('/accounts/emoji', JSON.stringify(data), {headers: {Authentication: `Bearer ${token}`}});
  return response;
};

const readEmojiUserAPI = async (data: IReadEmojiUserReqData): Promise<IReadEmojiUserResponse> => {
  const response = await axiosInstance.get(`/accounts/${data.userId}/emoji`);
  return response.data;
};

const readEmojiAPI = async (data: IReadEmojiReqData): Promise<IReadEmojiResponse> => {
  const response = await axiosInstance.post('/emojis', JSON.stringify(data));
  return response.data;
};

export { readEmojiAPI, updateEmojiAPI, readEmojiUserAPI };