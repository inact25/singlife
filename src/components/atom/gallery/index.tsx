import Buttonicon from '@components/atom/buttonicon'
import expand from '@assets/svgs/expand.svg'
import expandWhite from '@assets/svgs/expand-white.svg'
import React from 'react'
import Highlighter from 'react-highlight-words'

type Props = {
  image: string
  description: string
  onClick?: () => void
  isActive?: boolean
}
const Index: React.FC<Props> = ({
  image,
  description,
  isActive = false,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      style={{
        background: `url(${image}) center center no-repeat`,
        backgroundSize: 'cover',
      }}
      className='min-h-[265px] w-full rounded-xl relative'
    >
      <div className='absolute right-[8px] top-[8px]'>
        <Buttonicon
          icon={isActive ? expandWhite : expand}
          isActive={isActive}
        />
      </div>
      {isActive && (
        <div className='absolute left-[8px] top-[8px] w-[60%] text-left'>
          <Highlighter
            highlightStyle={{ padding: 5 }}
            highlightClassName='bg-singlife-red-800 text-white rounded-e-lg font-light text-[12px]'
            searchWords={['Pierre Png’s', 'Dream']}
            autoEscape={true}
            textToHighlight='Pierre Png’s Dream'
          />
        </div>
      )}
      <div
        className={`font-medium backdrop-blur-md text-start text-[14px] absolute bottom-0 px-3.5 ${!isActive ? 'bg-white/70 text-black ' : 'bg-singlife-red-800 text-white'}  w-full rounded-b-xl py-5`}
      >
        {description}
      </div>
    </div>
  )
}

export default Index
