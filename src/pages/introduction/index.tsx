import WrapperLayouts from '../../layouts/wrapper/wrapper.layouts.tsx'
import background from '@assets/svgs/homepage.svg'
import Button from '@components/atom/button'
import Buttonimage from '@components/atom/buttonimage'
import { useNavigate } from 'react-router-dom'
import useDream from '@services/api/dream'
import { useEffect, useState } from 'react'
import useResponsive from '../../hooks/useResponsive.ts'
import Splash from '@components/atom/splash'

const Introduction = () => {
  const [isSplash, setIsSplash] = useState(true)
  const dream_v1 = useDream()
  const navigate = useNavigate()
  const handleGetStarted = () => {
    navigate('/questions')
  }
  const handleExploreDreamGallery = () => {
    navigate('/dreams')
  }

  useEffect(() => {
    const data = sessionStorage.getItem('splash')
    if (data) setIsSplash(false)
    setTimeout(() => {
      setIsSplash(false)
      sessionStorage.setItem('splash', 'yes')
    }, 3000)
  }, [])

  useEffect(() => {
    dream_v1.getLatestDreamDo()
  }, [dream_v1.paginate.filter])

  return (
    <div>
      {isSplash ? (
        <Splash />
      ) : (
        <WrapperLayouts isFull={true}>
          {/* <div
            className='overflow-hidden min-h-[100dvh]'
            style={{
              width: '1000dvw',
              position: 'fixed',
              backgroundImage: `url(${background})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: '100dvw',
            }}
          > */}
          <img src={background} className='w-[100dvw] custom-viewport' />
          <div className='footer px-[24px]'>
            <div className='action flex flex-col gap-y-[8px]'>
              <div>
                <Button
                  onClick={handleGetStarted}
                  title='Get started'
                  type='primary'
                />
              </div>
              <div>
                <Buttonimage
                  title={'Explore dream gallery'}
                  type='secondary'
                  onClick={handleExploreDreamGallery}
                  images={dream_v1.latestDream.map((item) => item.image)}
                />
              </div>
            </div>
          </div>
          {/* </div> */}
        </WrapperLayouts>
      )}
    </div>
  )
}

export default Introduction
