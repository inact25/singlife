import { useEffect, useState } from 'react'
import Camera from '@assets/svgs/camera.svg'
import Rotate from '@assets/svgs/rotate.svg'
import Button from '@components/atom/button'
import Popup from '@components/molecules/popup'
import Question3 from '@assets/background/Question3.jpg'
import useAccelerometer from '@utils/useAccelerometer.ts'
import { bottomPopup } from '@utils/bottomPopup/bottomPopup.ts'
import { useNavigate, useParams } from 'react-router-dom'

const Index = () => {
  const [open, setOpen] = useState(false)
  const motion = useAccelerometer()
  console.log(motion)
  useEffect(() => {
    setTimeout(() => setOpen(true), 2000)
  }, [])

  return (
    <div>
      <div
        style={{
          backgroundSize: 'cover',
          background: `url(${Question3}) center center no-repeat`,
        }}
        className='image-screen w-screen min-h-screen flex items-center'
      >
        <div className='w-full mt-[-5rem]'>
          {open && (
            <Popup
              title={'Get Rewarded'}
              isFloating={true}
              content={<Before />}
              open={true}
            />
          )}
        </div>
      </div>
    </div>
  )
}

const Before = () => {
  const params = useParams()
  const navigate = useNavigate()
  const onDenied = () => {
    bottomPopup({ title: 'Permission Access Denied', desc: 'Okey' })
  }
  const onGranted = () => {
    if (params.purpose?.split('-')[0] === 'explore') {
      navigate(`/your-dream/${params.purpose?.split('-')[1]}`)
    }
    if (params.purpose?.split('-')[0] === 'question') {
      navigate({
        pathname: `/question/finish/${params.purpose?.split('-')[1]}-${params.purpose?.split('-')[2]}`,
      })
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
        <p className='body-1'>{`We'll`} need some permissions</p>
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
