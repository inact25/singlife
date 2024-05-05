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
  // useEffect(() => {
  //   console.log('_params', params?.param)
  //   let counter = 0
  //   const interval = setInterval(() => {
  //     setText(`Counter: ${counter++}`)
  //   }, 1000)
  //   return () => clearInterval(interval)
  // }, [params])
  useEffect(() => {
    aframe.register('api', {
      init: function () {
        console.log('scene-loaded')
        const load = document.getElementById('loading')
        setTimeout(() => {
          load.style.display = 'none'
          console.log('loading dissapear')
        }, 1000)
      },
    })
  }, [])
  useEffect(() => {}, [])
  return (
    <>
      <div id='loading' className='bg-white w-full h-full z-[99] absolute'>
        <img
          id='btn-close'
          className='top-[50%] left-[50%] absolute z-[99]'
          style={{ transform: 'translate(-50%, -50%)' }}
          src='/loading-scene.png'
        />
      </div>
      <AFrameScene loading-screen='enabled: false' api='true'>
        <a-assets>
          <img
            id='city'
            src='https://static.8thwall.app/assets/skybox-4096-eyt9qsc8v8.jpg'
          />
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
