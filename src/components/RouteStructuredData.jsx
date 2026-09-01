import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  getRouteStructuredData,
  serializeStructuredDataScripts,
} from '../lib/structuredData.js';
import {
  getRealEstateListingStructuredData,
  getRealEstateListings,
} from '../lib/realEstateData.ts';

export default function RouteStructuredData() {
  const { pathname } = useLocation();

  useEffect(() => {
    const listingMatch = pathname.match(/^\/real-estate\/([^/]+)$/);
    const listingSchema = listingMatch
      ? getRealEstateListingStructuredData(listingMatch[1])
      : undefined;
    const schemas = getRouteStructuredData(pathname, {
      listings: getRealEstateListings(),
      listingSchema,
    });
    const head = document.head;

    head.querySelectorAll('[data-route-structured-data]').forEach((script) => {
      script.remove();
    });

    if (schemas.length) {
      const template = document.createElement('template');
      template.innerHTML = serializeStructuredDataScripts(schemas);
      head.append(...template.content.childNodes);
    }
  }, [pathname]);

  return null;
}