/* eslint-disable prettier/prettier */
import WrapperLayouts from '../../layouts/wrapper/wrapper.layouts.tsx'
import { useEffect, useState } from 'react'
import RenderQuestion from './RenderQuestion.tsx'
import useQuiz from '@services/api/quiz'
import { QuizSubmitItem } from '@services/api/quiz/type'
import { useNavigate } from 'react-router-dom' // import question2 from '@assets/background/Question2.jpg'
// import question2 from '@assets/background/Question2.jpg'
// import question3 from '@assets/background/Question3.jpg'
const question_ids = [1, 2, 3]
const Question = () => {
  const navigate = useNavigate()
  const quiz_service = useQuiz()
  const [selected, setSelected] = useState<number | null>(null)
  const [lastChoice, setLastChoice] = useState<number | null>(null)
  const [answers, setAnswers] = useState<QuizSubmitItem[]>([])
  const pushAnswer = (values: QuizSubmitItem) => {
    const newAnswers = answers.filter((item) => item.quiz_id !== values.quiz_id)
    setAnswers([...newAnswers, values])
  }
  const handleChanges = (values: QuizSubmitItem) => {
    pushAnswer(values)
  }
  const handleBack = (id: number) => {
    const isAvailable = question_ids.find((item) => item === id)
    if (!isAvailable) {
      console.log('Route to get started')
      navigate('/')
      return
    }
    const answer = answers.find((item) => item.quiz_id === id - 1)
    console.log('answer', answer)
    setLastChoice(answer?.answer_id ?? 0)
    setSelected(id)
  }
  const handleNext = () => {
    const next = (selected ?? 0) + 1
    const isAvailable = question_ids.find((item) => item === next)
    if (!isAvailable) {
      console.log('Route to get started')
      return
    }
    const answer = answers.find((item) => item.quiz_id === selected)
    setLastChoice(answer?.answer_id ?? 0)
    setSelected(next)
  }
  const selectAnswer = (id: number) => {
    return answers.find((item) => item.quiz_id === id)?.answer_id
  }
  const handleSubmit = () => {
    console.log('answers_submitted', answers)
    // quiz_service
    //   .submitQuizDo({
    //     answers,
    //   })
    //   .then((response) => {
    //     console.log('response', response.data)
    //     navigate('/ar')
    //   })
  }
  useEffect(() => {
    // quiz_service.getQuizListDo()
  }, [quiz_service.paginate.filter])
  return (
    <WrapperLayouts isFull={true}>
      <RenderQuestion
        handleBack={handleBack}
        selected={selected ?? 1}
        index={selected ? selected - 1 : 0}
        lastChoice={lastChoice}
        onChange={handleChanges}
        value={{
          quiz_id: selected ?? 1,
          answer_id: selectAnswer(selected ?? 1) ?? 0,
        }}
        handleNext={handleNext}
        isLast={selected === question_ids.length}
        handleSubmit={handleSubmit}
      />
    </WrapperLayouts>
  )
}

export default Question
