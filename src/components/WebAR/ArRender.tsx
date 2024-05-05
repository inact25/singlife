// @ts-nocheck
import useAframe from '@hooks/useAframe.ts'
import React, { useEffect } from 'react'
import AFrameScene from '@components/libs/AFrameScene'

type Props = {
  params: any
}
const ArRender: React.FC<Props> = ({ params }) => {
  const aframe = useAframe()
  const [text, setText] = React.useState('')
  const handleClick = () => {
    console.log('button')
    alert('ok')
  }
  useEffect(() => {
    console.log('_params', params?.param)
    let counter = 0
    const interval = setInterval(() => {
      setText(`Counter: ${counter++}`)
    }, 1000)
    return () => clearInterval(interval)
  }, [params])
  useEffect(() => {
    aframe.register('linknew', {
      init: function () {
        console.log('loaded link')
        console.log('test', this.el)
        this.el.addEventListener('click', handleClick)
      },
    })
  }, [])
  useEffect(() => {}, [])
  return (
    <AFrameScene>
      <a-assets>
        <audio
          id='click-sound'
          src='https://cdn.aframe.io/360-image-gallery-boilerplate/audio/click.ogg'
        ></audio>

        <img
          id='city'
          src='https://cdn.aframe.io/360-image-gallery-boilerplate/img/city.jpg'
        />
        <img
          id='city-thumb'
          src='https://cdn.aframe.io/360-image-gallery-boilerplate/img/thumb-city.jpg'
        />
        <img
          id='cubes'
          src='https://cdn.aframe.io/360-image-gallery-boilerplate/img/cubes.jpg'
        />
        <img
          id='cubes-thumb'
          src='https://cdn.aframe.io/360-image-gallery-boilerplate/img/thumb-cubes.jpg'
        />
        <img
          id='sechelt'
          src='https://cdn.aframe.io/360-image-gallery-boilerplate/img/sechelt.jpg'
        />
        <img
          id='sechelt-thumb'
          src='https://cdn.aframe.io/360-image-gallery-boilerplate/img/thumb-sechelt.jpg'
        />
      </a-assets>
      <a-box
        class='cantap'
        position='0 2 -5'
        color='#6173F4'
        rotation='0 45 45'
        opacity=' 0.8'
        depth='1'
        linknew
      ></a-box>
      <a-text className='cantap' id='text' value={text}></a-text>
      <a-sky id='image-360' radius='10' src='#city'></a-sky>

      <a-entity className='link'></a-entity>

      <a-camera
        raycaster='objects: .cantap'
        id='camera'
        cursor='fuse: false; rayOrigin: mouse;'
      ></a-camera>
    </AFrameScene>
  )
}

export default ArRender
