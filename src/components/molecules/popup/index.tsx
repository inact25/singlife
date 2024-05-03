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
          className='rounded-t-[32px] head bg-black w-full pt-2'
        >
          <div className='rounded-full line border border-b-2 mt-2 m-auto w-[60px]' />
          <h3 className='title p-4 pt-6'>{title}</h3>
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
