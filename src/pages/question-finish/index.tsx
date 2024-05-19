import WrapperLayouts from '../../layouts/wrapper/wrapper.layouts.tsx'
import Buttonicon from '@components/atom/buttonicon'
import back from '@assets/svgs/back.svg'
import {useParams} from 'react-router-dom'
import ArRenderAfterQuestion from '@components/WebAR/ArRenderAfterQuestion.tsx'
import MediaPopup from '@components/atom/mediapop'
import {motion} from 'framer-motion'
import {useEffect, useState} from 'react'
import useDream from '@services/api/dream'

const motionFade = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}
const QuestionFinish = () => {
  const params = useParams()
  const dream_v1 = useDream()
  const [currentComponent] = useState<any>('waiting')
  const [showPopup, setShowPopup] = useState<boolean>(true)
  const ready = (values: any) => {
    console.log('all', values)
    hidePopup()
  }
  const hidePopup = () => {
    setShowPopup(false)
  }
  useEffect(() => {
    if (params?.id) {
      dream_v1.getDetailDo(parseInt(params?.id?.split('-')[0], 10))
    }
  }, [params?.id])
  return (
    <WrapperLayouts isFull={true} allDevice>
      <div className=''>
        <div className='absolute top-5 left-5 text-left z-10'>
          <Buttonicon
            icon={back}
            onClick={() => {
              window.open('/dreams', '_self')
            }}
          />
        </div>
        <div className='w-screen min-h-screen flex items-center'>
          <div className='w-full'>
            <WrapperLayouts allDevice>
              {showPopup && (
                <motion.div
                  initial='hidden'
                  animate='visible'
                  variants={motionFade}
                  transition={{ duration: 0.5 }}
                  className='z-[999] relative'
                  onClick={hidePopup}
                >
                  <MediaPopup type={currentComponent} />
                </motion.div>
              )}
              <ArRenderAfterQuestion
                params={{
                  url: dream_v1?.singleData?.image,
                }}
                callback={ready}
              />
            </WrapperLayouts>
          </div>
        </div>
      </div>
    </WrapperLayouts>
  )
}

export default QuestionFinish
