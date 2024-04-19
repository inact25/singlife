import { ListDream, ListDreamParams } from '@services/api/dream/type'
import useLoading from '../../../hooks/useLoading.ts'
import usePagination from '../../../hooks/usePagination.ts'
import { getDreamList } from '@services/api/dream/actions.ts'

const useDream = () => {
  const { loading, on, off } = useLoading()
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
  return {
    loading,
    data,
    getDreamListDo,
    paginate: {
      ...paginate,
    },
  }
}

export default useDream
