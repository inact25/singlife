import { DefaultFilter } from '@models/common'

export type ListDream = {
  title: string
  featured_image: string
  description: string
  id: number
}
export type ListDreamParams = DefaultFilter
