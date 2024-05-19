import logo from '@assets/svgs/logo.svg'
import logoSpin from '@assets/svgs/logo-spin.svg'
import WrapperLayouts from '../../../layouts/wrapper/wrapper.layouts.tsx'

const Index = () => {
  return (
    <WrapperLayouts isFull={true}>
      <div className='min-w-[100vw] flex min-h-screen justify-center text-re items-center bg-singlife-red-800'>
        <div>
          <p className='body-1 mb-2 text-white mt-[-2rem]'>Welcome to</p>
          <h3 className='font-bold mb-10 text-white'>
            The Singlife Dream Cube
          </h3>
          <img className='m-auto animate-spin' src={logoSpin} alt='splash' />
          <img className='m-auto' src={logo} alt='splash' />
        </div>
      </div>
    </WrapperLayouts>
  )
}

export default Index
