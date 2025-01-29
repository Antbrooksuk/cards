import React, { useEffect, useState } from 'react'
import { App } from '@capacitor/app'

const SafeArea = ({ children }) => {
  const [insets, setInsets] = useState({ top: 0, bottom: 0 })

  useEffect(() => {
    const setupSafeArea = async () => {
      try {
        // Get initial safe area
        const { statusBarHeight } = await App.getInfo()
        setInsets(prev => ({ ...prev, top: statusBarHeight || 0 }))

        // Listen for changes in safe area
        App.addListener('backButton', () => {
          // This is just to ensure the app plugin is active
          // We'll handle actual back button behavior elsewhere
        })
      } catch (error) {
        console.warn('Safe area setup failed:', error)
      }
    }

    setupSafeArea()

    return () => {
      App.removeAllListeners()
    }
  }, [])

  return (
    <div
      className='min-h-screen flex flex-col'
      style={{
        paddingTop: `${insets.top}px`,
        paddingBottom: `${insets.bottom}px`,
      }}
    >
      {children}
    </div>
  )
}

export default SafeArea
