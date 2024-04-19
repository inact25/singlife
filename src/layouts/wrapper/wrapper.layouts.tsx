import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  isFull?: boolean
}
const WrapperLayouts = ({ children, isFull = false }: Props) => {
  return <div className={`min-w-[100vw] ${!isFull && 'p-5'}`}>{children}</div>
}

export default WrapperLayouts
