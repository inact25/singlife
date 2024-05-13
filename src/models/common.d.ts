export type CommonResponse<T> = {
  code: number
  message: string
  data: T
}

export type PaginationResponse<T> = {
  data: T[]
  meta: {
    total_dreams: number
    cur_page: number
    next_page: number
    per_page: number
    total_pages: number
  }
}

export type DefaultFilter = {
  page: number
  limit: number
  order_by?: string
  order?: string
  search?: string
}
