import {ReactNode} from 'react'
import QrCodeCreator from "@components/molecules/QrCodeCreator";
import useResponsive from "@hooks/useResponsive.ts";
import mainImg from "@assets/svgs/main.svg"
import Button from "@components/atom/button";
import {RiChatSmile2Fill} from "react-icons/ri";

type Props = {
  children: ReactNode
  isFull?: boolean
  className?: string
  background?: string
  allDevice?: boolean
}
const WrapperLayouts = ({
  children,
  isFull = false,
  className,
                          allDevice,
}: Props) => {
  const host = window.location.origin
  const responsive = useResponsive()
  if (
      responsive.breakpoint === 'xs' ||
      responsive.breakpoint === 'sm' ||
      allDevice
  ) {
  return (
    <div className={`w-full  ${!isFull && 'p-5'} ${className}`}>{children}</div>
  )
}
  return (
      <div className='flex min-h-screen justify-center items-center'>
        <div>
          <div className='min-h-[680px] min-w-[680px] flex justify-center items-center'
               style={{background: `url(${mainImg})`}}>
            <div className='ml-2 mt-[6rem]'>
              <div className='mx-auto flex justify-center'>
                <QrCodeCreator value={host}/>
              </div>
              <div className='mt-28 ml-16'>
                <Button onClick={()=>window.open('https://singlife.com/','_blank')} title={<div className='flex justify-center items-center gap-5'><RiChatSmile2Fill/>Talk to a
                  Financial Freedom</div>}/>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default WrapperLayouts
