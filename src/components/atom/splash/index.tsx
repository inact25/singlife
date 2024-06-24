import logo from '@assets/svgs/logo.svg'
import logoSpin from '@assets/svgs/logo-spin.svg'
import bgtiles from '@assets/background/bgtiles.jpg'
import WrapperLayouts from '../../../layouts/wrapper/wrapper.layouts.tsx'

const Index = () => {
  return (
    <WrapperLayouts isFull={true}>
        <div style={{background:`url(${bgtiles})`}} className='min-w-[100vw] flex min-h-[100dvh] justify-center text-red items-center'>
        <div>
          <p className='body-1 mb-2 text-white mt-[-2rem]'>Welcome to</p>
          <h3 className='font-bold mb-10 text-white'>
            The Singlife Dream Cube
          </h3>
          <img className='m-auto spinner' src={logoSpin} alt='splash' />
          <img className='m-auto pt-[12px]' src={logo} alt='splash' />
        </div>
      </div>
    </WrapperLayouts>
  )
}

export default Index
