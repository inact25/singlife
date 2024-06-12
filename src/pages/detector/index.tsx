import { useEffect, useState } from 'react'
import Camera from '@assets/svgs/camera.svg'
import Rotate from '@assets/svgs/rotate.svg'
import Button from '@components/atom/button'
import Popup from '@components/molecules/popup'
import Question3 from '@assets/background/Question3.png'
import useAccelerometer from '@utils/useAccelerometer.ts'
import { bottomPopup } from '@utils/bottomPopup/bottomPopup.ts'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'

const Index = () => {
  const [open, setOpen] = useState(false)
  const accelerometer = useAccelerometer()
  console.log(accelerometer)
  const image = sessionStorage.getItem('image')
  useEffect(() => {
    setTimeout(() => setOpen(true), 200)
  }, [])

  return (
    <div>
      <div
        style={{
          backgroundSize: 'cover',
          background: `url(${image ?? Question3}) center center no-repeat`,
        }}
        className='image-screen w-screen min-h-[100dvh] flex items-center'
      >
        <div className='w-full mt-[-5rem]'>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
              }}
            >
              <Popup
                title={'Before We Begin...'}
                isFloating={true}
                content={<Before />}
                open={true}
              />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

const Before = () => {
  const params = useParams()
  const onDenied = () => {
    bottomPopup({ title: 'Permission access denied', desc: 'Okay' })
  }
  const onGranted = () => {
    if (params.purpose?.split('-')[0] === 'explore') {
      window.open(
        `/your-dream/explore-${params.purpose?.split('-')[1]}`,
        '_self',
      )
    }
    if (params.purpose?.split('-')[0] === 'question') {
      window.open(
        `/question/finish/${params.purpose?.split('-')[1]}-${params.purpose?.split('-')[2]}`,
        '_self',
      )
    }
  }

  const motionSensor = () => {
    if (navigator.userAgent.toLowerCase().includes('android')) {
      requestPermission()
    } else {
      // @ts-ignore
      DeviceMotionEvent.requestPermission()
        .then((response: any) => {
          if (response == 'granted') {
            requestPermission()
          }
        })
        .catch(() => {
          onDenied()
        })
    }
  }

  const requestPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      })

      onGranted()
      stream.getTracks().forEach((track) => track.stop())
    } catch (error) {
      if (
        // @ts-ignore
        error?.name === 'NotAllowedError' ||
        // @ts-ignore
        error?.name === 'PermissionDeniedError'
      ) {
        onDenied()
      } else {
        onDenied()
      }
    }
  }

  return (
    <div>
      <div className='caption mb-5'>
        <p className='body-1'>
          We'll need BOTH of <br /> the following permissions:
        </p>
      </div>
      <div className='caption mb-5'>
        <img className='m-auto mb-5' src={Camera} alt='' />
        <p className='note'>
          AR requires access <br /> to your camera
        </p>
      </div>
      <div className='caption mb-5'>
        <img className='m-auto mb-5' src={Rotate} alt='' />
        <p className='note'>
          AR requires access <br />
          to your device motion sensors
        </p>
      </div>
      <div className='action-button flex gap-5 z-40 relative'>
        <Button title='Enable access' onClick={motionSensor} type='primary' />
      </div>
    </div>
  )
}

export default Index
