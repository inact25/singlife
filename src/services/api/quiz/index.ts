import useLoading from '../../../hooks/useLoading.ts'
import usePagination from '../../../hooks/usePagination.ts'
import { getQuizList, submitQuiz } from '@services/api/quiz/actions.ts'
import {
  ListQuiz,
  ListQuizParams,
  QuizSubmitBody,
} from '@services/api/quiz/type'

const useQuiz = () => {
  const { loading, on, off } = useLoading()
  const { data, handleData, ...paginate } = usePagination<
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
  return {
    loading,
    data,
    getQuizListDo,
    submitQuizDo,
    paginate: {
      ...paginate,
    },
  }
}

export default useQuiz
