import Reward from '@assets/svgs/rewarded.svg'
import Camera from '@assets/svgs/camera.svg'
import Rotate from '@assets/svgs/rotate.svg'
import Button from '@components/atom/button'
import Popup from '@components/molecules/popup'
import { useState } from 'react'

const Index = () => {
  const [open, setopen] = useState(true)
  return (
    <div>
      <Popup
        title={'Get Rewarded'}
        isFloating={true}
        content={<Before />}
        onPop={() => setopen(!open)}
        open={open}
      />
    </div>
  )
}

const Before = () => {
  return (
    <div>
      <div className='caption mb-5'>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
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
      <div className='action-button flex gap-5'>
        <Button title='Enable access' type='primary' />
      </div>
    </div>
  )
}
// @ts-ignore
const Rewarded = () => {
  return (
    <div>
      <div className='icon flex justify-center mb-4'>
        <img src={Reward} alt='' />
      </div>
      <div className='caption mb-8'>
        <p className='note'>Get $20 voucher when you sign up</p>
      </div>
      <div className='action-button flex gap-5'>
        <Button title='Learn more' type='secondaryWhite' />
        <Button title='Sign up' type='primary' />
      </div>
    </div>
  )
}

// @ts-ignore
const Captured = () => {
  return (
    <div>
      <div className='caption mb-8'>
        <p className='body-1'>
          Download the image and share this withbr <br /> your friends!
        </p>
        <img
          className='my-5 mx-auto'
          style={{
            objectFit: 'cover',
            height: 278,
            width: 156,
            borderRadius: 16,
          }}
          src='https://images.unsplash.com/photo-1682695797873-aa4cb6edd613?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          alt=''
        />
      </div>
      <div className='action-button flex gap-5'>
        <Button title='Retake' type='secondaryWhite' />
        <Button title='Download' type='primary' />
      </div>
    </div>
  )
}

export default Index
