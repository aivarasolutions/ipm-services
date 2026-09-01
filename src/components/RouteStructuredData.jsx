import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  getRouteStructuredData,
  serializeStructuredDataScripts,
  SITE_URL,
} from '../lib/structuredData.js';
import {
  getRealEstateListingStructuredData,
  getRealEstateListings,
} from '../lib/realEstateData.ts';

export default function RouteStructuredData() {
  const { pathname } = useLocation();

  useEffect(() => {
    const propertyMatch = pathname.match(/^\/properties\/([^/]+)$/);
    const head = document.head;

    if (propertyMatch) {
      const expectedUrl = new URL(pathname, SITE_URL).toString();
      let preservedMatchingRental = false;

      head.querySelectorAll('[data-route-structured-data]').forEach((script) => {
        try {
          const schema = JSON.parse(script.textContent || '{}');
          const isMatchingRental =
            schema['@type'] === 'VacationRental' &&
            schema.url === expectedUrl;
          if (isMatchingRental && !preservedMatchingRental) {
            preservedMatchingRental = true;
            return;
          }
        } catch {
          // Malformed or stale route data should not survive navigation.
        }
        script.remove();
      });
      return;
    }

    const listingMatch = pathname.match(/^\/real-estate\/([^/]+)$/);
    const listingSchema = listingMatch
      ? getRealEstateListingStructuredData(listingMatch[1])
      : undefined;
    const schemas = getRouteStructuredData(pathname, {
      listings: getRealEstateListings(),
      listingSchema,
    });
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