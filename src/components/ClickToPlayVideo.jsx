import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Play } from 'lucide-react'
import VideoShareButton from './VideoShareButton'
import { getVideoAnchor, getVideoShareUrl } from '../lib/videoLinks'

export default function ClickToPlayVideo({ video, language, placement = '' }) {
  const containerRef = useRef(null)
  const playerRef = useRef(null)
  const [nearViewport, setNearViewport] = useState(false)
  const [started, setStarted] = useState(false)
  const [failed, setFailed] = useState(false)
  const [mutedPlayback, setMutedPlayback] = useState(false)
  const location = useLocation()
  const anchor = getVideoAnchor(video, placement)
  const shareUrl = getVideoShareUrl(window.location.href, anchor)
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

  const play = useCallback(async (fromLink = false) => {
    const player = playerRef.current
    if (!player) return
    setFailed(false)
    setStarted(true)
    // Normal visits never attach a video URL. Only Play or this exact shared
    // video link may load media; preload="none" by itself is not sufficient.
    if (!player.hasAttribute('src')) {
      player.src = video.src
      player.load()
    }
    try {
      await player.play()
    } catch (error) {
      if (fromLink && error.name === 'NotAllowedError') {
        player.muted = true
        try {
          await player.play()
          setMutedPlayback(true)
        } catch {
          setFailed(true)
        }
      } else {
        setFailed(true)
      }
    }
    if (!fromLink) player.focus()
  }, [video.src])

  useEffect(() => {
    if (location.hash === `#${anchor}`) {
      // Wait until the route and its scroll target have committed.
      const frame = requestAnimationFrame(() => { void play(true) })
      return () => cancelAnimationFrame(frame)
    }
  }, [location.hash, location.key, anchor, play])

  return (
    <div id={anchor} ref={containerRef} className="scroll-mt-28">
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
          onPlay={() => {
            document.querySelectorAll('video').forEach(other => {
              if (other !== playerRef.current) other.pause()
            })
          }}
          onVolumeChange={() => setMutedPlayback(Boolean(playerRef.current?.muted))}
          className="absolute inset-0 h-full w-full object-contain"
        />
        {(!started || failed) && (
          <button
            type="button"
            onClick={() => { void play() }}
            aria-label={`${spanish ? 'Reproducir video' : 'Play video'}: ${video.title}`}
            className="group absolute inset-0 flex items-center justify-center bg-black/10 transition-colors hover:bg-black/20 focus-visible:outline focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-[#F2D98D]"
          >
            <span className="flex h-20 w-20 items-center justify-center rounded-full border border-[#F2D98D] bg-[#D4AF37] text-[#06121F] shadow-xl transition-transform group-hover:scale-105 motion-reduce:transform-none">
              <Play className="h-8 w-8 fill-current" aria-hidden="true" />
            </span>
          </button>
        )}
      </div>
      {mutedPlayback && (
        <button type="button" onClick={() => { playerRef.current.muted = false }} className="mt-2 min-h-11 w-full rounded border border-[#D4AF37]/40 px-3 text-sm text-[#F2D98D] focus-visible:outline focus-visible:outline-2">
          {spanish ? 'Activar sonido' : 'Turn on sound'}
        </button>
      )}
      {failed && (
        <div role="status" className="mt-3 text-sm text-[#F2D98D]">
          <p>{spanish ? 'No se pudo iniciar el video. Inténtelo de nuevo o use los controles del reproductor.' : 'The video could not start. Try again or use the player controls.'}</p>
          <button type="button" onClick={() => { void play() }} className="mt-2 rounded px-2 py-1 underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F2D98D]">
            {spanish ? 'Volver a intentar' : 'Try again'}
          </button>
        </div>
      )}
      <VideoShareButton url={shareUrl} title={video.title} language={language} />
    </div>
  )
}