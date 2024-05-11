import useLoading from '../../../hooks/useLoading.ts'
import usePagination from '../../../hooks/usePagination.ts'
import {
  getQuizList,
  getQuizRPC,
  submitQuiz,
  submitQuizRPC,
} from '@services/api/quiz/actions.ts'
import {
  ListQuiz,
  ListQuizParams,
  QuizSubmitBody,
} from '@services/api/quiz/type'

const useQuiz = () => {
  const { loading, on, off } = useLoading()
  const { data, singleData, handleData, ...paginate } = usePagination<
    ListQuiz,
    ListQuizParams
  >({
    defaultFilter: {
      page: 1,
      limit: 10,
      order_by: 'created_at',
      order: 'desc',
    },
  })

  const getQuizListDo = async () => {
    on()
    const response = await getQuizList(paginate.filter)
    handleData(response.data)
    paginate.handlePagination({
      total: response.meta.total,
      pageSize: response.meta.per_page,
      current: response.meta.current_page,
    })
    off()
  }
  const submitQuizDo = async (body: QuizSubmitBody) => {
    on()
    const response = await submitQuiz(body)
    off()
    return response
  }
  const submitQuizRPCDo = async (body: QuizSubmitBody) => {
    on()
    try {
      return await submitQuizRPC(body)
    } catch (e) {
      console.log(e)
    } finally {
      off()
    }
  }
  const getQuizRPCDo = async (q_id: number, c_id?: number) => {
    on()
    try {
      const response = await getQuizRPC({ q_id, c_id })
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
    singleData,
    getQuizListDo,
    submitQuizDo,
    getQuizRPCDo,
    submitQuizRPCDo,
    paginate: {
      ...paginate,
    },
  }
}

export default useQuiz
