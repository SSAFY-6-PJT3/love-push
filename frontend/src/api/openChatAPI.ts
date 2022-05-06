/**
 * @author Hanseunghun
 */

import axios from 'axios';

interface IOpenChatReqData {
  sendUser: string;
  receiveUser: string;
}

const openChatAPI = async (data: IOpenChatReqData) => {
  const response = await axios.post(
    'https://www.someone-might-like-you.com/api/chat/room',
    data,
  );
  return response;
};

export { openChatAPI };
