import l360 from '@assets/svgs/l360.svg'
import l3602 from '@assets/svgs/l3602.svg'
import waiting from '@assets/svgs/waiting.svg'
import walk from '@assets/svgs/walk.svg'
import tap from '@assets/svgs/tap.svg'
import {motion} from 'framer-motion'

type Props = {
    type?: '360' | 'waiting' | 'tap' | 'move'
    className?: string
    show?: boolean,
    onClick?: () => void
}
const MediaPopup = ({type = '360', className, show = true, onClick}: Props) => {
  return (
      <motion.div
          onClick={onClick}
          style={{display: show ? 'block' : 'none'}}
          initial={{scale: .75, opacity: 0}}
          animate={{scale: 1, opacity: 1}}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
          className={`rounded-2xl flex flex-wrap justify-center items-center px-5 py-10 bg-white/40 backdrop-blur-md ${className}`}
    >
          {type === 'move' && (
              <div className='w-full mb-6'>
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
                          src={walk}
                          alt='l360'
                      />
                  </div>
                  <div>
                      <p className='note text-black'>
                          Move forward <br/> to enter the portal
                      </p>
                  </div>
              </div>

          )}

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
              src={type === '360' ? l360 : type === 'waiting' ? waiting : type === 'move' ? l3602 : tap}
            alt='l360'
          />
        </div>
        <div>
          <p className='note text-black'>
            {type === '360'
              ? 'Look around to explore'
              : type === 'waiting'
                ? 'Loading your dream world'
                    : type === "move" ? 'Look around to explore' : 'Tap the floor to start'}
          </p>
        </div>
      </div>
      </motion.div>
  )
}

export default MediaPopup