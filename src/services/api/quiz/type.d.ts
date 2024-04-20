import { DefaultFilter } from '@models/common'

export type ListQuiz = {
  title: string
  featured_image: string
  description: string
  id: number
}
export type ListQuizParams = DefaultFilter

export type QuizSubmitBody = {
  quiz_id: number
  answer_id
}

export type QuizSubmitResponse = {
  url: string
  text: string
}
