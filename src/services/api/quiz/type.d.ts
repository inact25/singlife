import { DefaultFilter } from '@models/common'

export type ListQuiz = {
  question_id: number
  question: string
  choices: {
    c_id: number
    c_text: string
  }[]
}
export type ListQuizParams = DefaultFilter
export type QuizSubmitItem = {
  quiz_id: number
  answer_id: number
}
export type QuizSubmitBody = {
  answers: QuizSubmitItem[]
}

export type QuizSubmitResponse = {
  show_image: string
  saved: boolean
  image_filename: string
  entry_id: number
}
