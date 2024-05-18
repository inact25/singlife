import { IoCloseOutline } from 'react-icons/io5'

type Props = {
  onPop: () => void
  open: boolean
  content: any
  title: string
}

const Index = ({ onPop, open, content, title }: Props) => {
  return (
    <div>
      <div className='w-full fixed bottom-0'>
        <div
          onClick={onPop}
          className='cursor-pointer rounded-t-[32px] head bg-black w-full'
        >
          <div className='text-white absolute right-5 top-5 text-[24px]'>
            <IoCloseOutline />
          </div>
          <h3 className='title p-4 pt-6 text-white'>{title}</h3>
        </div>
        <div
          className={`${open ? 'block' : 'hidden'} content bg-white text-black p-5`}
        >
          <div>{content}</div>
        </div>
      </div>
    </div>
  )
}

export default Index
