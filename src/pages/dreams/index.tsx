import WrapperLayouts from '../../layouts/wrapper/wrapper.layouts.tsx'
import back from '@assets/svgs/back.svg'
import Buttonicon from '@components/atom/buttonicon'
import Gallery from '@components/atom/gallery'
import Card from '@components/atom/card'

const Index = () => {
  return (
    <WrapperLayouts>
      <div className='min-h-screen'>
        <div className='grid grid-cols-12 justify-between'>
          <div className='col-span-4 text-left'>
            <Buttonicon icon={back} />
          </div>
          <div className='col-span-8'>
            <h2 className='text-right'>
              Discover what others are dreaming about
            </h2>
          </div>
        </div>
        <div className='my-5'>
          <div className='grid items-start grid-cols-2 md:grid-cols-4 gap-4'>
            <div className='grid gap-4'>
              <Card title={'Dreams generated'} count={'99,999'} />
              {[...new Array(3)].map((item) => (
                <div key={item}>
                  <Gallery
                    description={'Retiring peacefully in the country side...'}
                    image={
                      'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                    }
                  />
                </div>
              ))}
            </div>
            <div className='grid gap-4'>
              {[...new Array(3)].map((item) => (
                <div key={item}>
                  <Gallery
                    description={'Retiring peacefully in the country side...'}
                    image={
                      'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </WrapperLayouts>
  )
}

export default Index
