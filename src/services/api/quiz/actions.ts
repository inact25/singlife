import http from '@utils/http.ts'
import { CommonResponse, PaginationResponse } from '@models/common'
import { AxiosResponse } from 'axios'
import {
  ListQuiz,
  ListQuizParams,
  QuizSubmitBody,
  QuizSubmitResponse,
} from '@services/api/quiz/type'

export const getQuizList = async (params: ListQuizParams | null) => {
  return http
    .get('/api/v1/quiz/list', {
      params,
    })
    .then((response: AxiosResponse) => {
      return response.data as PaginationResponse<ListQuiz>
    })
}

export const submitQuiz = async (body: QuizSubmitBody | null) => {
  return http
    .post('/api/v1/quiz/list', body)
    .then((response: AxiosResponse) => {
      return response.data as CommonResponse<QuizSubmitResponse>
    })
}
