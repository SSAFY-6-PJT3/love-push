import createAxiosInstance from './axiosInstance';

interface IReadEmojiUserReqData {
  userId: string;
}
interface IReadEmojiUserResponse {
  id: string;
  emoji: string;
}

const readEmojiAPI = async (data: IReadEmojiUserReqData): Promise<IReadEmojiUserResponse> => {
  const axiosInstance = createAxiosInstance()
  const response = await axiosInstance.get(`/accounts/${data.userId}/emoji`);
  return response.data;
};

export default readEmojiAPI;