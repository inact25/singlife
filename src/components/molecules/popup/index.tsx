import { IoCloseOutline } from 'react-icons/io5'

type Props = {
  onPop: () => void
  open: boolean
  content: any
  title: string
  isFloating?: boolean
}

const Index = ({ onPop, open, content, title, isFloating = false }: Props) => {
  return (
    <div>
      <div className={!isFloating ? `w-full  fixed bottom-0` : `mt-[25%] px-5`}>
        <div
          onClick={() => !isFloating && onPop()}
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
