const seperatedPath = () => {
  const path = window.location.pathname
  return path.split('/')
}
export const pageTrack = () => {
  const path = seperatedPath()
  let navLevel1 = ''
  let navLevel2 = ''
  let navLevel3 = ''
  if (path.length > 1) {
    navLevel1 = path[1] ?? ''
  }
  if (path.length > 2) {
    navLevel2 = path[2] ?? ''
  }
  if (path.length > 3) {
    navLevel3 = path[3] ?? ''
  }
  // @ts-ignore
  digitalData.page.navLevel1 = navLevel1
  // @ts-ignore
  digitalData.page.navLevel2 = navLevel2
  // @ts-ignore
  digitalData.page.navLevel3 = navLevel3
  // @ts-ignore
  if (window?._satellite) {
    // @ts-ignore
    window?._satellite.track('track_page_load')
  }
}
export const ctaAction = (type: string, text: string) => {
  // @ts-ignore
  if (window?._satellite) {
    //track_cta_click
    // @ts-ignore
    digitalData.cta.type = type
    // @ts-ignore
    digitalData.cta.text = text
    // @ts-ignore
    window?._satellite.track('track_cta_click')
  }
}

export const formFill = (name: string, step: string, option: string) => {
  // @ts-ignore
  digitalData.form.name = name
  // @ts-ignore
  digitalData.form.option = option
  // @ts-ignore
  digitalData.form.step = step
}

export const formOptions = (option: string) => {
  // @ts-ignore
  digitalData.form.option = option
}

export const formViewTrigger = () => {
  // @ts-ignore
  if (window?._satellite) {
    // @ts-ignore
    window?._satellite.track('track_form_view')
  }
}

export const formSubmitTrigger = () => {
  // @ts-ignore
  if (window?._satellite) {
    // @ts-ignore
    window?._satellite.track('track_form_submit')
  }
}

export const formCompleteTrigger = () => {
  // @ts-ignore
  if (window?._satellite) {
    // @ts-ignore
    window?._satellite.track('track_form_complete')
  }
}
