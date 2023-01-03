/**
 * @author KimJooHo
 */

import { axiosInstance } from './axiosInstance';

/**
 * @author 이주현 | 인터페이스 및 함수 변경
 */
interface IheartReqDATA {
  accountSeq: Number;
  firstName: string;
  lastName: string;
  schoolSeq: 1; // 추후 변경 예정
}

interface IheartResponse {
  accountSeq: Number;
  firstName: string;
  lastName: string;
  schoolSeq: 1; // 추후 변경 예정
}

const heartSendSetAPI = async (
  data: IheartReqDATA,
): Promise<IheartResponse> => {
  console.log(data)

  const response = await axiosInstance.post('/heart', {
    ...data
  });

  return response.data;
};

export { heartSendSetAPI };
