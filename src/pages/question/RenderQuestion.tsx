import Buttonicon from '@components/atom/buttonicon'
import back from '@assets/svgs/back.svg'
import question1 from '@assets/background/Question1.jpg'
import question2 from '@assets/background/Question2.jpg'
import question3 from '@assets/background/Question3.jpg'
import object1 from '@assets/svgs/object1.svg'
import object2 from '@assets/svgs/object2.svg'
import object3 from '@assets/svgs/object3.svg'
import WrapperLayouts from '../../layouts/wrapper/wrapper.layouts.tsx'
import Slidedot from '@components/atom/slidedot'
import Radio from '@components/atom/radio'
import Button from '@components/atom/button'
import React, { useEffect, useState } from 'react'
import { ListQuiz, QuizSubmitItem } from '@services/api/quiz/type'
import htmlParser from 'html-react-parser'
import { motion } from 'framer-motion'
import useQuiz from '@services/api/quiz'
import womenLeader from '@assets/lottie/Woman on ladder.json'
import { Player } from '@lottiefiles/react-lottie-player'

type Props = {
  selected: number
  handleBack?: (id: number) => void
  onChange?: (values: QuizSubmitItem) => void
  value?: QuizSubmitItem
  index: number
  handleNext?: () => void
  isLast?: boolean
  lastChoice?: number | null
  handleSubmit: () => void
}
const switchImage = (index: number) => {
  switch (index) {
    case 0:
      return question1
    case 1:
      return question2
    case 2:
      return question3
    default:
      return question1
  }
}
const motionConfig = {
  closed: {
    height: 0,
    opacity: 0,
  },
  //open visible
  open: {
    height: 'auto',
    opacity: 1,
  },
}
const motionImageConfig = {
  transition: {
    y: {
      repeat: Infinity,
      repeatType: 'loop',
      duration: 1.5,
      ease: 'easeOut',
    },
  },
  animate: {
    y: [0, '2rem', 0],
  },
}
const colorPicker = (index: number) => {
  switch (index) {
    case 0:
      return 'singlife-purple'
    case 1:
      return 'singlife-turquoise'
    case 2:
      return 'singlife-orange'
    default:
      return 'singlife-purple'
  }
}
const RenderQuestion: React.FC<Props> = ({
  selected,
  handleBack,
  onChange,
  value,
  index,
  handleNext,
  isLast,
  handleSubmit,
  lastChoice = 0,
}) => {
  const quiz_service = useQuiz()
  const [record, setRecord] = useState<ListQuiz | null>(null)
  const [isActive, setIsActive] = useState(false)

  const isChecked = (id: number) => {
    return value?.answer_id === id
  }

  useEffect(() => {
    if (record?.question_id) {
      const timer = setTimeout(() => {
        setIsActive(true)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [record?.question_id])
  useEffect(() => {
    setIsActive(false)
  }, [selected])
  useEffect(() => {
    if (selected) {
      quiz_service.getQuizRPCDo(selected, lastChoice ?? 0)
    }
  }, [selected])

  useEffect(() => {
    if (quiz_service.singleData) {
      setRecord(quiz_service.singleData)
    }
  }, [quiz_service.singleData])

  if (record === null) {
    return <div></div>
  }

  return (
    <div className=''>
      <div className='absolute top-5 left-5 text-left z-10'>
        <Buttonicon
          icon={back}
          onClick={() => handleBack && handleBack(record.question_id - 1)}
        />
      </div>
      <div
        style={{
          backgroundSize: 'cover',
          background: `url(${switchImage(index)}) center center no-repeat`,
        }}
        className='image-screen w-screen min-h-[100dvh] flex items-center'
      >
        <div className='w-full'>
          <div
            className={` ${index === 0 ? 'mt-[-15rem]' : index === 1 ? 'absolute -top-10 right-0' : 'absolute top-16 right-0'}`}
          >
            {index === 2 && (
              <div>
                <Player
                  autoplay={true}
                  loop={true}
                  controls={false}
                  src={womenLeader}
                  style={{ height: '100%', width: '80vw', marginLeft: 'auto' }}
                />
              </div>
            )}
            {index !== 2 && (
              <motion.img
                transition={{
                  y: motionImageConfig.transition.y,
                }}
                animate={{
                  y: motionImageConfig.animate.y,
                }}
                src={index === 0 ? object1 : index === 1 ? object2 : object3}
                alt={''}
                style={{ maxWidth: '80vw' }}
              />
            )}
          </div>
          <div
            className={`content absolute bottom-0 text-start bg-white rounded-t-[32px] w-full`}
          >
            <WrapperLayouts>
              <h2 className={`title text-black w-[300px]`}>
                {htmlParser(record.question)}
                {!isActive && (
                  <div className='w-full m-auto my-5 overflow-hidden'>
                    <Slidedot
                      position={'center'}
                      color={colorPicker(index)}
                      indexActive={index}
                    />
                  </div>
                )}
              </h2>
              <motion.div
                className='content'
                initial={'closed'}
                animate={isActive ? 'open' : 'closed'}
                variants={motionConfig}
              >
                {record.choices.map((item) => (
                  <div className='flex gap-3 items-center mb-3' key={item.c_id}>
                    <div>
                      <Radio
                        color={colorPicker(index)}
                        type='round'
                        checked={isChecked(item.c_id)}
                        onChange={() => {
                          onChange &&
                            onChange({
                              quiz_id: record?.question_id,
                              answer_id: item.c_id,
                            })
                        }}
                      />
                    </div>
                    <div>
                      <p className='body-1 text-black'>{item.c_text}</p>
                    </div>
                  </div>
                ))}
                <div className='grid grid-cols-12 gap-3 items-center pt-[24px]'>
                  <div className='col-span-4'>
                    <Slidedot indexActive={index} color={colorPicker(index)} />
                  </div>
                  <div className='col-span-8'>
                    <Button
                      disabled={value?.answer_id === 0}
                      type='default'
                      title={isLast ? 'Submit' : 'Next'}
                      onClick={isLast ? handleSubmit : handleNext}
                      color={colorPicker(index)}
                    />
                  </div>
                </div>
              </motion.div>
            </WrapperLayouts>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RenderQuestion
