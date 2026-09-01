import { createRealEstateListingStructuredData } from './structuredData.js';

export type RealEstateListing = {
  id: string;
  slug: string;
  title: string;
  location: string;
  price: number;
  expectedROI: number;
  status: 'Pre-Sale' | 'Ready' | 'Under Construction';
  image: string;
  imageVariants?: ResponsiveImage;
  description: string;
  features: string[];
  featured: boolean;
  details: {
    bedrooms: number;
    bathrooms: number;
    sqft: number;
    lotSize?: string;
    yearBuilt?: number;
    amenities: string[];
  };
  investment: {
    downPayment: number;
    monthlyPayment: number;
    rentalIncome: number;
    appreciation: string;
  };
  gallery?: {
    images: GalleryImage[];
  };
  specialContent?: {
    title: string;
    highlights: string[];
    downloadLinks?: Array<{
      url: string;
      text: string;
    }>;
  };
};

export type ResponsiveImageSource = {
  src: string;
  srcSet: string;
  webpSrcSet: string;
  avifSrcSet: string;
  sizes: string;
  width: number;
  height: number;
};

export type ResponsiveImage = ResponsiveImageSource & {
  alt: string;
  card: ResponsiveImageSource;
  thumbnail: ResponsiveImageSource;
};

type GalleryImage = {
  src: string;
  alt: string;
  variants?: ResponsiveImage;
};

const createRealEstateImageSource = (
  slug: string,
  name: string,
  sourceWidth: number,
  sourceHeight: number,
  widths: number[],
  sizes: string,
): ResponsiveImageSource => {
  const assetDirectory = slug === 'joshua'
    ? '/images/joshua'
    : `/images/real-estate/${slug}`;
  const base = `${assetDirectory}/${name}`;
  const outputWidths = widths.map((width) => Math.min(width, sourceWidth));
  const largestWidth = outputWidths[outputWidths.length - 1];
  const height = Math.round((sourceHeight * largestWidth) / sourceWidth);
  const srcSet = (extension: string) =>
    outputWidths
      .map((width) => `${base}-${width}.${extension} ${width}w`)
      .join(', ');

  return {
    src: `${base}-${largestWidth}.jpg`,
    srcSet: srcSet('jpg'),
    webpSrcSet: srcSet('webp'),
    avifSrcSet: srcSet('avif'),
    sizes,
    width: largestWidth,
    height,
  };
};

const createRealEstateImage = (
  slug: string,
  name: string,
  alt: string,
  sourceWidth: number,
  sourceHeight: number,
): ResponsiveImage => ({
  alt,
  ...createRealEstateImageSource(
    slug,
    name,
    sourceWidth,
    sourceHeight,
    [320, 640, 1200],
    '(max-width: 900px) 100vw, 800px',
  ),
  card: createRealEstateImageSource(
    slug,
    name,
    sourceWidth,
    sourceHeight,
    [320, 640],
    '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 400px',
  ),
  thumbnail: createRealEstateImageSource(
    slug,
    name,
    sourceWidth,
    sourceHeight,
    [320],
    '(max-width: 900px) 25vw, 180px',
  ),
});

const joshuaRooftop = createRealEstateImage('joshua', 'joshua-rooftop', 'Joshua Condos rooftop pool and terrace', 7680, 4320);
const joshuaLivingKitchen = createRealEstateImage('joshua', 'joshua-living-kitchen', 'Living Area & Kitchen', 7680, 4320);
const joshuaBedroom = createRealEstateImage('joshua', 'joshua-bedroom', 'Bedroom', 3000, 1688);
const joshuaExterior = createRealEstateImage('joshua', 'joshua-exterior', 'Exterior View', 3977, 4320);
const joshuaGroundFloor = createRealEstateImage('joshua', 'joshua-ground-floor', 'Ground Floor Plan', 1818, 3000);
const joshuaUpperLevel = createRealEstateImage('joshua', 'joshua-upper-level', 'Upper Level Plan', 1620, 3000);
const joshuaRoofLayout = createRealEstateImage('joshua', 'joshua-roof-layout', 'Roof Layout', 1571, 3000);

const paulusRooftopMain = createRealEstateImage('paulus', 'paulus-rooftop-main', 'Paulus Condos rooftop terrace', 1280, 720);
const paulusKitchen = createRealEstateImage('paulus', 'paulus-kitchen1', 'Paulus Condos kitchen and living area', 1024, 1280);
const paulusRooftop = createRealEstateImage('paulus', 'paulus-rooftop', 'Paulus Condos rooftop terrace', 1280, 720);
const paulusFloorplan = createRealEstateImage('paulus', 'paulus-floorplan', 'Paulus Condos floor plan', 3840, 2160);
const paulusKitchenDetail = createRealEstateImage('paulus', 'paulus-kitchen3', 'Paulus Condos kitchen detail', 1920, 1080);

