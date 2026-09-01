import { createContext, useContext, useEffect, useState } from 'react';
import {
  getLocaleRouteInfo,
  LOCALIZED_ROUTE_PATHS,
  localizeRoutePath,
} from '../lib/seo.js';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const initialLanguage = typeof window === 'undefined'
    ? 'en'
    : getLocaleRouteInfo(window.location.pathname).locale;
  const [language, setLanguage] = useState(initialLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = (lang) => {
    const { routePath } = getLocaleRouteInfo(window.location.pathname);
    if (lang === 'en' || LOCALIZED_ROUTE_PATHS[lang]?.includes(routePath)) {
      const nextPath = localizeRoutePath(routePath, lang);
      if (nextPath !== window.location.pathname) {
        window.location.assign(`${nextPath}${window.location.search}${window.location.hash}`);
        return;
      }
    }
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
