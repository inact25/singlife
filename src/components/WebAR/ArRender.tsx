/* eslint-disable prettier/prettier */
// @ts-nocheck
import useAframe from '@hooks/useAframe.ts'
import React, { useEffect } from 'react'
import AFrameScene from '@components/libs/AFrameScene'

type Props = {
  params: any
}
const ArRender: React.FC<Props> = ({ params }) => {
  const aframe = useAframe()
  const [url, setUrl] = React.useState(null)
  useEffect(() => {
    console.log('params', params?.url)
    if (params?.url) {
      setUrl(params.url)
    }
  }, [params])
  useEffect(() => {
    //reality ready
    aframe.register('reality-ready', {
      init: function () {
        const el = this.el
        el.addEventListener('loaded', function () {
          console.log('loaded')
        })
      },
    })
  }, [])
  if (!url) {
    return <div>Loading...</div>
  }
  return (
    <>
      <AFrameScene reality-ready>
        <a-assets>
          <img id='city' src={url} />
        </a-assets>
        <a-box
          id='box'
          class='cantap'
          position='0 2 -5'
          color='#6173F4'
          rotation='0 45 45'
          opacity=' 0.8'
          depth='1'
          linknew
        ></a-box>

        <a-sky id='image-360' radius='10' src='#city'></a-sky>

        <a-camera
          raycaster='objects: .cantap'
          id='camera'
          cursor='fuse: false; rayOrigin: mouse;'
        ></a-camera>
      </AFrameScene>
    </>
  )
}

export default ArRender
