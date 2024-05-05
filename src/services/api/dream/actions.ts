import http from '@utils/http.ts'
import { ListDream, ListDreamParams } from '@services/api/dream/type'
import { PaginationResponse } from '@models/common'
import { AxiosResponse } from 'axios'

export const getDreamList = async (params: ListDreamParams | null) => {
  return http
    .get('mocktail/dream_list', {
      params,
    })
    .then((response: AxiosResponse) => {
      return response.data as PaginationResponse<ListDream>
    })
}
