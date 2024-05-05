/* eslint-disable prettier/prettier */
import { useState } from 'react'

const useAframe = () => {
  const [registeredComponents, setRegisteredComponents] = useState(new Set())
  // @ts-ignore
  const AFRAME = window?.AFRAME || null
  const register = (name: string, component: any) => {
    if (registeredComponents.has(name)) return
    if (AFRAME) {
      AFRAME.registerComponent(name, component)
      setRegisteredComponents(new Set(registeredComponents.add(name)))
    }
  }
  return {
    AFRAME,
    register,
  }
}

export default useAframe