const ukanaMain = createRealEstateImage('ukana', 'ukana-main', 'UKANA Condos exterior and amenities', 2000, 1336);
const ukanaDiningKitchen = createRealEstateImage('ukana', 'ukana-gallery-1', 'UKANA dining and kitchen area', 2000, 1336);
const ukanaLiving = createRealEstateImage('ukana', 'ukana-gallery-2', 'UKANA living space', 2000, 1336);
const ukanaKitchenDetail = createRealEstateImage('ukana', 'ukana-gallery-3', 'UKANA kitchen detail', 2000, 1336);
const ukanaDining = createRealEstateImage('ukana', 'ukana-gallery-4', 'UKANA dining area', 2000, 1336);
const ukanaModernLiving = createRealEstateImage('ukana', 'ukana-gallery-5', 'UKANA modern living space', 2000, 1336);
const ukanaLivingRoom = createRealEstateImage('ukana', 'ukana-gallery-6', 'UKANA spacious living room', 2000, 1336);
const ukanaBedroom = createRealEstateImage('ukana', 'ukana-gallery-7', 'UKANA bedroom suite', 2000, 1336);
const ukanaBathroom = createRealEstateImage('ukana', 'ukana-gallery-8', 'UKANA modern bathroom', 2000, 1336);
const ukanaExterior = createRealEstateImage('ukana', 'ukana-exterior', 'UKANA development exterior', 2000, 1498);
const ukanaAerial = createRealEstateImage('ukana', 'ukana-aerial', 'UKANA aerial view', 2000, 1498);

