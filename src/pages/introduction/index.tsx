import WrapperLayouts from '../../layouts/wrapper/wrapper.layouts.tsx'
import background from '@assets/svgs/introduction.svg'
import Button from '@components/atom/button'
import Buttonimage from '@components/atom/buttonimage'

const Index = () => {
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
              <img src={background} className='w-full' alt='introduction' />
            </div>
          </WrapperLayouts>
          <WrapperLayouts>
            <div className='footer  max-h-[15vh] '>
              <div className='action'>
                <div className='mb-3'>
                  <Button title={'GET STARTED'} type={'primary'} />
                </div>
                <div className='mb-3'>
                  <Buttonimage
                    title={'EXPLORE DREAM GALLERY'}
                    type={'secondary'}
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

export default Index
