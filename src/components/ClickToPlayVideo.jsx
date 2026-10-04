import { useEffect, useRef, useState } from 'react'
import { Play } from 'lucide-react'

export default function ClickToPlayVideo({ video, language }) {
  const containerRef = useRef(null)
  const playerRef = useRef(null)
  const [nearViewport, setNearViewport] = useState(false)
  const [started, setStarted] = useState(false)
  const [failed, setFailed] = useState(false)
  const spanish = language === 'es'

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      setNearViewport(true)
      return
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setNearViewport(true)
        observer.disconnect()
      }
    }, { rootMargin: '150px' })
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const player = playerRef.current
    return () => {
      player.pause()
      player.removeAttribute('src')
      player.load()
    }
  }, [])

  function play() {
    const player = playerRef.current
    setFailed(false)
    setStarted(true)
    // Attach the URL only inside this user gesture. Even preload="none" alone
    // is not a guarantee that every browser will avoid requesting an MP4.
    if (!player.hasAttribute('src')) player.src = video.src
    player.load()
    const playback = player.play()
    playback?.catch(() => setFailed(true))
    player.focus()
  }

  return (
    <div ref={containerRef}>
      <div className="relative aspect-[9/16] w-full overflow-hidden rounded-xl bg-[#06121F]">
        <video
          ref={playerRef}
          width={1080}
          height={1920}
          preload="none"
          playsInline
          controls={started}
          poster={nearViewport ? video.poster : undefined}
          aria-label={video.title}
          tabIndex={started ? 0 : -1}
          onError={() => { if (started) setFailed(true) }}
          className="absolute inset-0 h-full w-full object-contain"
        />
        {!started && (
          <button
            type="button"
            onClick={play}
            aria-label={`${spanish ? 'Reproducir video' : 'Play video'}: ${video.title}`}
            className="group absolute inset-0 flex items-center justify-center bg-black/10 transition-colors hover:bg-black/20 focus-visible:outline focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-[#F2D98D]"
          >
            <span className="flex h-20 w-20 items-center justify-center rounded-full border border-[#F2D98D] bg-[#D4AF37] text-[#06121F] shadow-xl transition-transform group-hover:scale-105 motion-reduce:transform-none">
              <Play className="h-8 w-8 fill-current" aria-hidden="true" />
            </span>
          </button>
        )}
      </div>
      {failed && (
        <div role="status" className="mt-3 text-sm text-[#F2D98D]">
          <p>{spanish ? 'No se pudo iniciar el video. Inténtelo de nuevo o use los controles del reproductor.' : 'The video could not start. Try again or use the player controls.'}</p>
          <button type="button" onClick={play} className="mt-2 rounded px-2 py-1 underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F2D98D]">
            {spanish ? 'Volver a intentar' : 'Try again'}
          </button>
        </div>
      )}
    </div>
  )
}