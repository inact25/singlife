import { useState } from 'react'

const useAdobe = () => {
  // @ts-ignore
  const [layers, setLayers] = useState([])
  const getBrowserLanguage = () => {
    return navigator.language || 'en-EN'
  }
  const getCurrentCountry = () => {
    return 'SG'
  }
  const getSiteId = () => {
    return 'sg-dreamcube-stg'
  }
  const seperatedPath = (pathname: string | undefined) => {
    const path = pathname ?? window.location.pathname
    return path.split('/')
  }
  const push = (
    { type = 'page', navLevel1 = '', navLevel2 = '', navLevel3 = '' },
    pathname: string | undefined,
  ) => {
    let dataLayer: any = layers ?? []
    if (navLevel1 === '' && navLevel2 === '' && navLevel3 === '') {
      const path = seperatedPath(pathname)
      if (path.length > 1) {
        navLevel1 = path[1] ?? ''
      }
      if (path.length > 2) {
        navLevel2 = path[2] ?? ''
      }
      if (path.length > 3) {
        navLevel3 = path[3] ?? ''
      }
    }
    dataLayer.push({
      siteId: getSiteId(),
      language: getBrowserLanguage(),
      country: getCurrentCountry(),
      versionNum: '1.0.0',
      type,
      navLevel1,
      navLevel2,
      navLevel3,
    })
    setLayers(dataLayer)
  }
  const apply = () => {
    // @ts-ignore
    if (window?._satellite) {
      //parse data layer
      // @ts-ignore
      window.dataLayer = layers
      // @ts-ignore
      window?._satellite.track('track_page_load')
      //clean up
      setLayers([])
      return true
    }
    return false
  }
  return { push, apply }
}

export default useAdobe
