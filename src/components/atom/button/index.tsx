type Props = {
  title: any
  type?: 'primary' | 'secondary' | 'info' | 'warning' | 'default'
  onClick?: () => void
}
const Index = ({ title, type = 'primary', onClick }: Props) => {
  const btnMap = {
    primary: 'bg-singlife-red-800 text-white',
    secondary:
      'bg-transparent border border-singlife-red-800 text-singlife-red-800',
    info: 'bg-singlife-turqoise-800',
    default: 'bg-singlife-purple-800 text-white font-bold',
    warning: 'bg-singlife-orange-800',
  }
  return (
    <button
      onClick={onClick}
      className={`w-full px-5 py-4 text5[12px] text-[12px] font-bold  rounded-full ${btnMap[type]}`}
    >
      {title}
    </button>
  )
}

export default Index
