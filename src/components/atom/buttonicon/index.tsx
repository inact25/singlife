type Props = {
  icon: any
  onClick?: () => void
  isActive?: boolean
}
const Index = ({ icon, onClick, isActive = false }: Props) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-full  h-[40px] flex w-[40px] ${isActive ? 'bg-singlife-red-800' : 'bg-white '}`}
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
