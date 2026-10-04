---
name: Native video test browser limitation
description: The automated Chromium can lack H.264/AAC even when valid MP4 responses are served.
---

The automated testing browser has reported no H.264 or AAC support. A valid H.264/AAC MP4 can therefore fail there with `DEMUXER_ERROR_NO_SUPPORTED_STREAMS`, even though its generic MP4 capability reports “maybe.”

**Why:** Exact-codec capability probes returned empty for both H.264 and AAC, while the delivered files had valid MP4 headers, decoded with FFmpeg, and were served with the correct MIME type.

**How to apply:** Check exact-codec capabilities before treating a browser playback failure as an encoding bug. Verify network/lazy-loading/layout separately and disclose that playback requires a codec-enabled browser when the tester lacks support. Do not change the requested production format just to satisfy an unsupported test browser.