import {
  ListDream,
  ListDreamParams,
  ListLatestDream,
} from '@services/api/dream/type'
import useLoading from '../../../hooks/useLoading.ts'
import usePagination from '../../../hooks/usePagination.ts'
import { getDreamList, getLatestDream } from '@services/api/dream/actions.ts'
import { useState } from 'react'

const useDream = () => {
  const { loading, on, off } = useLoading()
  const [latestDream, setLatestDream] = useState<ListLatestDream[]>([])
  const { data, handleData, ...paginate } = usePagination<
    ListDream,
    ListDreamParams
  >({
    defaultFilter: {
      page: 1,
      limit: 10,
      order_by: 'created_at',
      order: 'desc',
    },
  })

  const getDreamListDo = async () => {
    on()
    const response = await getDreamList(paginate.filter)
    handleData(response.data)
    paginate.handlePagination({
      total: response.meta.total,
      pageSize: response.meta.per_page,
      current: response.meta.current_page,
    })
    off()
  }
  const getLatestDreamDo = async () => {
    on()
    try {
      const response = await getLatestDream()
      setLatestDream(response)
    } catch (e) {
      console.log(e)
    } finally {
      off()
    }
  }
  return {
    loading,
    data,
    latestDream,
    getDreamListDo,
    getLatestDreamDo,
    paginate: {
      ...paginate,
    },
  }
}

export default useDream
