export type CommonResponse<T> = {
  code: number
  message: string
  data: T
}

export type PaginationResponse<T> = {
  data: T[]
  meta: {
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
}

export type DefaultFilter = {
  page: number
  limit: number
  order_by?: string
  order?: string
  search?: string
}
