import Buttonicon from '@components/atom/buttonicon'
import expand from '@assets/svgs/expand.svg'
import expandWhite from '@assets/svgs/expand-white.svg'
import React from 'react'

type Props = {
  image: string
  description: string
  onClick?: () => void
  isActive?: boolean
  title?: string
}
const Index: React.FC<Props> = ({
  image,
  description,
  isActive = false,
  onClick,
  title,
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
        <div className='absolute left-[14px] top-[14px] w-[60%] text-left text-white note'>
          {title}
          {/*<Highlighter*/}
          {/*  highlightStyle={{ padding: 5 }}*/}
          {/*  highlightClassName='bg-singlife-red-800 text-white rounded-e-lg font-light text-[12px]'*/}
          {/*  searchWords={[`${title ?? ''}`]}*/}
          {/*  autoEscape={true}*/}
          {/*  textToHighlight={title ?? ''}*/}
          {/*/>*/}
        </div>
      )}
      <div
        className={`font-medium backdrop-blur-md text-start text-[14px]  p-[16px] absolute bottom-0  ${!isActive ? 'bg-white/70 text-black ' : 'bg-singlife-red-800 text-white'}  w-full rounded-b-xl `}
      >
        {description}
      </div>
    </div>
  )
}

export default Index
