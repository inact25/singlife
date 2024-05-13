/* eslint-disable prettier/prettier */
import ArRender from '@components/WebAR/ArRender.tsx'

const Ar = () => {
  const getAllQS = () => {
    const urlParams = new URLSearchParams(window.location.search)
    return Object.fromEntries(urlParams.entries())
  }

  const qs = getAllQS()
  return <ArRender params={qs} />
}

export default Ar
