const useAdobe = () => {
  // @ts-ignore
  const dataLayer = window?.dataLayer || []
  const push = (data: any) => {
    dataLayer.push(data)
  }
  return { push }
}

export default useAdobe
