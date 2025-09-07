import { IQuiz, UserAnswer } from "@/types";
import axiosInstance from "@/utils/restAPIConfig";

export const getAllQuizzesAPI = async () => {
  const response = await axiosInstance.get('/quizzes');
  return response.data;
};

export const getQuizByIdAPI = async (id: number) => {
  const response = await axiosInstance.get(`/quizzes/${id}`);
  return response.data;
};

export const createQuizAPI = async (quizDto: IQuiz) => {
  const response = await axiosInstance.post('/quizzes', quizDto);
  return response.data;
};

export const deleteQuizAPI = async (id: number) => {
  const response = await axiosInstance.delete(`/quizzes/${id}`);
  return response.data;
};

export const submitQuizAPI = async (quizId: number, answers: UserAnswer) => {
  const response = await axiosInstance.post(`/quizzes/${quizId}/submit`, answers);
  return response.data;
}
