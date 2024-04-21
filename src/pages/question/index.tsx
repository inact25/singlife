import WrapperLayouts from '../../layouts/wrapper/wrapper.layouts.tsx'
import Buttonicon from '@components/atom/buttonicon'
import back from '@assets/svgs/back.svg'
import question1 from '@assets/background/Question1.jpg'
import Radio from '@components/atom/radio'
import Button from '@components/atom/button'
import Slidedot from '@components/atom/slidedot'
import { useEffect, useState } from 'react' // import question2 from '@assets/background/Question2.jpg'
// import question2 from '@assets/background/Question2.jpg'
// import question3 from '@assets/background/Question3.jpg'

const Index = () => {
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    setTimeout(() => setIsActive(true), 3000)
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
            background: `url(${question1}) center center no-repeat`,
          }}
          className='image-screen w-screen min-h-screen flex items-center'
        >
          <div className='w-full'>
            <div className='content absolute bottom-0 text-start bg-white rounded-t-3xl'>
              <WrapperLayouts>
                <div className={`title mt-5`}>
                  <h2>
                    What Is <b>Financial Freedom</b> To You?
                  </h2>
                  {!isActive && (
                    <div className='w-full m-auto my-5'>
                      <Slidedot position={'center'} indexActive={0} />
                    </div>
                  )}
                </div>
                <div className={`content mt-10 ${!isActive && 'hidden'}`}>
                  <div className='flex gap-3 items-center mb-3'>
                    <Radio type={'round'} checked={true} />
                    <p className='body-1'>Buy anything I fancy</p>
                  </div>
                  <div className='flex gap-3 items-center mb-3'>
                    <Radio type={'round'} checked={true} />
                    <p className='body-1'>All the time in the world</p>
                  </div>
                  <div className='flex gap-3 items-center mb-3'>
                    <Radio type={'round'} checked={true} />
                    <p className='body-1'>Pursuing exotic adventures</p>
                  </div>
                  <div className='flex gap-3 items-center mb-3'>
                    <Radio type={'round'} checked={true} />
                    <p className='body-1'>Pursuing wellness</p>
                  </div>
                  <div className='flex gap-3 items-center mb-3'>
                    <Radio type={'round'} checked={true} />
                    <p className='body-1'>Spending time with my loved ones</p>
                  </div>
                  <div className='flex gap-3 items-center mb-3'>
                    <Radio type={'round'} checked={true} />
                    <p className='body-1'>Giving back to society</p>
                  </div>
                  <div className='grid grid-cols-12 gap-3 items-center mt-10 mb-3'>
                    <div className='col-span-4'>
                      <Slidedot indexActive={0} />
                    </div>
                    <div className='col-span-8'>
                      <Button type={'default'} title={'NEXT'} />
                    </div>
                  </div>
                </div>
              </WrapperLayouts>
            </div>
          </div>
        </div>
      </div>
    </WrapperLayouts>
  )
}

export default Index
