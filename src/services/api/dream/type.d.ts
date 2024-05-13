import { DefaultFilter } from '@models/common'

export type ListDream = {
  id: string
  image: string
  influencer_name: string
  description: string
  thumbnail: string
}
export type ListLatestDream = {
  id: string
  image: string
}
export type ListDreamParams = DefaultFilter
export type ListDreamParamsV2 = {
  page: number
  rows: number
}
