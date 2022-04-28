import createAxiosInstance from './axiosInstance';

interface IUpdateEmojiReqData {
  emoji: string;
}
interface IUpdateEmojiResponse {
  postReport: () => void;
}

const updateEmojiAPI = async (data: IUpdateEmojiReqData): Promise<IUpdateEmojiResponse> => {
  const axiosInstance = createAxiosInstance()
  const response = await axiosInstance.post('/accounts/emoji', JSON.stringify(data));
  return response.data;
};

export default updateEmojiAPI;