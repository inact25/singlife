/* eslint-disable prettier/prettier */
import ArRender from '@components/WebAR/ArRender.tsx'

const Ar = () => {
  const getAllQS = () => {
    const urlParams = new URLSearchParams(window.location.search)
    const allQS = Object.fromEntries(urlParams.entries())
    return allQS
  }

  const qs = getAllQS()
  return <ArRender params={qs} />
}

export default Ar
