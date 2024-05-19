import { useEffect, useState } from 'react'
import Camera from '@assets/svgs/camera.svg'
import Rotate from '@assets/svgs/rotate.svg'
import Button from '@components/atom/button'
import Popup from '@components/molecules/popup'
import Question3 from '@assets/background/Question3.jpg'

const Index = () => {
  const [open, setopen] = useState(true)

  const handlePromptConfirm = () => {
    setopen(false)
    requestPermissions()
  }

  const requestPermissions = async () => {
    try {
      // Request accelerometer permission
      if (navigator.permissions) {
        const accelerometerPermission = await navigator.permissions.query({
          // @ts-ignore
          name: 'accelerometer',
        })
        if (accelerometerPermission.state === 'granted') {
          startAccelerometer()
        } else if (accelerometerPermission.state === 'prompt') {
          accelerometerPermission.onchange = () => {
            if (accelerometerPermission.state === 'granted') {
              startAccelerometer()
            }
          }
        } else {
          console.error('Accelerometer permission denied')
        }

        // Request camera permission
        const cameraPermission = await navigator.permissions.query({
          // @ts-ignore
          name: 'camera',
        })
        if (cameraPermission.state === 'granted') {
          console.log('granted')
        } else if (cameraPermission.state === 'prompt') {
          cameraPermission.onchange = () => {
            if (cameraPermission.state === 'granted') {
              console.log('granted')
            }
          }
        } else {
          console.error('Camera permission denied')
        }
      }
    } catch (error) {
      console.error('Error checking permissions:', error)
    }
  }

  const startAccelerometer = () => {
    if ('Accelerometer' in window) {
      // @ts-ignore
      const sensor = new Accelerometer()
      sensor.start()
      sensor.onreading = () => {
        console.log(`Acceleration along the X-axis: ${sensor.x}`)
        console.log(`Acceleration along the Y-axis: ${sensor.y}`)
        console.log(`Acceleration along the Z-axis: ${sensor.z}`)
      }
      sensor.onerror = (event: Event) => {
        console.error(
          (event as ErrorEvent).error.name,
          (event as ErrorEvent).error.message,
        )
      }
    } else {
      console.error('Accelerometer not supported')
    }
  }

  useEffect(() => {
    setopen(true)
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
