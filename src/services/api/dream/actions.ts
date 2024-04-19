import http from '@utils/http.ts'
import { ListDream, ListDreamParams } from '@services/api/dream/type'
import { PaginationResponse } from '@models/common'

export const getDreamList = async (params: ListDreamParams | null) => {
  return http
    .get('/api/v1/dreams/list', {
      params,
    })
    .then((response: { data: PaginationResponse<ListDream> }) => {
      return response.data as PaginationResponse<ListDream>
    })
}
