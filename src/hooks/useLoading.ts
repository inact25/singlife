import { useState } from 'react'

const useLoading = () => {
  const [loading, setLoading] = useState(false)
  const on = () => setLoading(true)
  const off = () => setLoading(false)
  return { loading, on, off }
}

export default useLoading
