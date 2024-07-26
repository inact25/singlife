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
      brand: 'singlife',
      type,
      navLevel1,
      navLevel2,
      navLevel3,
    })
    setLayers(dataLayer)
  }

  const pushForm = (name: string, step: string, option: string) => {
    // @ts-ignore
    if (window?._satellite) {
      const payload = {
        siteId: getSiteId(),
        language: getBrowserLanguage(),
        country: getCurrentCountry(),
        versionNum: '1.0.0',
        type: 'mobile',
        form: {
          option,
          name,
          step,
        },
      }
      // Menambahkan console.log dengan format yang diinginkan
      console.log(`form-name: ${name}`)
      console.log(`form-step: ${step}`)
      console.log(`form-option: ${option}`)

      // @ts-ignore
      window?._satellite.track('track_form_view', payload)

      // @ts-ignore
      window?._satellite.track('track_form_submit', payload)
    }
  }

  const startForm = () => {
    // @ts-ignore
    window?._satellite.track('track_form_start', {
      siteId: getSiteId(),
      language: getBrowserLanguage(),
      country: getCurrentCountry(),
      versionNum: '1.0.0',
      type: 'mobile',
      form: {
        name: '',
        step: '',
        option: '',
      },
    })
  }

  const completeForm = (trackedOptions: string[]) => {
    // @ts-ignore
    if (window?._satellite) {
      // @ts-ignore
      const pickOne = window?.dataLayer[0]
      pickOne.form = {
        ...pickOne.form,
        option: trackedOptions.join('|'),
      }
      // @ts-ignore
      window.dataLayer = [pickOne]
      // Menambahkan console.log dengan format yang diinginkan
      console.log(`form-name: ${pickOne.form.name}`)
      console.log(`form-step: ${pickOne.form.step}`)
      console.log(`form-option: ${pickOne.form.option}`)

      // @ts-ignore
      window?._satellite.track('track_form_complete', pickOne)
    }
  }

  const apply = () => {
    // @ts-ignore
    if (window?._satellite) {
      //parse data layer
      // @ts-ignore
      window.dataLayer = layers
      // Menambahkan console.log
      console.log('Data layer applied:', layers)

      // @ts-ignore
      window?._satellite.track('track_page_load', layers)
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
    // Menambahkan console.log dengan format yang diinginkan
    console.log(`cta-type: ${type}`)
    console.log(`cta-text: ${text}`)

    // @ts-ignore
    window?._satellite.track('track_cta_click', {
      siteId: getSiteId(),
      language: getBrowserLanguage(),
      country: getCurrentCountry(),
      versionNum: '1.0.0',
      type: 'mobile',
      cta: {
        type,
        text,
      },
    })
  }
}

export default useAdobe
