import WrapperLayouts from '../../layouts/wrapper/wrapper.layouts.tsx'
import Buttonicon from '@components/atom/buttonicon'
import back from '@assets/svgs/back.svg'
import { useNavigate } from 'react-router-dom'
import ArRender from '@components/WebAR/ArRender.tsx'
import MediaPopup from '@components/atom/mediapop'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const componentSequence = ['waiting', 'tap', '360']
const motionFade = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}
const YourDream = () => {
  const navigate = useNavigate()
  const [currentComponent, setCurrentComponent] = useState<any>(
    componentSequence[0],
  )
  const getAllQS = () => {
    const urlParams = new URLSearchParams(window.location.search)
    return Object.fromEntries(urlParams.entries())
  }
  const qs = getAllQS()
  useEffect(() => {
    //change transition sequence each 3000
    let index = 0
    const interval = setInterval(() => {
      index = index + 1
      if (index >= componentSequence.length) {
        index = 0
      }
      setCurrentComponent(componentSequence[index])
    }, 3000)
    return () => clearInterval(interval)
  }, [])
  return (
    <WrapperLayouts isFull={true}>
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
            <WrapperLayouts>
              <motion.div
                initial='hidden'
                animate='visible'
                variants={motionFade}
                transition={{ duration: 0.5 }}
                className='z-[999] relative'
              >
                <MediaPopup type={currentComponent} />
              </motion.div>
              <ArRender params={qs} />
            </WrapperLayouts>
          </div>
        </div>
      </div>
    </WrapperLayouts>
  )
}

export default YourDream
