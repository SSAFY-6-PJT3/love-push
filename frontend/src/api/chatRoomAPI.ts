/**
 * @author KimJooHo
 */

import { axiosInstance } from './axiosInstance';

interface IchatroomReqDATA {
  user: number;
}

interface IchatroomResponse {
  chatroomSeq: number;
  userList: Array<number>;
  activate: boolean;
}

const findMyRoomAPI = async (
  data: IchatroomReqDATA,
): Promise<IchatroomResponse[]> => {
  const response = await axiosInstance.get('/chat/findmyroom', {
    params: { user: `${data.user}` },
  });

  return response.data;
};

export { findMyRoomAPI };
