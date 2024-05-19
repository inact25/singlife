import { useEffect, useState } from 'react'
import Camera from '@assets/svgs/camera.svg'
import Rotate from '@assets/svgs/rotate.svg'
import Button from '@components/atom/button'
import Popup from '@components/molecules/popup'
import Question3 from '@assets/background/Question3.jpg'

const Index = () => {
  const [open, setopen] = useState(true)

  useEffect(() => {
    if (navigator.mediaDevices.getUserMedia !== null) {
      var options = {
        video: true,
        accelerometer: true,
      }
      navigator.mediaDevices.getUserMedia(options)
    }
  })

  return (
    <div>
      <div
        style={{
          backgroundSize: 'cover',
          background: `url(${Question3}) center center no-repeat`,
        }}
        className='image-screen w-screen min-h-screen flex items-center'
      >
        <div className='w-full'>
          <Popup
            title={'Get Rewarded'}
            isFloating={true}
            content={<Before />}
            onPop={() => handlePromptConfirm}
            open={open}
          />
        </div>
      </div>
    </div>
  )
}

const Before = () => {
  return (
    <div>
      <div className='caption mb-5'>
        <p className='body-1'>We'll need some permissions</p>
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
        <Button title='Enable access' type='primary' />
      </div>
    </div>
  )
}

export default Index
