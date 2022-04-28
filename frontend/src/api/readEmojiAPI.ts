import createAxiosInstance from './axiosInstance';

interface IReadEmojiResponse {
  id: string;
  emoji: string;
}

const readEmojiUser = async (): Promise<IReadEmojiResponse> => {
  const axiosInstance = createAxiosInstance()
  const response = await axiosInstance.get('/accounts/emoji');
  return response.data;
};

export default readEmojiUser;