export function getRealEstateListings(): RealEstateListing[] {
  return [
    {
      id: "1",
      slug: "paulus-condos",
      title: "Paulus Condos",
      location: "Playa del Carmen, Mexico",
      price: 162000,
      expectedROI: 11,
      status: "Pre-Sale",
      image: paulusRooftopMain.src,
      imageVariants: paulusRooftopMain,
      description: "Modern luxury condos with premium finishes and rooftop terrace in the heart of Playa del Carmen",
      features: ["Pre-Sale Pricing", "Modern Design", "Rooftop Terrace", "Downtown Location"],
      featured: true,
      details: {
        bedrooms: 1,
        bathrooms: 1,
        sqft: 485,
        amenities: ["Rooftop Terrace", "Modern Kitchen", "Premium Finishes", "Elevator", "Security"]
      },
      investment: {
        downPayment: 48600,
        monthlyPayment: 1100,
        rentalIncome: 2800,
        appreciation: "8-12% annually"
      },
      gallery: {
        images: [
          { src: paulusKitchen.src, alt: paulusKitchen.alt, variants: paulusKitchen },
          { src: paulusRooftop.src, alt: paulusRooftop.alt, variants: paulusRooftop },
          { src: paulusFloorplan.src, alt: paulusFloorplan.alt, variants: paulusFloorplan },
          { src: paulusKitchenDetail.src, alt: paulusKitchenDetail.alt, variants: paulusKitchenDetail }
        ]
      },
      specialContent: {
        title: "🎯 Pre-Sale Opportunity",
        highlights: [
          "Limited time pre-sale pricing - Up to 25% below market value",
          "Premium location in the heart of Playa del Carmen",
          "Modern design with high-end finishes and materials",
          "Delivery 2026 - Perfect timing for rental season",
          "Guaranteed rental program available upon completion"
        ],
        downloadLinks: [{
          url: "/paulus-price-list.pdf",
          text: "📄 Download Full Price List"
        }]
      }
    },
    {
      id: "2",
      slug: "joshua-condos",
      title: "Joshua Condos",
      location: "Playa del Carmen, Mexico",
      price: 140700,
      expectedROI: 12,
      status: "Pre-Sale",
      image: joshuaRooftop.src,
      imageVariants: joshuaRooftop,
      description: "Contemporary condos with spacious layouts, rooftop amenities, and modern finishes in prime Playa del Carmen location",
      features: ["Pre-Sale Pricing", "Spacious Layout", "Rooftop Pool", "Prime Location"],
      featured: true,
      details: {
        bedrooms: 2,
        bathrooms: 2,
        sqft: 592,
        amenities: ["Rooftop Pool", "Modern Kitchen", "Premium Finishes", "Elevator", "Security", "Parking"]
      },
      investment: {
        downPayment: 42210,
        monthlyPayment: 950,
        rentalIncome: 2600,
        appreciation: "10-14% annually"
      },
      gallery: {
        images: [
          { src: joshuaLivingKitchen.src, alt: joshuaLivingKitchen.alt, variants: joshuaLivingKitchen },
          { src: joshuaBedroom.src, alt: joshuaBedroom.alt, variants: joshuaBedroom },
          { src: joshuaExterior.src, alt: joshuaExterior.alt, variants: joshuaExterior },
          { src: joshuaGroundFloor.src, alt: joshuaGroundFloor.alt, variants: joshuaGroundFloor },
          { src: joshuaUpperLevel.src, alt: joshuaUpperLevel.alt, variants: joshuaUpperLevel },
          { src: joshuaRoofLayout.src, alt: joshuaRoofLayout.alt, variants: joshuaRoofLayout }
        ]
      },
      specialContent: {
        title: "🏖️ Exceptional Value Opportunity",
        highlights: [
          "Unbeatable pre-sale pricing starting at $140,700 USD",
          "Larger 592 sq ft units with 2 bedrooms and 2 bathrooms",
          "30% down payment with flexible financing options",
          "Premium Playa del Carmen location near beaches and attractions",
          "Rooftop pool and modern amenities for maximum rental appeal",
          "Guaranteed rental management program available"
        ],
        downloadLinks: [{
          url: "/joshua-price-list.pdf",
          text: "📄 Download Full Price List"
        }]
      }
    },
    {
      id: "3",
      slug: "ukana-condos",
      title: "UKANA",
      location: "Playa del Carmen, Mexico",
      price: 185000,
      expectedROI: 13,
      status: "Pre-Sale",
      image: ukanaMain.src,
      imageVariants: ukanaMain,
      description: "Exclusive development of 33 luxury condominiums with modern design, premium finishes, and exceptional amenities in the heart of Playa del Carmen",
      features: ["Pre-Sale Pricing", "Exclusive Development", "Modern Design", "Premium Location"],
      featured: true,
      details: {
        bedrooms: 2,
        bathrooms: 2,
        sqft: 764,
        amenities: ["Elevator", "Rooftop Pool", "Jacuzzi", "Gym", "Solarium", "Lobby", "Security"]
      },
      investment: {
        downPayment: 55409,
        monthlyPayment: 1200,
        rentalIncome: 3200,
        appreciation: "12-16% annually"
      },
      gallery: {
        images: [
          { src: ukanaDiningKitchen.src, alt: ukanaDiningKitchen.alt, variants: ukanaDiningKitchen },
          { src: ukanaLiving.src, alt: ukanaLiving.alt, variants: ukanaLiving },
          { src: ukanaKitchenDetail.src, alt: ukanaKitchenDetail.alt, variants: ukanaKitchenDetail },
          { src: ukanaDining.src, alt: ukanaDining.alt, variants: ukanaDining },
          { src: ukanaModernLiving.src, alt: ukanaModernLiving.alt, variants: ukanaModernLiving },
          { src: ukanaLivingRoom.src, alt: ukanaLivingRoom.alt, variants: ukanaLivingRoom },
          { src: ukanaBedroom.src, alt: ukanaBedroom.alt, variants: ukanaBedroom },
          { src: ukanaBathroom.src, alt: ukanaBathroom.alt, variants: ukanaBathroom },
          { src: ukanaExterior.src, alt: ukanaExterior.alt, variants: ukanaExterior },
          { src: ukanaAerial.src, alt: ukanaAerial.alt, variants: ukanaAerial }
        ]
      },
      specialContent: {
        title: "🌟 Exclusive Luxury Development",
        highlights: [
          "Starting at $185,000 USD - exceptional value for luxury living",
          "Only 33 exclusive units ranging from 71-142 square meters",
          "1-3 bedroom configurations to suit every lifestyle",
          "Premium amenities: Rooftop pool, jacuzzi, gym, and solarium",
          "Prime Playa del Carmen location with easy access to beaches",
          "Modern elevator and luxury lobby entrance",
          "Perfect for investment or personal retreat"
        ],
        downloadLinks: [
          {
            url: "/ukana-brochure.pdf",
            text: "📄 Download Complete Brochure"
          },
          {
            url: "/ukana-pricing-availability.png",
            text: "📊 Download Pricing & Availability"
          }
        ]
      }
    }
  ];
}

export function getRealEstateListing(slug: string): RealEstateListing | undefined {
  return getRealEstateListings().find(listing => listing.slug === slug);
}

export function getRealEstateListingStructuredData(slug: string) {
  return createRealEstateListingStructuredData(getRealEstateListing(slug));
}

