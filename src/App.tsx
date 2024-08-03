import './App.css'
import { useEffect } from 'react'
import Question from './pages/question'
import { pageTrack } from '@hooks/useAdobe.ts'

function App() {
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
    pageTrack()
  }, [])
  return (
    <div>
      <Question />
    </div>
  )
}

export default App
