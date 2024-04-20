type Props = {
  title: string
  type?: 'primary' | 'secondary' | 'info' | 'warning' | 'default'
}
const Index = ({ title, type = 'primary' }: Props) => {
  const btnMap = {
    primary: 'bg-singlife-red-800',
    secondary:
      'bg-transparent border border-singlife-red-800 text-singlife-red-800 text-singlife-red-800',
    info: 'bg-singlife-turqoise-800',
    default: 'bg-singlife-purle-800',
    warning: 'bg-singlife-orange-800',
  }
  return (
    <button
      className={`flex w-full items-center justify-between py-1   rounded-full ${btnMap[type]}`}
    >
      <div className='text-[12px] font-bold'>{title}</div>
      <div className='flex text-[12px]  w-fit pe-2'>
        {[...new Array(3)].map((item) => (
          <img
            key={item}
            src='https://images.unsplash.com/photo-1682695797873-aa4cb6edd613?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            className='border border-2 mr-[-1.15rem] w-[40px] h-[40px] rounded-full'
            alt=''
          />
        ))}
      </div>
    </button>
  )
}

export default Index
