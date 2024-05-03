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

type Props = {
  selected: number
  handleBack?: (id: number) => void
  record: ListQuiz
  onChange?: (values: QuizSubmitItem) => void
  value?: QuizSubmitItem
  index: number
  handleNext?: () => void
  isLast?: boolean
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
  record,
  onChange,
  value,
  index,
  handleNext,
  isLast,
  handleSubmit,
}) => {
  const [isActive, setIsActive] = useState(false)
  const isShow = selected === record.quest_id
  const isChecked = (id: number) => {
    return value?.answer_id === id
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsActive(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [selected, record.quest_id])
  useEffect(() => {
    setIsActive(false)
  }, [selected])
  if (!isShow) return null

  return (
    <div className=''>
      <div className='absolute top-5 left-5 text-left z-10'>
        <Buttonicon
          icon={back}
          onClick={() => handleBack && handleBack(record.quest_id - 1)}
        />
      </div>
      <div
        style={{
          backgroundSize: 'cover',
          background: `url(${switchImage(index)}) center center no-repeat`,
        }}
        className='image-screen w-screen min-h-screen flex items-center'
      >
        <div className='w-full'>
          <div
            className={` ${index === 0 ? 'mt-[-15rem]' : index === 1 ? 'absolute -top-10 right-0' : 'absolute top-16 right-0'}`}
          >
            <motion.img
              transition={{
                y: motionImageConfig.transition.y,
              }}
              animate={{
                y: motionImageConfig.animate.y,
              }}
              src={index === 0 ? object1 : index === 1 ? object2 : object3}
              alt={''}
            />
          </div>
          <div
            className={`content absolute bottom-0 text-start bg-white rounded-t-[32px] w-full`}
          >
            <WrapperLayouts>
              <h2 className={`title mt-5 text-black`}>
                {htmlParser(record.question)}
                {!isActive && (
                  <div className='w-full m-auto my-5'>
                    <Slidedot
                      position={'center'}
                      color={colorPicker(index)}
                      indexActive={index}
                    />
                  </div>
                )}
              </h2>
              <motion.div
                className='content mt-10'
                initial={'closed'}
                animate={isActive ? 'open' : 'closed'}
                variants={motionConfig}
              >
                {record.choices.map((item) => (
                  <div className='flex gap-3 items-center mb-3' key={item.id}>
                    <Radio
                      color={colorPicker(index)}
                      type='round'
                      checked={isChecked(item.id)}
                      onChange={() => {
                        onChange &&
                          onChange({
                            quiz_id: record.quest_id,
                            answer_id: item.id,
                          })
                      }}
                    />
                    <p className='body-1 text-black'>{item.choice}</p>
                  </div>
                ))}
                <div className='grid grid-cols-12 gap-3 items-center mt-10 mb-3'>
                  <div className='col-span-4'>
                    <Slidedot indexActive={index} color={colorPicker(index)} />
                  </div>
                  <div className='col-span-8'>
                    <Button
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
