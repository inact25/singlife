import http from '@utils/http.ts'
import {
  ListDream,
  ListDreamParams,
  ListLatestDream,
} from '@services/api/dream/type'
import { PaginationResponse } from '@models/common'
import { AxiosResponse } from 'axios'
import { rpc } from '@services/api/rpc.ts'

export const getDreamList = async (params: ListDreamParams | null) => {
  return http
    .get('mocktail/dream_list', {
      params,
    })
    .then((response: AxiosResponse) => {
      return response.data as PaginationResponse<ListDream>
    })
}
export const getDreamListV2 = async (params: ListDreamParams | null) => {
  return rpc({
    e: 'explore',
    method: 'GET',
    params: params,
  }).then((response) => {
    return response as ListLatestDream[]
  })
}

export const getLatestDream = async () => {
  return rpc({
    e: 'introduce',
    method: 'GET',
    params: {},
  }).then((response) => {
    return response as ListLatestDream[]
  })
}
