import Buttonicon from '@components/atom/buttonicon'
import back from '@assets/svgs/back.svg'
import question1 from '@assets/background/Question1.png'
import question2 from '@assets/background/Question2.png'
import question3 from '@assets/background/Question3.png'
import object1 from '@assets/svgs/object1.svg'
import object2 from '@assets/svgs/women-balloon.svg'
import object3 from '@assets/svgs/man-balloon.svg'
import object4 from '@assets/svgs/object3.svg'
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
import MediaPopup from '@components/atom/mediapop'
import { formFill, formViewTrigger } from '@hooks/useAdobe.ts'

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
      duration: 1,
      ease: 'linear',
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
const parseToText = (text: string) => {
  return text.replace(/<[^>]*>?/gm, '')
}
console.log(parseToText('<p>hello</p>'))
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
  const [isLoading, setIsLoading] = useState(true)
  const [firstInteraction, setFirstInteraction] = useState(false)

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

      const timeOut = setTimeout(() => {
        setIsLoading(false)
      }, 2500)

      return () => {
        clearTimeout(timeOut)
      }
    }
  }, [selected])

  useEffect(() => {
    if (quiz_service.singleData) {
      setRecord(quiz_service.singleData)
      formFill(
        `sg|dreamcube-quiz`,
        parseToText(quiz_service.singleData.question),
        '',
      )
    }
  }, [quiz_service.singleData])

  if (record === null) {
    return <div></div>
  }

  return (
    <>
      {isLoading ? (
        <div className='min-h-[100dvh] flex justify-center items-center'>
          <MediaPopup className='max-w-[350px]' show={true} type='loader' />
        </div>
      ) : (
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
                className={` ${index === 0 ? 'mt-[-15rem]' : index === 1 ? 'absolute -top-10 right-0' : 'absolute women-ladder right-0'}`}
              >
                {index === 2 && (
                  <div>
                    <Player
                      autoplay={true}
                      loop={true}
                      controls={false}
                      src={womenLeader}
                      style={{
                        height: '100%',
                        width: '100vw',
                        marginLeft: 'auto',
                      }}
                    />
                  </div>
                )}
                {index === 1 && (
                  <div className={'flex justify-between w-[100dvw]  gap-10'}>
                    <div style={{ marginTop: '10rem' }}>
                      <motion.img
                        transition={{
                          y: motionImageConfig.transition.y,
                        }}
                        animate={{
                          y: motionImageConfig.animate.y,
                        }}
                        src={object2}
                        alt={''}
                        style={{ maxWidth: '50vw' }}
                      />
                    </div>
                    <motion.img
                      transition={{
                        y: motionImageConfig.transition.y,
                      }}
                      animate={{
                        y: motionImageConfig.animate.y,
                      }}
                      src={object3}
                      alt={''}
                      style={{ maxWidth: '50vw' }}
                    />
                  </div>
                )}
                {index !== 2 && index !== 1 && (
                  <motion.img
                    transition={{
                      y: motionImageConfig.transition.y,
                    }}
                    animate={{
                      y: motionImageConfig.animate.y,
                    }}
                    src={
                      index === 0 ? object1 : index === 1 ? object3 : object4
                    }
                    alt={''}
                    style={{ maxWidth: '100vw' }}
                  />
                )}
              </div>
              <div
                className={`content absolute bottom-0 text-start bg-white rounded-t-[32px] w-full`}
              >
                <WrapperLayouts>
                  <h2
                    className={`title text-black w-[300px] ${isActive ? 'custom-popup' : 'pb-0'}`}
                  >
                    {htmlParser(record.question)}
                    {!isActive && (
                      <div className='w-full custom-padding-quiz overflow-hidden'>
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
                      <div
                        className='flex gap-3 items-center mb-3'
                        key={item.c_id}
                      >
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
                                  text: item.c_text,
                                })
                              if (record?.question_id) {
                                formFill(
                                  `sg|dreamcube-quiz`,
                                  parseToText(record.question),
                                  parseToText(item.c_text),
                                )
                                if (!firstInteraction) {
                                  setFirstInteraction(true)
                                  formViewTrigger()
                                }
                              }
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
                        <Slidedot
                          indexActive={index}
                          color={colorPicker(index)}
                        />
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
      )}
    </>
  )
}

export default RenderQuestion
