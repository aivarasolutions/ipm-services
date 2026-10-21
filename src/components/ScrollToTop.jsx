import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, hash, key } = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    if (hash) {
      let id;
      try {
        id = decodeURIComponent(hash.slice(1));
      } catch {
        return;
      }
      const scrollToTarget = () => {
        const target = document.getElementById(id);
        if (!target) return false;
        target.scrollIntoView({
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
          block: 'start',
        });
        return true;
      };
      if (scrollToTarget()) return;

      // Route components are lazy-loaded, so the target may not exist yet.
      const observer = new MutationObserver(() => {
        if (scrollToTarget()) observer.disconnect();
      });
      observer.observe(document.body, { childList: true, subtree: true });
      const timeout = window.setTimeout(() => observer.disconnect(), 15000);
      return () => {
        observer.disconnect();
        window.clearTimeout(timeout);
      };
    }
    if (navType !== 'POP') {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash, key, navType]);

  return null;
}
