import Buttonicon from '@components/atom/buttonicon'
import expand from '@assets/svgs/expand.svg'

type Props = {
  image: string
  description: string
}
const Index = ({ image, description }: Props) => {
  return (
    <div
      style={{
        background: `url(${image}) center center no-repeat`,
        backgroundSize: 'cover',
      }}
      className='min-h-[265px] w-full rounded-xl relative'
    >
      <div className='absolute right-2 top-2'>
        <Buttonicon icon={expand} />
      </div>
      <div className='font-medium backdrop-blur-md text-start text-[14px] absolute bottom-0 px-2 bg-white/70  w-full rounded-b-xl py-3'>
        {description}
      </div>
    </div>
  )
}

export default Index
