// @ts-nocheck
import useAframe from '@hooks/useAframe.ts'
import { useEffect } from 'react'
import AFrameScene from '@components/libs/AFrameScene'

const ArRender = () => {
  const aframe = useAframe()
  useEffect(() => {
    aframe.register('colorize', {
      schema: {
        color: { default: 'red' },
      },
      init: function () {
        console.log('init a')
        const data = this.data
        const el = this.el // <a-box>
        el.addEventListener('click', function () {
          el.setAttribute('color', data.color)
        })
      },
    })
  }, [])
  return (
    <AFrameScene>
      <a-box
        position='-1 0.5 -3'
        rotation='0 45 0'
        color='#4CC3D9'
        colorize
      ></a-box>
      <a-sphere position='0 1.25 -5' radius='1.25' color='#EF2D5E'></a-sphere>
      <a-cylinder
        position='1 0.75 -3'
        height='1.5'
        color='#FFC65D'
      ></a-cylinder>
      <a-plane
        position='0 0 -4'
        rotation='-90 0 0'
        width='4'
        height='4'
        color='#7BC8A4'
      ></a-plane>
      <a-sky color='#ECECEC'></a-sky>
    </AFrameScene>
  )
}

export default ArRender
