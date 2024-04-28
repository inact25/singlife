import useBreakpoint from 'use-breakpoint'

const BREAKPOINTS = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
}
//cover Iphone SE
const useResponsive = () => {
  const { breakpoint } = useBreakpoint(BREAKPOINTS)
  return {
    breakpoint,
  }
}

export default useResponsive
