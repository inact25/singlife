import Popup from '@components/molecules/popup'
import { useState } from 'react'
import Document from '@assets/svgs/document.svg'
import Button from '@components/atom/button'
import { FaFacebookF, FaLink, FaWhatsapp } from 'react-icons/fa6'

const Index = () => {
  const [open, setOpen] = useState(false)

  const Real = () => {
    return (
      <div className='w-full px-5'>
        <div className='icon'>
          <img className='m-auto' src={Document} alt='' />
        </div>
        <div className='text text-[12px] my-4'>
          Get $20 Voucher when you Sign Up
        </div>
        <div className='grid grid-cols-2 gap-5'>
          <div>
            <Button title={'No, Thanks'} type={'secondary'} />
          </div>
          <div>
            <Button title={'Sign up'} type={'primary'} />
          </div>
        </div>
      </div>
    )
  }

  const Share = () => {
    return (
      <div className='w-full px-5'>
        <div>
          <Button title={'Capture your dream'} type={'primary'} />
        </div>
        <div className='flex justify-between gap-5 my-5 items-center'>
          <div className='w-[35%]'>
            <hr />
          </div>
          <div className='text-[12px] w-[30%]'>Or share it via</div>
          <div className={'w-[35%]'}>
            <hr />
          </div>
        </div>
        <div className='my-4 flex justify-center gap-5'>
          <button className='[&>svg]:absolute  h-[56px] w-[56px] bg-blue-600 text-white text-[24px] flex justify-center items-center rounded-full'>
            <FaFacebookF />
          </button>
          <button className='[&>svg]:absolute h-[56px] w-[56px] bg-green-500 text-white text-[24px] flex justify-center items-center rounded-full'>
            <FaWhatsapp />
          </button>
          <button className='[&>svg]:absolute h-[56px] w-[56px] bg-black text-white text-[24px] flex justify-center items-center rounded-full'>
            <FaLink />
          </button>
        </div>

        <div>
          <Button title={'No, Thanks'} type={'secondary'} />
        </div>
      </div>
    )
  }

  return (
    <div>
      <Popup
        title={'Make it Real'}
        content={<Share />}
        open={open}
        onPop={() => setOpen(!open)}
      />
    </div>
  )
}

export default Index
