import { createContext, useContext, useRef, useState, useEffect } from 'react'

const AudioContext = createContext()

export const useAudio = () => {
  const context = useContext(AudioContext)
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider')
  }
  return context
}

export const AudioProvider = ({ children }) => {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Initialize audio element
    if (!audioRef.current) {
      audioRef.current = new Audio('/background-music.wav')
      audioRef.current.loop = true
      audioRef.current.volume = volume
      
      // Audio event listeners
      audioRef.current.addEventListener('loadeddata', () => {
        setIsLoaded(true)
        // Attempt autoplay after loading
        attemptAutoplay()
      })

      audioRef.current.addEventListener('play', () => {
        setIsPlaying(true)
      })

      audioRef.current.addEventListener('pause', () => {
        setIsPlaying(false)
      })

      audioRef.current.addEventListener('ended', () => {
        setIsPlaying(false)
      })

      // Preload the audio
      audioRef.current.load()
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const attemptAutoplay = async () => {
    if (audioRef.current) {
      try {
        await audioRef.current.play()
        console.log('Background music started automatically')
      } catch (error) {
        console.log('Autoplay blocked by browser - user interaction required')
      }
    }
  }

  const playMusic = async () => {
    if (audioRef.current) {
      try {
        await audioRef.current.play()
      } catch (error) {
        console.error('Error playing audio:', error)
      }
    }
  }

  const pauseMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause()
    }
  }

  const toggleMusic = () => {
    if (isPlaying) {
      pauseMusic()
    } else {
      playMusic()
    }
  }

  const changeVolume = (newVolume) => {
    const vol = Math.max(0, Math.min(1, newVolume))
    setVolume(vol)
    if (audioRef.current) {
      audioRef.current.volume = vol
    }
  }

  const value = {
    isPlaying,
    volume,
    isLoaded,
    playMusic,
    pauseMusic,
    toggleMusic,
    changeVolume,
    attemptAutoplay
  }

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  )
}