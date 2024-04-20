import WrapperLayouts from '../../layouts/wrapper/wrapper.layouts.tsx'
import back from '@assets/svgs/back.svg'
import Buttonicon from '@components/atom/buttonicon'
import Gallery from '@components/atom/gallery'
import Card from '@components/atom/card'
import useDream from '@services/api/dream'
import { useEffect } from 'react'
import { arrayEven, arrayOdd, exceptText, numberComma } from '@utils/helper.ts'

const Index = () => {
  const dream_v1 = useDream()
  // dream_v1.paginate.handleFilter("page", 1);
  // dream_v1.paginate.handleFilter("limit", 1);
  useEffect(() => {
    dream_v1.getDreamListDo()
  }, [dream_v1.paginate.filter])
  return (
    <WrapperLayouts>
      <div className='min-h-screen'>
        <div className='grid grid-cols-12 justify-between pt-5'>
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
          <div className='grid items-start grid-cols-2 gap-4'>
            <div className='grid gap-4'>
              <Card
                title={'Dreams generated'}
                count={numberComma(dream_v1.data.length)}
              />
              {arrayEven(dream_v1.data).map((item) => (
                <div key={item.id}>
                  <Gallery
                    description={exceptText(item.description, 39)}
                    image={item.featured_image}
                  />
                </div>
              ))}
            </div>
            <div className='grid gap-4'>
              {arrayOdd(dream_v1.data).map((item) => (
                <div key={item.id}>
                  <Gallery
                    description={exceptText(item.description, 39)}
                    image={item.featured_image}
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
