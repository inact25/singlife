import { DefaultFilter } from '@models/common'

export type ListQuiz = {
  quest_id: number
  question: string
  choices: {
    id: number
    choice: string
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
  url: string
  text: string
}
