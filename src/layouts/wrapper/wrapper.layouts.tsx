import { ReactNode } from 'react'
import useResponsive from '../../hooks/useResponsive.ts'

type Props = {
  children: ReactNode
  isFull?: boolean
  className?: string
  background?:string
}
const WrapperLayouts = ({ children, isFull = false, className }: Props) => {
  const responsive = useResponsive()
  if (responsive.breakpoint === 'xs' || responsive.breakpoint === 'sm') {
    return (
      <div  className={`w-full  ${!isFull && 'p-5'} ${className}`}>
        {children}
      </div>
    )
  }
  return (
    <div className='text-black rounded-3xl border-2 border-black m-auto max-w-sm mt-16 min-h-[80vh] flex items-center justify-center'>
      Qr Code
    </div>
  )
}

export default WrapperLayouts
