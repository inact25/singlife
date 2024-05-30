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
  const responsive = useResponsive()
  const { breakpoint } = responsive
  const [isSplash, setIsSplash] = useState(true)
  const classList = {
    sm: {
      image: 'w-full z',
      footer: 'relative inset-x-0 bottom-0',
    },
    md: {
      image: 'w-full',
      footer: '',
    },
    lg: {
      image: 'w-full',
      footer: '',
    },
    xl: {
      image: 'w-full',
      footer: '',
    },
    xs: {
      image: 'w-full absolute',
      footer: 'relative inset-x-0 bottom-0',
    },
  }
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
          <img src={background} className='w-[100dvw] h-[80dvh]'/>
            <WrapperLayouts className={classList[breakpoint ?? 'sm'].footer}>
              <div className='footer'>
                <div className='action flex flex-col gap-y-[8px]'>
                  <div>
                    <Button
                      onClick={handleGetStarted}
                      title='Get started'
                      type='primary'
                    />
                  </div>
                  {/*<div className='mb-3'>*/}
                  {/*  <Button*/}
                  {/*    onClick={() => console.log('')}*/}
                  {/*    title={*/}
                  {/*      <span className='flex items-center gap-2 justify-center'>*/}
                  {/*        <span className='text-[18px]'>*/}
                  {/*          <RiChatSmile3Fill />*/}
                  {/*        </span>{' '}*/}
                  {/*        Talk to a Financial Advisor*/}
                  {/*      </span>*/}
                  {/*    }*/}
                  {/*    type='secondary'*/}
                  {/*  />*/}
                  {/*</div>*/}
                  {/*<div className='divider my-2 grid items-center grid-cols-10'>*/}
                  {/*  <span className={'col-span-4'}>*/}
                  {/*    <hr />*/}
                  {/*  </span>*/}
                  {/*  <span*/}
                  {/*    className={*/}
                  {/*      'font-semibold text-black text-[14px] col-span-2'*/}
                  {/*    }*/}
                  {/*  >*/}
                  {/*    Or*/}
                  {/*  </span>*/}
                  {/*  <span className={'col-span-4'}>*/}
                  {/*    <hr />*/}
                  {/*  </span>*/}
                  {/*</div>*/}
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
            </WrapperLayouts>
          {/* </div> */}
        </WrapperLayouts>
      )}
    </div>
  )
}

export default Introduction
