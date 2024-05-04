import React from 'react'
import 'aframe'

type Props = {
  children: React.ReactNode
}
const AFrameScene: React.FC<Props> = ({ children }) => {
  return <a-scene>{children}</a-scene>
}

export default AFrameScene
