import { useState } from 'react'

const getBrowserLanguage = (): string => {
  return navigator.language || 'en-sg'
}

const getCurrentCountry = (): string => {
  return 'sg'
}

const getSiteId = (): string => {
  return 'sg-dreamcube'
}

const seperatedPath = (): string[] => {
  const path = window.location.pathname
  return path.split('/')
}

interface FormData {
  option: string
  name: string
  step: string
}

interface DataLayer {
  siteId: string
  language: string
  country: string
  versionNum: string
  brand: string
  type: string
  navLevel1?: string
  navLevel2?: string
  navLevel3?: string
  form?: FormData
}

declare global {
  interface Window {
    _satellite?: any
    dataLayer?: DataLayer[]
  }
}

const useAdobe = () => {
  const [layers, setLayers] = useState<DataLayer[]>([])

  const push = ({
    type = 'mobile',
    navLevel1 = '',
    navLevel2 = '',
    navLevel3 = '',
  }: Partial<DataLayer>) => {
    let dataLayer: DataLayer[] = layers ?? []
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
      brand: 'singlife',
      type,
      navLevel1,
      navLevel2,
      navLevel3,
    })
    setLayers(dataLayer)
  }

  const pushForm = (name: string, step: string, option: string) => {
    if (window?._satellite) {
      const payload: DataLayer = {
        siteId: getSiteId(),
        language: getBrowserLanguage(),
        country: getCurrentCountry(),
        versionNum: '1.0.0',
        brand: 'singlife',
        type: 'mobile',
        form: {
          option,
          name,
          step,
        },
      }

      console.log(`form-name: ${name}`)
      console.log(`form-step: ${step}`)
      console.log(`form-option: ${option}`)

      window._satellite.track('track_form_view', payload)
      window._satellite.track('track_form_submit', payload)
    }
  }

  const startForm = () => {
    window?._satellite.track('track_form_start', {
      siteId: getSiteId(),
      language: getBrowserLanguage(),
      country: getCurrentCountry(),
      versionNum: '1.0.0',
      brand: 'singlife',
      type: 'mobile',
      form: {
        name: '',
        step: '',
        option: '',
      },
    })
  }

  const completeForm = (trackedOptions: string[]) => {
    if (window?._satellite) {
      const pickOne = window.dataLayer?.[0]
      if (pickOne && pickOne.form) {
        pickOne.form.option = trackedOptions.join('|')

        window.dataLayer = [pickOne]
        console.log(`form-name: ${pickOne.form.name}`)
        console.log(`form-step: ${pickOne.form.step}`)
        console.log(`form-option: ${pickOne.form.option}`)

        window._satellite.track('track_form_complete', pickOne)
      }
    }
  }

  const apply = () => {
    if (window?._satellite) {
      window.dataLayer = layers
      console.log('Data layer applied:', layers)
      window._satellite.track('track_page_load', layers)
      setLayers([])
      return true
    }
    return false
  }

  return { push, apply, pushForm, startForm, completeForm }
}

export const ctaAction = (type: string, text: string) => {
  if (window?._satellite) {
    console.log(`cta-type: ${type}`)
    console.log(`cta-text: ${text}`)

    window._satellite.track('track_cta_click', {
      siteId: getSiteId(),
      language: getBrowserLanguage(),
      country: getCurrentCountry(),
      versionNum: '1.0.0',
      brand: 'singlife',
      type: 'mobile',
      cta: {
        type,
        text,
      },
    })
  }
}

export default useAdobe
