import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.wordgame.app',
  appName: 'Word Game',
  webDir: 'build',
  server: {
    url: 'http://localhost:3001',
    cleartext: true,
  },
  plugins: {
    Preferences: {
      useSyncStorage: true,
    },
  },
  ios: {
    contentInset: 'automatic',
    preferredContentMode: 'mobile',
    scheme: 'wordgame',
    backgroundColor: '#ffffff',
  },
  android: {
    backgroundColor: '#ffffff',
    allowMixedContent: true,
    captureInput: true,
    webContentsDebuggingEnabled: true,
  },
}

export default config
