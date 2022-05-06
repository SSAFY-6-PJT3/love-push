import { axiosInstance } from './axiosInstance';

interface IchatReqDATA {
  roomSeq: number;
}

interface IchatResponse {
  type: string;
  roomId: number;
  sender: number;
  message: string;
  sendTime: string;
}

const getChatLog = async (data: IchatReqDATA): Promise<IchatResponse[]> => {
  const response = await axiosInstance.get('/chat/chatlog', {
    params: { roomSeq: `${data.roomSeq}` },
  });

  return response.data;
};

export { getChatLog };
