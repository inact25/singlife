type Props = {
  icon: any
  onClick?: () => void
}
const Index = ({ icon, onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      className='rounded-full h-[40px] flex w-[40px] bg-white'
    >
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
