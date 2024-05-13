import { ReactNode } from 'react'
import useResponsive from '../../hooks/useResponsive.ts'
import QrCodeCreator from '@components/molecules/QrCodeCreator'

type Props = {
  children: ReactNode
  isFull?: boolean
  className?: string
  background?: string
}
const WrapperLayouts = ({ children, isFull = false, className }: Props) => {
  const host = window.location.origin
  const responsive = useResponsive()
  if (responsive.breakpoint === 'xs' || responsive.breakpoint === 'sm') {
    return (
      <div className={`w-full  ${!isFull && 'p-5'} ${className}`}>
        {children}
      </div>
    )
  }
  return (
    <div className='text-black rounded-3xl border-2 border-black m-auto max-w-sm mt-16 min-h-[80vh] flex-col flex items-center justify-center gap-2'>
      <QrCodeCreator value={host} />
      <div className='w-full'>
        <h4 className='text-center' style={{ fontSize: '1.5rem' }}>
          Scan the QR code to view the mobile version
        </h4>
      </div>
    </div>
  )
}

export default WrapperLayouts
