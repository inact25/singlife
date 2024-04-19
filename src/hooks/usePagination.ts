import { useState } from 'react'

type Props<T extends any> = {
  defaultFilter?: T
}
const usePagination = <dataType extends any, filterType extends any>(
  props: Props<filterType>,
) => {
  const defaultFilter: any = {
    page: 1,
    limit: 10,
    order_by: 'created_at',
    order: 'desc',
    search: '',
  }
  const [data, setData] = useState<dataType[]>([])
  const [singleData, setSingleData] = useState<dataType | null>(null)
  const [pagination, setPagination] = useState<{
    total: number
    pageSize: number
    current: number
  }>({
    total: 0,
    pageSize: 10,
    current: 1,
  })
  const [filter, setFilter] = useState<filterType | null>(
    props?.defaultFilter || defaultFilter,
  )

  const tableOnChange = (pagination: any) => {
    setPagination(pagination)
    if (filter) {
      setFilter({
        ...filter,
        page: pagination.current,
        limit: pagination.pageSize,
      })
    }
  }

  const tableOnSearch = (value: string) => {
    if (filter) {
      setFilter({
        ...filter,
        search: value,
      })
    }
  }

  const handleFilter = (pkey: any, pvalue: any) => {
    if (filter) {
      setFilter({
        ...filter,
        [pkey]: pvalue,
      })
    }
  }

  const handleSingleData = (values: dataType) => {
    setSingleData(values)
  }
  const handleData = (values: dataType[]) => {
    setData(values)
  }
  const handlePagination = (values: {
    total: number
    pageSize: number
    current: number
  }) => {
    setPagination(values)
  }

  return {
    data,
    singleData,
    pagination,
    filter,
    handleFilter,
    tableOnChange,
    tableOnSearch,
    handleSingleData,
    handleData,
    handlePagination,
  }
}

export default usePagination
