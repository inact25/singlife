import {
  ListDream,
  ListDreamParamsV2,
  ListLatestDream,
} from '@services/api/dream/type'
import useLoading from '../../../hooks/useLoading.ts'
import usePagination from '../../../hooks/usePagination.ts'
import {
  getDreamFromInfluencer,
  getDreamListV2,
  getLatestDream,
} from '@services/api/dream/actions.ts'
import { useState } from 'react'

const useDream = () => {
  const { loading, on, off } = useLoading()
  const [latestDream, setLatestDream] = useState<ListLatestDream[]>([])
  const [totalDream, setTotalDream] = useState<number>(0)
  const { data, handleData, singleData, ...paginate } = usePagination<
    ListDream,
    ListDreamParamsV2
  >({
    defaultFilter: {
      page: 1,
      rows: 10,
    },
  })

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
  const getDreamListV2Do = async () => {
    on()
    try {
      const response = await getDreamListV2(paginate.filter)
      handleData(response.data)
      paginate.handlePagination({
        total: response.meta.total_pages,
        pageSize: response.meta.per_page,
        current: response.meta.cur_page,
      })
      setTotalDream(response.meta.total_dreams)
    } catch (e) {
      console.log(e)
    } finally {
      off()
    }
  }
  const getInfluencerDream = async () => {
    on()
    try {
      const response = await getDreamFromInfluencer()
      paginate.handleSingleData(response)
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
    singleData,
    totalDream,
    getLatestDreamDo,
    getDreamListV2Do,
    getInfluencerDream,
    paginate: {
      ...paginate,
    },
  }
}

export default useDream
