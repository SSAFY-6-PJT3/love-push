import { axiosInstance } from './axiosInstance';

interface IContactReqDATA {
  type: string;
  content: string;
}

const postContactAPI = async (
  data: IContactReqDATA,
) => {
  const response = await axiosInstance.post(
    '/contacts',
    JSON.stringify(data)
  );

  return response.data;
};

const getContactAPI = async () => {
  const response = await axiosInstance.get(
    '/contacts',
  );

  return response.data;
};

export { getContactAPI, postContactAPI };
