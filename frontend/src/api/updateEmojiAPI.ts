import createAxiosInstance from './axiosInstance';

interface IUpdateEmojiReqData {
  emoji: string;
}


const updateEmojiAPI = async (data: IUpdateEmojiReqData) => {
  const axiosInstance = createAxiosInstance()
  const response = await axiosInstance.post('/accounts/emoji', JSON.stringify(data));
  return response;
};

export default updateEmojiAPI;