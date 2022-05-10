/**
 * @author KimJooHo
 */

import { axiosInstance } from './axiosInstance';

interface IheartReqDATA {
  user: number;
}

interface IheartResponse {
  sendUser: number;
  receiveUser: number;
}

const heartSendSetAPI = async (
  data: IheartReqDATA,
): Promise<IheartResponse[]> => {
  const response = await axiosInstance.get('/heart/sendheartlist', {
    params: { user: `${data.user}` },
  });

  return response.data;
};

export { heartSendSetAPI };
