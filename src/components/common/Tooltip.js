import React, { useState } from 'react'

const Tooltip = ({ children, content }) => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className='relative inline-block'>
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>

      {isVisible && (
        <div className='absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded transition-opacity duration-150'>
          {content}
          {/* Arrow pointer */}
          <div className='absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-gray-800' />
        </div>
      )}
    </div>
  )
}

export default Tooltip
