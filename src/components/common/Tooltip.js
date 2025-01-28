import React, { useState, useCallback, useEffect } from 'react'

const Tooltip = ({ children, content }) => {
  const [isVisible, setIsVisible] = useState(false)

  // Handle clicks outside tooltip to close it
  const handleClickOutside = useCallback(
    event => {
      if (isVisible && !event.target.closest('.tooltip-container')) {
        setIsVisible(false)
      }
    },
    [isVisible],
  )

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [handleClickOutside])

  const toggleTooltip = e => {
    e.stopPropagation()
    setIsVisible(!isVisible)
  }

  return (
    <div className='relative inline-block tooltip-container'>
      <div
        onClick={toggleTooltip}
        onFocus={toggleTooltip}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className='cursor-pointer'
        role='button'
        aria-expanded={isVisible}
        tabIndex={0}
      >
        {children}
      </div>

      <div
        className={`opacity-${
          isVisible ? 1 : 0
        } absolute z-50 flex flex-col top-full left-1/2 -translate-x-1/2 max-w-[10rem] text-center mt-4 px-3 py-2 bg-gray-800 text-white text-sm rounded shadow-lg whitespace-nowrap transition-opacity duration-150`}
      >
        {/* <button
            onClick={e => {
              e.stopPropagation()
              setIsVisible(false)
            }}
            className='absolute top-1 right-1 text-gray-400 hover:text-white'
            aria-label='Close tooltip'
          >
            ×
          </button> */}
        {content}
        {/* Arrow pointer */}
        <div className='absolute bottom-full left-1/2 -translate-x-1/2 border-8 border-transparent border-b-gray-800' />
      </div>
    </div>
  )
}

export default Tooltip
