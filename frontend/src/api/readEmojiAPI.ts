import createAxiosInstance from './axiosInstance';

export type SlidesProps = {
  id: string;
  emoji: string;
};

export interface IReadEmojiResponse {
  data: Array<SlidesProps>
}

const readEmojiAPI = async (): Promise<IReadEmojiResponse> => {
  const axiosInstance = createAxiosInstance()
  const response = await axiosInstance.get('/accounts/emoji');
  return response.data;
};

export default readEmojiAPI;