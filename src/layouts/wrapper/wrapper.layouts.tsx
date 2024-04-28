import { ReactNode } from 'react'
import useResponsive from '../../hooks/useResponsive.ts'

type Props = {
  children: ReactNode
  isFull?: boolean
  className?: string
}
const WrapperLayouts = ({ children, isFull = false, className }: Props) => {
  const responsive = useResponsive()
  if (responsive.breakpoint === 'xs') {
    return (
      <div className={`w-full  ${!isFull && 'p-5'} ${className}`}>
        {children}
      </div>
    )
  }
  return (
    <div className={`max-w-md  ${!isFull && 'p-5'}  ${className}`}>
      {children}
    </div>
  )
}

export default WrapperLayouts
