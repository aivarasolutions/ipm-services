import { createContext, useContext } from 'react'

const AudioContext = createContext()

export const useAudio = () => {
  const context = useContext(AudioContext)
  if (!context) {
    return {
      isPlaying: false,
      volume: 0,
      isLoaded: false,
      playMusic: () => {},
      pauseMusic: () => {},
      toggleMusic: () => {},
      changeVolume: () => {},
      attemptAutoplay: () => {},
    }
  }
  return context
}

export const AudioProvider = ({ children }) => {
  const value = {
    isPlaying: false,
    volume: 0,
    isLoaded: false,
    playMusic: () => {},
    pauseMusic: () => {},
    toggleMusic: () => {},
    changeVolume: () => {},
    attemptAutoplay: () => {},
  }
  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
}
