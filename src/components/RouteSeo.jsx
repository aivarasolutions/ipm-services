import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getSeoMetadata } from '../lib/seo.js';
import { getRealEstateListing } from '../lib/realEstateData';
import { applySeoMetadataToDocument } from '../lib/clientSeo.js';

export default function RouteSeo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const listingMatch = pathname.match(/^\/real-estate\/([^/]+)$/);
    const metadata = getSeoMetadata(pathname, {
      realEstateListing: listingMatch ? getRealEstateListing(listingMatch[1]) : undefined,
    });
    if (!metadata) return;
    applySeoMetadataToDocument(metadata);
  }, [pathname]);

  return null;
}