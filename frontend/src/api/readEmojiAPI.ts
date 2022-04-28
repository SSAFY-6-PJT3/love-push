import axiosInstance from './axiosInstance';

interface IReadEmojiResponse {
  id: string;
  emoji: string;
}

const readEmojiUser = async (): Promise<IReadEmojiResponse> => {
  const response = await axiosInstance(null).get('/accounts/emoji');
  return response.data;
};

export default readEmojiUser;