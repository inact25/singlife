import './App.css'
import { useEffect } from 'react'
import Dreams from './pages/dreams'

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
  return (
    <div>
      <Dreams />
    </div>
  )
}

export default App
