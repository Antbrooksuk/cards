import { useEffect, useRef } from 'react'

const useTimeout = (callback, delay) => {
  const timeoutRef = useRef(null)

  useEffect(() => {
    if (delay === null) return

    timeoutRef.current = setTimeout(callback, delay)

    return () => clearTimeout(timeoutRef.current)
  }, [callback, delay])

  return () => clearTimeout(timeoutRef.current)
}

export default useTimeout
