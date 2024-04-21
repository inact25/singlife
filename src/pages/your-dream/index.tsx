import WrapperLayouts from '../../layouts/wrapper/wrapper.layouts.tsx'
import L360 from '@components/atom/l360'
import Buttonicon from '@components/atom/buttonicon'
import back from '@assets/svgs/back.svg'
import { useEffect } from 'react'
import { bottomPopup } from '@utils/bottomPopup/bottomPopup.ts'

const Index = () => {
  useEffect(() => {
    setTimeout(() => bottomPopup(), 5000)
  }, [])
  return (
    <WrapperLayouts isFull={true}>
      <div className=''>
        <div className='absolute top-5 left-5 text-left'>
          <Buttonicon icon={back} />
        </div>
        <div
          style={{
            backgroundSize: 'cover',
            background:
              'url(https://images.unsplash.com/photo-1491884662610-dfcd28f30cfb?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D) center center no-repeat',
          }}
          className='w-screen min-h-screen flex items-center'
        >
          <div className='w-full'>
            <WrapperLayouts>
              <L360 />
            </WrapperLayouts>
          </div>
        </div>
      </div>
    </WrapperLayouts>
  )
}

export default Index