import l360 from '@assets/svgs/l360.svg'
import waiting from '@assets/svgs/waiting.svg'
import tap from '@assets/svgs/tap.svg'
import {motion} from 'framer-motion'

type Props = {
  type?: '360' | 'waiting' | 'tap'
  className?: string
}
const MediaPopup = ({ type = '360', className }: Props) => {
  return (

      <motion.div
          initial={{scale: .75, opacity: 0}}
          animate={{scale: 1, opacity: 1}}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
      className={`rounded-2xl flex justify-center items-center px-5 py-10 bg-white/40 backdrop-blur-md ${className}`}
    >
      <div className='w-full'>
        <div className='mb-5'>
          <motion.img
              animate={{
                scale: [.95, 1, .95]
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
              }}
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
      </motion.div>
  )
}

export default MediaPopup
