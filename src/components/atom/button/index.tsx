type Props = {
  title: any
  type?: 'primary' | 'secondary' | 'info' | 'warning' | 'default'
  onClick?: () => void
  color?: string
  disabled?: boolean
}
const Index = ({title, type = 'primary', onClick, color, disabled}: Props) => {
  const btnMap = {
    primary: 'bg-singlife-red-800 text-white',
    secondary:
      'bg-[#FFE9EC] border border-singlife-red-800 text-singlife-red-800',
    info: 'bg-singlife-turqoise-800',
    default: 'bg-singlife-purple-800 text-white font-bold',
    warning: 'bg-singlife-orange-800',
  }

  const styleMap = {
    primary: '0 4px 16px 0 rgba(255, 0, 0, 0.5)',
    secondary: '',
    info: 'rgb(25 211 197 / 50%) 0px 4px 16px 0px',
    default: 'rgb(136 62 137 / 50%) 0px 4px 16px 0px',
    warning: 'rgb(255 161 104 / 50%) 0px 4px 16px 0px',
  }
  if (color) {
    btnMap.default = `bg-${color}-800 text-white font-bold`
    styleMap.default = `0 4px 16px 0 rgba(156, 163, 175, 0.5)`
  }
  return (
    <button
        disabled={disabled}
      onClick={onClick}
      style={{ boxShadow: styleMap[type] }}
      className={`w-full px-5 py-3.5  text-[16px] font-semibold  rounded-full ${btnMap[type]}`}
    >
      {title}
    </button>
  )
}

export default Index
