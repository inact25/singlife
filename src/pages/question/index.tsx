import WrapperLayouts from '../../layouts/wrapper/wrapper.layouts.tsx'
import { useEffect, useState } from 'react'
import RenderQuestion from './RenderQuestion.tsx'
import useQuiz from '@services/api/quiz'
import { QuizSubmitItem } from '@services/api/quiz/type'
import { useNavigate } from 'react-router-dom' // import question2 from '@assets/background/Question2.jpg'
// import question2 from '@assets/background/Question2.jpg'
// import question3 from '@assets/background/Question3.jpg'

const Question = () => {
  const navigate = useNavigate()
  const quiz_service = useQuiz()
  const [selected, setSelected] = useState<number | null>(null)
  const [answers, setAnswers] = useState<QuizSubmitItem[]>([])
  const pushAnswer = (values: QuizSubmitItem) => {
    const newAnswers = answers.filter((item) => item.quiz_id !== values.quiz_id)
    setAnswers([...newAnswers, values])
  }
  const handleChanges = (values: QuizSubmitItem) => {
    pushAnswer(values)
  }
  const handleBack = (id: number) => {
    const isAvailable = quiz_service.data.find((item) => item.quest_id === id)
    if (!isAvailable) {
      console.log('Route to get started')
      navigate('/')
      return
    }
    console.log('id', id)
    setSelected(id)
  }
  const handleNext = () => {
    const next = (selected ?? 0) + 1
    const isAvailable = quiz_service.data.find((item) => item.quest_id === next)
    if (!isAvailable) {
      console.log('Route to get started')
      return
    }
    setSelected(next)
  }
  const selectAnswer = (id: number) => {
    return answers.find((item) => item.quiz_id === id)?.answer_id
  }
  const handleSubmit = () => {
    quiz_service
      .submitQuizDo({
        answers,
      })
      .then((response) => {
        console.log('response', response.data)
      })
  }
  useEffect(() => {
    quiz_service.getQuizListDo()
  }, [quiz_service.paginate.filter])
  useEffect(() => {
    console.log('answers', answers)
  }, [answers])

  useEffect(() => {
    if (!selected && quiz_service.data.length > 0) {
      setSelected(quiz_service.data[0].quest_id)
    }
  }, [quiz_service.data])
  return (
    <WrapperLayouts isFull={true}>
      {quiz_service.data.map((record, index) => (
        <RenderQuestion
          key={record.quest_id}
          record={record}
          handleBack={handleBack}
          selected={selected ?? 0}
          index={index}
          onChange={handleChanges}
          value={{
            quiz_id: record.quest_id,
            answer_id: selectAnswer(record.quest_id) ?? 0,
          }}
          handleNext={handleNext}
          isLast={quiz_service.data.length - 1 === index}
          handleSubmit={handleSubmit}
        />
      ))}
    </WrapperLayouts>
  )
}

export default Question
