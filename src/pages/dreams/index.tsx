import back from '@assets/svgs/back.svg'
import Buttonicon from '@components/atom/buttonicon'
import Gallery from '@components/atom/gallery'
import Card from '@components/atom/card'
import useDream from '@services/api/dream'
import { useEffect } from 'react'
import { arrayEven, arrayOdd, exceptText, numberComma } from '@utils/helper.ts'
import { useNavigate } from 'react-router-dom'
import WrapperLayouts from '../../layouts/wrapper/wrapper.layouts.tsx'

const Dream = () => {
  const navigate = useNavigate()
  const dream_v1 = useDream()
  const handleBack = () => {
    navigate('/')
  }
  const handleYourDream = (id: number) => {
    navigate(`/your-dream/${id}`)
  }
  // dream_v1.paginate.handleFilter("page", 1);
  // dream_v1.paginate.handleFilter("limit", 1);
  useEffect(() => {
    dream_v1.getDreamListDo()
  }, [dream_v1.paginate.filter])
  return (
    <>
      <div className='min-h-screen'>
        <WrapperLayouts>
          <div className='grid grid-cols-12 justify-between pt-5'>
            <div className='col-span-4 text-left'>
              <Buttonicon icon={back} onClick={handleBack} />
            </div>
            <div className='col-span-8'>
              <h2 className='text-right text-black'>
                Discover <br /> what others are dreaming about
              </h2>
            </div>
          </div>
        </WrapperLayouts>
        <div className='my-5 overflow-y-auto max-h-[78vh] p-2 pb-16'>
          <div className='grid items-start grid-cols-2 gap-4'>
            <div className='grid gap-4'>
              <Card
                title={'Dreams generated'}
                count={numberComma(dream_v1.data.length)}
              />
              {arrayEven(dream_v1.data).map((item) => (
                <div key={item.id}>
                  <Gallery
                    onClick={() => handleYourDream(item.id)}
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
                    onClick={() => handleYourDream(item.id)}
                    description={exceptText(item.description, 39)}
                    image={item.featured_image}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dream
