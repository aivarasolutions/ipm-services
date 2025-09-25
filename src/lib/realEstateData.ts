export type RealEstateListing = {
  id: string;
  slug: string;
  title: string;
  location: string;
  price: number;
  expectedROI: number;
  status: 'Pre-Sale' | 'Ready' | 'Under Construction';
  image: string;
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
    images: Array<{
      src: string;
      alt: string;
    }>;
  };
  specialContent?: {
    title: string;
    highlights: string[];
    downloadLink?: {
      url: string;
      text: string;
    };
  };
};

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
      image: "/paulus-bedroom.jpg",
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
          { src: "/paulus-kitchen1.jpg", alt: "Kitchen & Living Area" },
          { src: "/paulus-rooftop.jpg", alt: "Rooftop Terrace" },
          { src: "/paulus-floorplan.jpg", alt: "Floorplan" },
          { src: "/paulus-kitchen3.jpg", alt: "Kitchen Detail" }
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
        downloadLink: {
          url: "/paulus-price-list.pdf",
          text: "📄 Download Full Price List"
        }
      }
    }
  ];
}

export function getRealEstateListing(slug: string): RealEstateListing | undefined {
  return getRealEstateListings().find(listing => listing.slug === slug);
}

