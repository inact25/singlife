import './App.css'
import { useEffect } from 'react'
import Question from './pages/question'
import useAdobe from '@hooks/useAdobe.ts'

function App() {
  const adobe_v1 = useAdobe()
  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])
  //listen route change
  useEffect(() => {
    adobe_v1.push({
      type: 'mobile',
    })
    adobe_v1.apply()
  }, [])
  return (
    <div>
      <Question />
    </div>
  )
}

export default App
