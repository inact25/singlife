/* eslint-disable prettier/prettier */
// @ts-nocheck
import React, { useEffect } from 'react'
import AFrameScene from '@components/libs/AFrameScene'
import useAframe from '@hooks/useAframe.ts'

type Props = {
  params: any
  callback: (e: any) => void
}
const ArRender360: React.FC<Props> = ({ params, callback }) => {
  const aframe = useAframe()
  const [url, setUrl] = React.useState(null)
  useEffect(() => {
    if (params?.url) {
      setUrl(params.url)
    }
  }, [params])
  useEffect(() => {
    aframe.register('reality-ready', {
      init: function () {
        this.el.addEventListener('realityready', callback)
      },
    })
  }, [])
  return (
    <>
      <AFrameScene
      xrweb
        reality-ready
      >
        <a-assets>
          <img crossOrigin='anonymous' id='city' src={url} />
        </a-assets>
        <a-sky id='image-360' radius='10' src='#city'></a-sky>
        <a-camera></a-camera>
      </AFrameScene>
    </>
  )
}

export default ArRender360
