import createAxiosInstance from './axiosInstance';

interface IReportReqData {
  id?: string;
}
interface IReportResponse {
  postReport: () => void;
}

const reportAPI = async (data: IReportReqData): Promise<IReportResponse> => {
  const axiosInstance = createAxiosInstance()
  const response = await axiosInstance.post('/accounts/report', JSON.stringify(data));
  return response.data;
};

export default reportAPI;
