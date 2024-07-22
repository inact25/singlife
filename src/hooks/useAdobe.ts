import { useState } from 'react'

const getBrowserLanguage = () => {
  return navigator.language || 'en-sg'
}
const getCurrentCountry = () => {
  return 'sg'
}
const getSiteId = () => {
  return 'sg-dreamcube'
}
const seperatedPath = () => {
  const path = window.location.pathname
  return path.split('/')
}
const useAdobe = () => {
  // @ts-ignore
  const [layers, setLayers] = useState([])

  const push = ({
    type = 'mobile',
    navLevel1 = '',
    navLevel2 = '',
    navLevel3 = '',
  }) => {
    let dataLayer: any = layers ?? []
    if (navLevel1 === '' && navLevel2 === '' && navLevel3 === '') {
      const path = seperatedPath()
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
  const pushForm = (name: string, step: string) => {
    // @ts-ignore
    if (window?._satellite) {
      // @ts-ignore
      window.dataLayer = [
        {
          siteId: getSiteId(),
          language: getBrowserLanguage(),
          country: getCurrentCountry(),
          versionNum: '1.0.0',
          type: 'mobile',
          form: {
            name,
            step,
          },
        },
      ]
      // @ts-ignore
      window?._satellite.track('track_form_view')
    }
  }
  const startForm = () => {
    // @ts-ignore
    window?._satellite.track('track_form_start')
  }
  const completeForm = (trackedOptions: string[]) => {
    // @ts-ignore
    if (
      // @ts-ignore
      window?._satellite &&
      // @ts-ignore
      window?.dataLayer &&
      // @ts-ignore
      window?.dataLayer.length > 0
    ) {
      // @ts-ignore
      const pickOne = window?.dataLayer[0]
      pickOne.form = {
        ...pickOne.form,
        option: trackedOptions.join('|'),
      }
      // @ts-ignore
      window.dataLayer = [pickOne]
      // @ts-ignore
      console.log('submit', window.dataLayer)
      // @ts-ignore
      window?._satellite.track('track_form_complete')
    }
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
  return { push, apply, pushForm, startForm, completeForm }
}
export const ctaAction = (type: string, text: string) => {
  // @ts-ignore
  if (window?._satellite) {
    // @ts-ignore
    window.dataLayer = [
      {
        siteId: getSiteId(),
        language: getBrowserLanguage(),
        country: getCurrentCountry(),
        versionNum: '1.0.0',
        type: 'mobile',
        cta: {
          type,
          text,
        },
      },
    ]
    //track_cta_click
    // @ts-ignore
    window?._satellite.track('track_cta_click')
  }
}
export default useAdobe
