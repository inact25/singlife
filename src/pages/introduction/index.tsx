import WrapperLayouts from '../../layouts/wrapper/wrapper.layouts.tsx'
import background from '@assets/background/Intro.jpg'
import Button from '@components/atom/button'
import Buttonimage from '@components/atom/buttonimage'
import { useNavigate } from 'react-router-dom'
import useDream from '@services/api/dream'
import { useEffect } from 'react'
import useResponsive from '../../hooks/useResponsive.ts'
import { RiChatSmile3Fill } from 'react-icons/ri'

const Introduction = () => {
  const responsive = useResponsive()
  const { breakpoint } = responsive
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
    dream_v1.getLatestDreamDo()
  }, [dream_v1.paginate.filter])
  return (
    <div>
      <WrapperLayouts isFull={true}>
        <div className='overflow-hidden min-h-screen' style={{background:`url(${background}) top center no-repeat`, backgroundSize:'cover'}}>
          <WrapperLayouts>
            <div className='head w-full max-h-[15vh] pt-5 '>
              <div className='text-left text-black absolute'>
                <p className='body-2'>Welcome to</p>
                <p className='body-2 font-bold'>The SingLife Dream Cube</p>
                <div className="tagline mt-4">
                  <h1>Let's <br/><b>Envision</b></h1>
                </div>
              </div>
            </div>
          </WrapperLayouts>
          <WrapperLayouts className={classList[breakpoint ?? 'sm'].footer}>
            <div className='footer'>
              <div className="tagline mb-5 text-end">
                <h1>Your <b>Financial</b><br/><b>Freedom</b> Dream</h1>
              </div>
              <div className='action'>
                <div className='mb-3'>
                  <Button
                    onClick={handleGetStarted}
                    title='Get Started'
                    type='primary'
                  />
                </div>
                <div className='mb-3'>
                  <Button
                    onClick={() => console.log('')}
                    title={
                      <span className='flex items-center gap-2 justify-center'>
                        <span className='text-[18px]'>
                          <RiChatSmile3Fill />
                        </span>{' '}
                        Talk to a Financial Advisor
                      </span>
                    }
                    type='secondary'
                  />
                </div>
                <div className='divider my-2 grid items-center grid-cols-10'>
                  <span className={'col-span-4'}>
                    <hr />
                  </span>
                  <span
                    className={
                      'font-semibold text-black text-[14px] col-span-2'
                    }
                  >
                    Or
                  </span>
                  <span className={'col-span-4'}>
                    <hr />
                  </span>
                </div>
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
    </div>
  )
}

export default Introduction
