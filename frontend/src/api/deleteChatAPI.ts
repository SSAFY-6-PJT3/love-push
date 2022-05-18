import { axiosInstance } from './axiosInstance';

interface IDeleteChatReqData {
  userId?: string,
  roomId?: string,
}

const deleteChatAPI = async (data: IDeleteChatReqData, token: string) => {
  const response = await axiosInstance.delete(
    '/chatroom',
    {
      data: JSON.stringify(data),
      headers: {token: `Bearer ${token}`},
    }
  );
  return response.data;
};

export { deleteChatAPI };
