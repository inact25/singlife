import l360 from '@assets/svgs/l360.svg'
import waiting from '@assets/svgs/waiting.svg'
import tap from '@assets/svgs/tap.svg'

type Props = {
  type?: '360' | 'waiting' | 'tap'
}
const Index = ({ type = '360' }: Props) => {
  return (
      <div className='rounded-2xl flex jus    tify-center items-center px-5 py-10 bg-white/40 backdrop-blur-md'>
      <div className='w-full'>
        <div className='mb-5'>
          <img
            className='m-auto'
            width={88}
            height={88}
            src={type === '360' ? l360 : type === 'waiting' ? waiting : tap}
            alt='l360'
          />
        </div>
        <div>
          <p className='note text-black'>
            {type === '360'
              ? 'Look around to explore'
              : type === 'waiting'
                ? 'Loading your dream world'
                : 'Tap the floor to start'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Index
