import WrapperLayouts from '../../layouts/wrapper/wrapper.layouts.tsx'
import Mediapop from '../../components/atom/mediapop'
import Buttonicon from '@components/atom/buttonicon'
import back from '@assets/svgs/back.svg'
import { useEffect } from 'react'
import { bottomPopup } from '@utils/bottomPopup/bottomPopup.ts'
import { useNavigate } from 'react-router-dom'
import Swal from "sweetalert2";

const YourDream = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const timeout = setTimeout(() => bottomPopup(), 5000)
    return () => {
      clearTimeout(timeout)
      Swal.close()
    }
  }, [])
  return (
    <WrapperLayouts isFull={true}>
      <div className=''>
        <div className='absolute top-5 left-5 text-left'>
          <Buttonicon icon={back} onClick={() => {

            navigate('/dreams')
          }} />
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
              <Mediapop type={'360'} />
            </WrapperLayouts>
          </div>
        </div>
      </div>
    </WrapperLayouts>
  )
}

export default YourDream
