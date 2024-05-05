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
      schema: {
        on: { type: 'string', default: 'click' },
        href: { type: 'string' },
      },
      init: function () {
        console.log('loaded link')
        const data = this.data
        const el = this.el
        el.addEventListener(data.on, function () {
          if (data.href) {
            window.location.href = data.href
          }
        })
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
      <a-text value={text}></a-text>
      <a-sky id='image-360' radius='10' src='#city' linknew></a-sky>

      <a-entity className='link'></a-entity>

      <a-camera>
        <a-cursor
          id='cursor'
          animation__click='property: scale; from: 0.1 0.1 0.1; to: 1 1 1; easing: easeInCubic; dur: 150; startEvents: click'
          animation__clickreset='property: scale; to: 0.1 0.1 0.1; dur: 1; startEvents: animationcomplete__click'
          animation__fusing='property: scale; from: 1 1 1; to: 0.1 0.1 0.1; easing: easeInCubic; dur: 150; startEvents: fusing'
        ></a-cursor>
      </a-camera>
    </AFrameScene>
  )
}

export default ArRender
