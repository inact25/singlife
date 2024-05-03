import React from 'react'
import { IoMdCheckmark } from 'react-icons/io'

type Props = {
  checked?: boolean
  onChange?: (checked: boolean) => void
  type?: 'square' | 'round'
  size?: 'large' | 'normal' | 'small'
  color?: string
}

const Radio: React.FC<Props> = ({
  size = 'large',
  checked = false,
  onChange = () => {},
  type = 'round',
  color,
}) => {
  return (
    <div
      onClick={() => onChange(!checked)}
      className={`border border-gray-300 cursor-pointer  ${
        type === 'square' ? 'rounded' : 'rounded-full'
      } ${size === 'large' ? 'w-[36px] h-[36px]' : size === 'normal' ? 'w-[28px] h-[28px]' : 'w-[24px] h-[24px]'} border ${
        checked ? `bg-${color}-200` : ''
      } text-${color}-800 flex justify-center items-center`}
    >
      {checked && <IoMdCheckmark />}
    </div>
  )
}

export default React.memo(Radio)
