import { useId, useState } from 'react'
import { Check, Copy, Share2 } from 'lucide-react'

export default function VideoShareButton({ url, title, language }) {
  const inputId = useId()
  const [message, setMessage] = useState('')
  const [showUrl, setShowUrl] = useState(false)
  const spanish = language === 'es'

  const copyFallbackMessage = spanish
    ? 'No se pudo copiar el enlace. Seleccione la dirección y cópiela manualmente.'
    : 'The link could not be copied. Select the address and copy it manually.'

  async function copyLink() {
    setMessage('')
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable')
      await navigator.clipboard.writeText(url)
      setShowUrl(false)
      setMessage(spanish ? 'Enlace copiado.' : 'Link copied.')
    } catch {
      setShowUrl(true)
      setMessage(copyFallbackMessage)
    }
  }

  async function shareVideo() {
    setMessage('')
    setShowUrl(false)

    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      try {
        await navigator.share({ title, url })
        setMessage(spanish ? 'Video compartido.' : 'Video shared.')
        return
      } catch (error) {
        if (error?.name === 'AbortError') return
      }
    }

    await copyLink()
  }

  return (
    <div className="mt-3">
      <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={shareVideo}
        aria-label={spanish ? `Compartir video: ${title}` : `Share video: ${title}`}
        className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-[#D4AF37] bg-[#06121F] px-4 py-2 text-sm font-medium text-[#F2D98D] transition-colors hover:bg-[#102438] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2D98D] motion-reduce:transition-none"
      >
        {message === (spanish ? 'Video compartido.' : 'Video shared.') || message === (spanish ? 'Enlace copiado.' : 'Link copied.')
          ? <Check className="h-4 w-4" aria-hidden="true" />
          : <Share2 className="h-4 w-4" aria-hidden="true" />}
        <span>{spanish ? 'Compartir' : 'Share'}</span>
      </button>
      <button
        type="button"
        onClick={copyLink}
        aria-label={spanish ? `Copiar enlace del video: ${title}` : `Copy video link: ${title}`}
        className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-[#D4AF37] bg-[#06121F] px-3 py-2 text-sm font-medium text-[#F2D98D] transition-colors hover:bg-[#102438] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F2D98D] motion-reduce:transition-none"
      >
        {message === (spanish ? 'Enlace copiado.' : 'Link copied.')
          ? <Check className="h-4 w-4" aria-hidden="true" />
          : <Copy className="h-4 w-4" aria-hidden="true" />}
        <span>{spanish ? 'Copiar enlace' : 'Copy link'}</span>
      </button>
      </div>

      <p role="status" aria-live="polite" className="mt-2 min-h-5 text-sm text-[#F2D98D]">
        {message}
      </p>

      {showUrl && (
        <div className="mt-2 max-w-full">
          <label htmlFor={inputId} className="mb-1 block text-sm text-[#F2D98D]">
            {spanish
              ? 'Mantenga pulsado el enlace para seleccionarlo y copiarlo:'
              : 'Select and copy the link:'}
          </label>
          <input
            id={inputId}
            type="url"
            readOnly
            value={url}
            onFocus={(event) => event.currentTarget.select()}
            className="block min-h-10 w-full rounded-md border border-[#D4AF37]/70 bg-[#06121F] px-3 py-2 text-sm text-[#F2D98D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F2D98D]"
            aria-label={spanish ? 'Enlace del video' : 'Video link'}
          />
        </div>
      )}
    </div>
  )
}
