type Props = {
  count: string
  title: string
}
const Index = ({ count, title }: Props) => {
  return (
    <div className='rounded-xl bg-white p-3'>
      <div className='font-bold text-[40px]'>{count}</div>
      <div className='font-semibold text-[14px]'>{title}</div>
    </div>
  )
}

export default Index
