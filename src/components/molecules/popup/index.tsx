import { IoCloseOutline } from 'react-icons/io5'

type Props = {
  onPop?: () => void
  open: boolean
  content: any
  title: string
  isFloating?: boolean,
  isParentAnimate?:boolean
}

const Index = ({ onPop,isParentAnimate, open, content, title, isFloating = false }: Props) => {
  return (
    <div className='w-full'>
      <div
        className={
          !isFloating
            ? `w-full  ${!isParentAnimate && 'fixed bottom-0'} left-0 z-[99999]`
            : `mt-[25%] px-5`
        }
      >
        <div
          onClick={() => !isFloating && onPop && onPop()}
          className={`cursor-pointer rounded-t-[32px]  head bg-black w-full`}
        >
          {open && !isFloating && (
            <div className='text-white absolute right-5 top-5 text-[24px]'>
              <IoCloseOutline />
            </div>
          )}
          <h3 className='title p-4 pt-6 text-white'>{title}</h3>
        </div>
        <div
          className={`${open ? 'block' : 'hidden'} ${isFloating ? 'rounded-b-[32px] bg-white/60 ' : 'bg-white'} min-h-[238px] content text-black p-5`}
        >
          <div>{content}</div>
        </div>
      </div>
    </div>
  )
}

export default Index
