import './App.css'
import { useEffect } from 'react'
import Question from './pages/question'
import useAdobe from '@hooks/useAdobe.ts'
import { useLocation } from 'react-use'

function App() {
  const adobe_v1 = useAdobe()
  const location = useLocation()
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
    adobe_v1.push(
      {
        type: 'page',
      },
      location.pathname,
    )
    adobe_v1.apply()
  }, [location.pathname])
  return (
    <div>
      <Question />
    </div>
  )
}

export default App
