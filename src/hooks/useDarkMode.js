import { useState, useEffect } from 'react'

const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    () =>
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches),
  )

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode)
    localStorage.theme = isDarkMode ? 'dark' : 'light'
  }, [isDarkMode])

  const toggleDarkMode = () => setIsDarkMode(prev => !prev)

  return { isDarkMode, toggleDarkMode }
}

export default useDarkMode
