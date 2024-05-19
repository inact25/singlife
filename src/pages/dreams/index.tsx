import back from '@assets/svgs/back.svg'
import Buttonicon from '@components/atom/buttonicon'
import Gallery from '@components/atom/gallery'
import Card from '@components/atom/card'
import useDream from '@services/api/dream'
import { useEffect, useRef } from 'react'
import { arrayEven, arrayOdd, exceptText } from '@utils/helper.ts'
import { useNavigate } from 'react-router-dom'
import { useScroll, useScrolling, useWindowSize } from 'react-use'
import WrapperLayouts from '../../layouts/wrapper/wrapper.layouts.tsx'
import placeholder from '@assets/anim/imageplaceholder.gif'

const Dream = () => {
  const scrollRef = useRef(null)
  const { y } = useScroll(scrollRef)
  const scrolling = useScrolling(scrollRef)
  const { height } = useWindowSize()
  const navigate = useNavigate()
  const dream_v1 = useDream()
  const handleBack = () => {
    navigate('/')
  }
  const handleYourDream = (id: number) => {
    navigate(`/tracking/explore-${id}`)
  }

  useEffect(() => {
    dream_v1.getDreamListV2Do()
  }, [dream_v1.paginate.filter])

  useEffect(() => {
    dream_v1.getInfluencerDream()
  }, [])

  useEffect(() => {
    const data = dream_v1.paginate.pagination
    if (y >= height * (data.pageSize / 10) && !scrolling) {
      console.log(data.total, data.current)
      if (data.total > data.current) {
        dream_v1.paginate.handleFilter(
          'rows',
          10 * (data.current + data.pageSize / 10),
        )
      }
    }
  }, [y, height, scrolling])

  return (
    <>
      <WrapperLayouts isFull={true}>
        <div className='min-h-screen'>
          <div
            className='my-5 overflow-y-auto max-h-[95vh] p-2 pb-16'
            ref={scrollRef}
          >
            <div className='grid grid-cols-12 justify-between pt-5'>
              <div className='col-span-4 text-left'>
                <div className='top-5 rounded-full left-5 absolute z-50 shadow-md'>
                <Buttonicon icon={back} onClick={handleBack} />
                </div>
              </div>
              <div className='col-span-8'>
                <h2 className='text-right text-black'>
                  Discover <br /> what others are dreaming about
                </h2>
              </div>
            </div>
            <div className='grid items-start grid-cols-2 gap-4 mt-10'>
              <div className='grid gap-4'>
                <Card title={'Dreams generated'} count={dream_v1.totalDream} />
                {arrayEven(dream_v1.data)?.map((item) => (
                  <div key={item.id}>
                    <Gallery
                      onClick={() => handleYourDream(item.id)}
                      description={exceptText(item.description, 39)}
                      image={item.thumbnail || placeholder}
                    />
                  </div>
                ))}
              </div>
              <div className='grid gap-4'>
                {dream_v1.singleData?.title && (
                  <div key='influencer'>
                    <Gallery
                      isActive
                      title={dream_v1.singleData?.title}
                      onClick={() =>
                        handleYourDream(
                          parseInt(dream_v1.singleData?.id ?? '0'),
                        )
                      }
                      description={exceptText(
                        dream_v1.singleData?.description ?? '',
                        39,
                      )}
                      image={dream_v1.singleData?.thumbnail ?? ''}
                    />
                  </div>
                )}
                {arrayOdd(dream_v1.data)?.map((item) => (
                  <div key={item.id}>
                    <Gallery
                      onClick={() => handleYourDream(item.id)}
                      description={exceptText(item.description, 39)}
                      image={item.thumbnail}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </WrapperLayouts>
    </>
  )
}

export default Dream
