import React from 'react'
import 'aframe'

type Props = {
  children: React.ReactNode
}
const AFrameScene: React.FC<Props> = (props) => {
  const { children } = props
  return <a-scene {...props}>{children}</a-scene>
}

export default AFrameScene
