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
      image: "/paulus-rooftop-main.jpg",
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
    },
    {
      id: "2",
      slug: "joshua-condos",
      title: "Joshua Condos",
      location: "Playa del Carmen, Mexico",
      price: 140700,
      expectedROI: 12,
      status: "Pre-Sale",
      image: "/joshua-rooftop.jpg",
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
          { src: "/joshua-living-kitchen.jpg", alt: "Living Area & Kitchen" },
          { src: "/joshua-bedroom.jpg", alt: "Bedroom" },
          { src: "/joshua-exterior.jpg", alt: "Exterior View" },
          { src: "/joshua-ground-floor.jpg", alt: "Ground Floor Plan" },
          { src: "/joshua-upper-level.jpg", alt: "Upper Level Plan" },
          { src: "/joshua-roof-layout.jpg", alt: "Roof Layout" }
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
        downloadLink: {
          url: "/joshua-price-list.pdf",
          text: "📄 Download Full Price List"
        }
      }
    },
    {
      id: "3",
      slug: "ukana-condos",
      title: "UKANA",
      location: "Playa del Carmen, Mexico",
      price: 184699,
      expectedROI: 13,
      status: "Pre-Sale",
      image: "/ukana-main.jpg",
      description: "Exclusive development of 33 luxury condominiums with modern design, premium finishes, and exceptional amenities in the heart of Playa del Carmen",
      features: ["Pre-Sale Pricing", "Exclusive Development", "Modern Design", "Premium Location"],
      featured: true,
      details: {
        bedrooms: 2,
        bathrooms: 2,
        sqft: 1206,
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
          { src: "/ukana-gallery-1.jpg", alt: "Dining & Kitchen Area" },
          { src: "/ukana-gallery-2.jpg", alt: "Living Space" },
          { src: "/ukana-gallery-3.jpg", alt: "Kitchen Detail" },
          { src: "/ukana-gallery-4.jpg", alt: "Dining Area" },
          { src: "/ukana-gallery-5.jpg", alt: "Modern Living Space" },
          { src: "/ukana-gallery-6.jpg", alt: "Spacious Living Room" },
          { src: "/ukana-gallery-7.jpg", alt: "Bedroom Suite" },
          { src: "/ukana-gallery-8.jpg", alt: "Modern Bathroom" },
          { src: "/ukana-exterior.jpg", alt: "Development Exterior" },
          { src: "/ukana-aerial.jpg", alt: "Aerial View" }
        ]
      },
      specialContent: {
        title: "🌟 Exclusive Luxury Development",
        highlights: [
          "Starting at $184,699 USD - exceptional value for luxury living",
          "Only 33 exclusive units ranging from 71-198 square meters",
          "1-3 bedroom configurations to suit every lifestyle",
          "Premium amenities: Rooftop pool, jacuzzi, gym, and solarium",
          "Prime Playa del Carmen location with easy access to beaches",
          "Modern elevator and luxury lobby entrance",
          "Perfect for investment or personal retreat"
        ],
        downloadLink: {
          url: "/ukana-brochure.pdf",
          text: "📄 Download Complete Brochure"
        }
      }
    }
  ];
}

export function getRealEstateListing(slug: string): RealEstateListing | undefined {
  return getRealEstateListings().find(listing => listing.slug === slug);
}

