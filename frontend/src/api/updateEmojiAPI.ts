import axiosInstance from './axiosInstance';

interface IUpdateEmojiReqData {
  emoji: string;
}
interface IUpdateEmojiResponse {
  postReport: () => void;
}

const updateEmojiAPI = async (data: IUpdateEmojiReqData): Promise<IUpdateEmojiResponse> => {
  const response = await axiosInstance(null).post('/accounts/emoji', JSON.stringify(data));
  return response.data;
};

export default updateEmojiAPI;