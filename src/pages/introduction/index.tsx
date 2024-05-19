import WrapperLayouts from '../../layouts/wrapper/wrapper.layouts.tsx'
import background from '@assets/background/Intro.jpg'
import Button from '@components/atom/button'
import Buttonimage from '@components/atom/buttonimage'
import { useNavigate } from 'react-router-dom'
import useDream from '@services/api/dream'
import { useEffect, useState } from 'react'
import useResponsive from '../../hooks/useResponsive.ts'
import Freedom from '@assets/svgs/Your Financial Freedom Dream.svg'
import Envision from '@assets/svgs/Envision.svg'
import Splash from '@components/atom/splash'

const Introduction = () => {
  const responsive = useResponsive()
  const { breakpoint } = responsive
  const [isSplash, setIsSplash] = useState(true)
  const classList = {
    sm: {
      image: 'w-full absolute',
      footer: 'fixed inset-x-0 bottom-0',
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
      footer: 'fixed inset-x-0 bottom-0',
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
    setTimeout(() => setIsSplash(false), 3000)
  }, [])

  useEffect(() => {
    dream_v1.getLatestDreamDo()
  }, [dream_v1.paginate.filter])
  return (
    <div>
      {!isSplash ? (
        <Splash />
      ) : (
        <WrapperLayouts isFull={true}>
          <div
            className='overflow-hidden min-h-screen'
            style={{
              background: `url(${background}) top center no-repeat`,
              backgroundSize: 'cover',
            }}
          >
            <WrapperLayouts>
              <div className='head w-full max-h-[15vh] pt-5 '>
                <div className='text-left text-black absolute'>
                  <div className='tagline mt-4'>
                    <div className='tagline mb-5 relative start-0'>
                      <img src={Envision} alt={'freedom'} />
                    </div>
                  </div>
                </div>
              </div>
            </WrapperLayouts>
            <WrapperLayouts className={classList[breakpoint ?? 'sm'].footer}>
              <div className='footer'>
                <div className='tagline mb-5 relative end-0 flex justify-end'>
                  <img src={Freedom} alt={'freedom'} />
                </div>
                <div className='action'>
                  <div className='mb-3'>
                    <Button
                      onClick={handleGetStarted}
                      title='Get Started'
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
                  <div className='mb-3'>
                    <Buttonimage
                      title={'Explore Dream Gallery'}
                      type='secondary'
                      onClick={handleExploreDreamGallery}
                      images={dream_v1.latestDream.map((item) => item.image)}
                    />
                  </div>
                </div>
              </div>
            </WrapperLayouts>
          </div>
        </WrapperLayouts>
      )}
    </div>
  )
}

export default Introduction
