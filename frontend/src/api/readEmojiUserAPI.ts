import axiosInstance from './axiosInstance';

interface IReadEmojiUserReqData {
  userId: string;
}
interface IReadEmojiUserResponse {
  id: string;
  emoji: string;
}

const readEmojiAPI = async (data: IReadEmojiUserReqData): Promise<IReadEmojiUserResponse> => {
  const response = await axiosInstance(null).get(`/accounts/${data.userId}/emoji`);
  return response.data;
};

export default readEmojiAPI;