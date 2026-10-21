// Explicit asset IDs keep shared links stable when video files are replaced.
export function getVideoAnchor(video, placement = '') {
  let identity = video.id
  if (!identity) {
    let hash = 2166136261
    for (const character of video.src || video.title || 'video') {
      hash = Math.imul(hash ^ character.charCodeAt(0), 16777619)
    }
    identity = `clip-${(hash >>> 0).toString(36)}`
  }
  return `video-${identity}${placement ? `-${placement}` : ''}`
}

export function getVideoShareUrl(pageUrl, anchor) {
  const url = new URL(pageUrl)
  // Share only the public page and video, not unrelated query parameters.
  url.search = ''
  url.hash = anchor
  return url.href
}
