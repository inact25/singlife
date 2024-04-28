import WrapperLayouts from '../../layouts/wrapper/wrapper.layouts.tsx'
import background from '@assets/svgs/introduction.svg'
import Button from '@components/atom/button'
import Buttonimage from '@components/atom/buttonimage'
import { useNavigate } from 'react-router-dom'
import useDream from '@services/api/dream'
import { useEffect } from 'react'
import useResponsive from '../../hooks/useResponsive.ts'

const Introduction = () => {
  const responsive = useResponsive()
  const { breakpoint } = responsive
  console.log('breakpoint', breakpoint)
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
    dream_v1.getDreamListDo()
  }, [dream_v1.paginate.filter])
  return (
    <>
      <WrapperLayouts isFull={true}>
        <div className='overflow-hidden max-h-screen'>
          <WrapperLayouts>
            <div className='head w-full max-h-[15vh] pt-5'>
              <div className='text-left'>
                <p className='body-2'>Welcome to</p>
                <p className='body-2 font-bold'>The SingLife Dream Cube</p>
              </div>
            </div>
          </WrapperLayouts>
          <WrapperLayouts isFull={true}>
            <div className='content w-full'>
              <img
                src={background}
                className={classList[breakpoint ?? 'sm'].image}
                alt='introduction'
              />
            </div>
          </WrapperLayouts>
          <WrapperLayouts className={classList[breakpoint ?? 'sm'].footer}>
            <div className='footer  max-h-[15vh]'>
              <div className='action'>
                <div className='mb-3'>
                  <Button
                    onClick={handleGetStarted}
                    title='GET STARTED'
                    type='primary'
                  />
                </div>
                <div className='mb-3'>
                  <Buttonimage
                    title='EXPLORE DREAM GALLERY'
                    type='secondary'
                    onClick={handleExploreDreamGallery}
                    images={dream_v1.data.map((item) => item.featured_image)}
                  />
                </div>
              </div>
            </div>
          </WrapperLayouts>
        </div>
      </WrapperLayouts>
    </>
  )
}

export default Introduction
