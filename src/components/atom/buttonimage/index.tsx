import { useCallback } from 'react'

type Props = {
  title: string
  type?: 'primary' | 'secondary' | 'info' | 'warning' | 'default'
  onClick?: () => void
  images?: string[]
}
const Index = ({ title, type = 'primary', onClick, images }: Props) => {
  const btnMap = {
    primary: 'bg-singlife-red-800',
    secondary:
      'bg-transparent border border-singlife-red-800 text-singlife-red-800 text-singlife-red-800',
    info: 'bg-singlife-turqoise-800',
    default: 'bg-singlife-purle-800',
    warning: 'bg-singlife-orange-800',
  }
  const filterLimit = useCallback(
    (limit: number, _images: string[]) => {
      return _images?.filter((_, index) => index < limit)
    },
    [images],
  )
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center justify-between py-1   rounded-full ${btnMap[type]}`}
    >
      <div className='text-[12px] font-bold'>{title}</div>
      <div className='flex text-[12px]  w-fit pe-2'>
        {filterLimit(3, images ?? [])?.map((image, index) => (
          <img
            key={index}
            src={image}
            className='border border-2 mr-[-1.15rem] w-[40px] h-[40px] rounded-full'
            alt=''
          />
        ))}
      </div>
    </button>
  )
}

export default Index
