import http from '@utils/http.ts'
import { CommonResponse, PaginationResponse } from '@models/common'
import { AxiosResponse } from 'axios'
import {
  ListQuiz,
  ListQuizParams,
  QuizSubmitBody,
  QuizSubmitResponse,
} from '@services/api/quiz/type'
import { rpc } from '@services/api/rpc.ts'

export const getQuizList = async (params: ListQuizParams | null) => {
  return http
    .get('mocktail/quiz_list', {
      params,
    })
    .then((response: AxiosResponse) => {
      return response.data as PaginationResponse<ListQuiz>
    })
}

export const submitQuiz = async (body: QuizSubmitBody | null) => {
  return http
    .post('mocktail/quiz_submit', body)
    .then((response: AxiosResponse) => {
      return response.data as CommonResponse<QuizSubmitResponse>
    })
}
type PropsQuizRPC = {
  q_id: number
  c_id?: number
}
export const getQuizRPC = async ({ q_id, c_id }: PropsQuizRPC) => {
  return rpc({
    e: 'list',
    method: 'GET',
    params: {
      q_id,
      c_id: c_id || 0,
    },
  }).then((response) => {
    return response as ListQuiz
  })
}
