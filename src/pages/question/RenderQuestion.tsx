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
import React from 'react'
import { ListQuiz, QuizSubmitItem } from '@services/api/quiz/type'
import htmlParser from 'html-react-parser'

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
  const isActive = selected === record.quest_id
  if (!isActive) {
    return null
  }
  const isChecked = (id: number) => {
    return value?.answer_id === id
  }
  return (
    <div className=''>
      <div className='absolute top-5 left-5 text-left'>
        <Buttonicon
          icon={back}
          onClick={() => handleBack && handleBack(record.quest_id - 1)}
        />
      </div>
      <div
        style={{
          backgroundSize: 'cover',
          background: `url(${index === 0 ? question1 : index === 1 ? question2 : question3}) center center no-repeat`,
        }}
        className='image-screen w-screen min-h-screen flex items-center'
      >
        <div className='w-full'>
          <div
            className={`${index === 0 ? 'mt-[-15rem]' : index === 1 ? 'absolute top-0 right-0' : 'absolute top-16 right-0'}`}
          >
            <img
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
                    <Slidedot position={'center'} indexActive={index} />
                  </div>
                )}
              </h2>
              <div className={`content mt-10 ${!isActive && 'hidden'}`}>
                {record.choices.map((item) => (
                  <div className='flex gap-3 items-center mb-3' key={item.id}>
                    <Radio
                      type={'round'}
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
                    <Slidedot indexActive={index} />
                  </div>
                  <div className='col-span-8'>
                    <Button
                      type={'default'}
                      title={isLast ? 'Submit' : 'Next'}
                      onClick={isLast ? handleSubmit : handleNext}
                    />
                  </div>
                </div>
              </div>
            </WrapperLayouts>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RenderQuestion
