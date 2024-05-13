/* eslint-disable prettier/prettier */

let globalComponent = new Set()
const useAframe = () => {
  // @ts-ignore
  const AFRAME = window?.AFRAME || null
  const register = (name: string, component: any) => {
    if (AFRAME) {
      if (globalComponent.has(name)) {
        console.warn('Component already registered')
        return
      }
      AFRAME.registerComponent(name, component)
      globalComponent.add(name)
    }
  }
  return {
    AFRAME,
    register,
  }
}

export default useAframe
