/**
 * @author Hanseunghun
 */

import { axiosInstance } from './axiosInstance';

interface IReadFeedDetailReqData {
  feedId: number;
  userId: number;
}

interface IDeleteFeedReqData {
  feedId: number;
}

interface IUpdateFeedReqData {
  content: string;
  feedId: number;
  mediaUrl: string;
  title: string;
  updatedAt: string;
}

interface ICreateFeedReqData {
  content: string;
  mediaUrl?: string;
  userId: number;
  school?: string;
}

interface IReadFeedUserReqData {
  userId: number;
}

interface ICreateFeedCommentReqData {
  content: string;
  feedId: number;
  userId: number;
}

interface IDeleteFeedCommentReqData {
  feedId: number;
  commentId: number;
  userId: number;
}

interface IReadFeedCommentReqData {
  feedId: number;
}

interface IReadFeedReqData {
  userId: number;
  school?: string;
}

interface IAddFeedLikeReqData {
  feedId: number;
  userId: number;
}

interface IDeleteFeedLikeReqData {
  feedId: number;
  userId: number;
}

interface IAddCommentLikeReqData {
  commentId: number;
  userId: number;
}

interface IDeleteCommentLikeReqData {
  commentId: number;
  userId: number;
}



interface ICreateFeedChildCommentReqData {
  commentId: number;
  content: string;
  userId: number;
}

interface IDeleteFeedChildCommentReqData {
  commentId: number;
  childId: number;
}

const addCommentLikeAPI = async (data: IAddCommentLikeReqData) => {
  const response = await axiosInstance.post(
    `feed/comment/${data.commentId}/likes/${data.userId}`,
    JSON.stringify(data),
  );
  return response;
};

const deleteCommentLikeAPI = async (data: IDeleteCommentLikeReqData) => {
  const response = await axiosInstance.delete(
    `feed/comment/${data.commentId}/likes/${data.userId}`,
  );
  return response.data;
};

const addFeedLikeAPI = async (data: IAddFeedLikeReqData) => {
  const response = await axiosInstance.post(
    `feed/${data.feedId}/likes/${data.userId}`,
    JSON.stringify(data),
  );
  return response;
};

const deleteFeedLikeAPI = async (data: IDeleteFeedLikeReqData) => {
  const response = await axiosInstance.delete(
    `feed/${data.feedId}/likes/${data.userId}`,
  );
  return response.data;
};


const readFeedListAPI = async (data: IReadFeedReqData) => {
  const response = await axiosInstance.get(`feed/feeds/list/school/${data.school}/${data.userId}`,
    {params: { school: data.school, userId: data.userId }});
  return response.data;
};

const updateFeedAPI = async (data: IUpdateFeedReqData) => {
  const response = await axiosInstance.post(
    `feed/feeds/${data.feedId}`,
    JSON.stringify(data),
  );
  return response;
};

const createFeedAPI = async (data: ICreateFeedReqData) => {
  const response = await axiosInstance.post(
    `feed/feeds/${data.userId}`,
    JSON.stringify(data),
  );
  return response;
};

const readFeedDetailAPI = async (data: IReadFeedDetailReqData) => {
  const response = await axiosInstance.get(
    `feed/feeds/${data.feedId}/${data.userId}`,
  );
  return response.data;
};

const deleteFeedAPI = async (data: IDeleteFeedReqData) => {
  const response = await axiosInstance.delete(`feed/feeds/${data.feedId}`);
  return response.data;
};

const readFeedUserAPI = async (data: IReadFeedUserReqData) => {
  const response = await axiosInstance.get(
    `feed/feeds/profiles/${data.userId}`,
  );
  return response.data;
};

const createFeedCommentAPI = async (data: ICreateFeedCommentReqData) => {
  const response = await axiosInstance.post(
    `feed/${data.feedId}/comments/${data.userId}/`,
    JSON.stringify(data),
  );
  return response.data;
};

const deleteFeedCommentAPI = async (data: IDeleteFeedCommentReqData) => {
  const response = await axiosInstance.delete(
    `feed/${data.feedId}/comments/${data.commentId}`,
  );
  return response.data;
};

const readFeedCommentAPI = async (data: IReadFeedCommentReqData) => {
  const response = await axiosInstance.delete(`feed/${data.feedId}/comments`);
  return response.data;
};

const createFeedChildCommentAPI = async (data: ICreateFeedChildCommentReqData) => {
  const response = await axiosInstance.post(`feed/${data.commentId}/childcomments/${data.userId}/`,
  JSON.stringify(data));
  return response.data;
}

const deleteFeedChildCommentAPI =async (data: IDeleteFeedChildCommentReqData) => {
  const response = await axiosInstance.delete(`feed/${data.commentId}/childcomments/${data.childId}/`,
  {params: { childdCommentId: data.childId }}
  )
  return response.data;
}

export {
  createFeedAPI,
  deleteFeedAPI,
  readFeedDetailAPI,
  readFeedListAPI,
  updateFeedAPI,
  readFeedUserAPI,
  createFeedCommentAPI,
  deleteFeedCommentAPI,
  readFeedCommentAPI,
  addFeedLikeAPI,
  deleteFeedLikeAPI,
  deleteFeedChildCommentAPI,
  createFeedChildCommentAPI,
  addCommentLikeAPI,
  deleteCommentLikeAPI,
};
