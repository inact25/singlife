type Props = {
  icon: any
}
const Index = ({ icon }: Props) => {
  return (
    <div className='rounded-full h-[40px] flex w-[40px] bg-white'>
      <img
        style={{ width: 24, height: 24 }}
        className='m-auto'
        src={icon}
        alt=''
      />
    </div>
  )
}

export default Index
