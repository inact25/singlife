type Props = {
  title: string
  type?: 'primary' | 'secondary' | 'info' | 'warning' | 'default'
}
const Index = ({ title, type = 'primary' }: Props) => {
  const btnMap = {
    primary: 'bg-singlife-red-800',
    secondary:
      'bg-transparent border border-singlife-red-800 text-singlife-red-800',
    info: 'bg-singlife-turqoise-800',
    default: 'bg-singlife-purle-800',
    warning: 'bg-singlife-orange-800',
  }
  return (
    <button className={`w-full px-5 py-3  rounded-full ${btnMap[type]}`}>
      {title}
    </button>
  )
}

export default Index