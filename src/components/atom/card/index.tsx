type Props = {
  count: string
  title: string
}
const Index = ({ count, title }: Props) => {
  return (
    <div className='rounded-xl bg-white p-3'>
      <div className='font-bold text-[40px] text-black'>{count}</div>
      <div className='font-medium text-[14px] text-black'>{title}</div>
    </div>
  )
}

export default Index
