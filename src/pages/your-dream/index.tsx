import WrapperLayouts from '../../layouts/wrapper/wrapper.layouts.tsx'
import Buttonicon from '@components/atom/buttonicon'
import back from '@assets/svgs/back.svg'
import { useNavigate, useParams } from 'react-router-dom'
import MediaPopup from '@components/atom/mediapop'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import ArRender360 from '@components/WebAR/ArRender360.tsx'
import useDream from '@services/api/dream'
import { bottomPopup } from '@utils/bottomPopup/bottomPopup.ts'

const motionFade = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}
const YourDream = () => {
  const params = useParams()
  const dream_v1 = useDream()
  const navigate = useNavigate()
  const [currentComponent, setCurrentComponent] = useState<any>('waiting')
  const [showPopup, setShowPopup] = useState<boolean>(true)
  const ready = () => {
    setCurrentComponent('360')
  }
  const hidePopup = () => {
    setShowPopup(false)
  }
  const popupHideAfter = (second: number) => {
    setTimeout(() => {
      hidePopup()
    }, second)
  }
  useEffect(() => {
    if (params?.id) {
      dream_v1.getDetailDo(parseInt(params?.id, 10))
    }
  }, [params?.id])
  useEffect(() => {
    if (currentComponent === '360') {
      popupHideAfter(3000)
    }
  }, [currentComponent])
  useEffect(() => {
    if (!showPopup && currentComponent === '360') {
      console.log('show popup')
      setTimeout(() => {
        bottomPopup({
          title: dream_v1.singleData?.description ?? '',
        }).then((res) => {
          if (res) {
            navigate('/questions')
          }
        })
      }, 5000)
    }
  }, [showPopup])
  return (
    <WrapperLayouts isFull={true} allDevice>
      <div className=''>
        <div className='absolute top-5 left-5 text-left z-10'>
          <Buttonicon
            icon={back}
            onClick={() => {
              navigate('/dreams')
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
              <ArRender360
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

export default YourDream
