import CountUp from 'react-countup'

type Props = {
  count: number
  title: string
}
const Index = ({ count, title }: Props) => {
  return (
    <div className='rounded-xl bg-white p-3'>
      <div className='font-bold text-[40px] text-black'>
        <CountUp end={count} duration={5} suffix='+' />
      </div>
      <div className='font-medium text-[14px] text-black'>{title}</div>
    </div>
  )
}

export default Index
