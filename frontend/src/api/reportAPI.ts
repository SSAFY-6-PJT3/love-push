import axiosInstance from './axiosInstance';

interface IReportReqData {
  id: string;
}
interface IReportResponse {
  postReport: () => void;
}

const reportAPI = async (data: IReportReqData): Promise<IReportResponse> => {
  const response = await axiosInstance(null).post('/accounts/report', JSON.stringify(data));
  return response.data;
};

export default reportAPI;
