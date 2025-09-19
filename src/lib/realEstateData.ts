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
};

export function getRealEstateListings(): RealEstateListing[] {
  return [
    {
      id: "1",
      slug: "tulum-eco-resort-condos",
      title: "Tulum Eco Resort Condos",
      location: "Tulum, Quintana Roo, Mexico",
      price: 285000,
      expectedROI: 12,
      status: "Pre-Sale",
      image: "/stunning_tulum_penthouse.webp",
      description: "Luxury eco-friendly condos in Tulum's hotel zone with guaranteed rental program",
      features: ["Beachfront", "Eco-Friendly", "Hotel Zone", "Rental Program"],
      featured: true,
      details: {
        bedrooms: 2,
        bathrooms: 2,
        sqft: 1200,
        amenities: ["Pool", "Beach Club", "Spa", "Restaurant", "Concierge"]
      },
      investment: {
        downPayment: 85500,
        monthlyPayment: 1200,
        rentalIncome: 3500,
        appreciation: "8-12% annually"
      }
    },
    {
      id: "2",
      slug: "playa-del-carmen-penthouses",
      title: "Playa del Carmen Penthouses",
      location: "Playa del Carmen, Mexico",
      price: 450000,
      expectedROI: 10,
      status: "Ready",
      image: "/luxury_beachfront_resort.webp",
      description: "Luxury penthouses with rooftop pools in the heart of Playa del Carmen",
      features: ["Rooftop Pool", "Downtown", "Turnkey", "High ROI"],
      featured: true,
      details: {
        bedrooms: 3,
        bathrooms: 3,
        sqft: 1800,
        amenities: ["Rooftop Pool", "Gym", "Security", "Parking", "Storage"]
      },
      investment: {
        downPayment: 135000,
        monthlyPayment: 1800,
        rentalIncome: 4200,
        appreciation: "6-10% annually"
      }
    },
    {
      id: "3",
      slug: "lake-norman-luxury-homes",
      title: "Lake Norman Luxury Homes",
      location: "Lake Norman, North Carolina, USA",
      price: 750000,
      expectedROI: 8,
      status: "Ready",
      image: "/lake_norman_retreat.webp",
      description: "Waterfront luxury homes with private docks and mountain views",
      features: ["Waterfront", "Private Dock", "Mountain Views", "Luxury"],
      featured: true,
      details: {
        bedrooms: 4,
        bathrooms: 3,
        sqft: 3200,
        lotSize: "0.5 acres",
        amenities: ["Private Dock", "Boat House", "Fire Pit", "Deck", "Garage"]
      },
      investment: {
        downPayment: 150000,
        monthlyPayment: 3200,
        rentalIncome: 6000,
        appreciation: "4-8% annually"
      }
    },
    {
      id: "4",
      slug: "cancun-beachfront-villas",
      title: "Cancun Beachfront Villas",
      location: "Cancun, Quintana Roo, Mexico",
      price: 650000,
      expectedROI: 11,
      status: "Pre-Sale",
      image: "/luxury_beachfront_resort.webp",
      description: "Exclusive beachfront villas with private pools and beach access",
      features: ["Beachfront", "Private Pool", "Beach Access", "Exclusive"],
      featured: true,
      details: {
        bedrooms: 4,
        bathrooms: 4,
        sqft: 2500,
        lotSize: "0.25 acres",
        amenities: ["Private Pool", "Beach Access", "Terrace", "Garden", "Security"]
      },
      investment: {
        downPayment: 195000,
        monthlyPayment: 2800,
        rentalIncome: 5500,
        appreciation: "10-15% annually"
      }
    },
    {
      id: "5",
      slug: "miami-luxury-condos",
      title: "Miami Luxury Condos",
      location: "Miami, Florida, USA",
      price: 850000,
      expectedROI: 9,
      status: "Under Construction",
      image: "/stunning_tulum_penthouse.webp",
      description: "High-rise luxury condos with ocean views in downtown Miami",
      features: ["Ocean Views", "High-Rise", "Downtown", "Luxury"],
      featured: false,
      details: {
        bedrooms: 3,
        bathrooms: 3,
        sqft: 2200,
        amenities: ["Ocean View", "Gym", "Pool", "Concierge", "Valet"]
      },
      investment: {
        downPayment: 170000,
        monthlyPayment: 3800,
        rentalIncome: 6500,
        appreciation: "5-9% annually"
      }
    },
    {
      id: "6",
      slug: "puerto-vallarta-resort-suites",
      title: "Puerto Vallarta Resort Suites",
      location: "Puerto Vallarta, Jalisco, Mexico",
      price: 320000,
      expectedROI: 10,
      status: "Ready",
      image: "/luxury_beachfront_resort.webp",
      description: "Resort-style suites with guaranteed rental income in Puerto Vallarta",
      features: ["Resort-Style", "Guaranteed Income", "Beachfront", "Turnkey"],
      featured: false,
      details: {
        bedrooms: 2,
        bathrooms: 2,
        sqft: 1100,
        amenities: ["Resort Pool", "Beach Access", "Restaurant", "Spa", "Activities"]
      },
      investment: {
        downPayment: 96000,
        monthlyPayment: 1400,
        rentalIncome: 3200,
        appreciation: "7-11% annually"
      }
    }
  ];
}

export function getRealEstateListing(slug: string): RealEstateListing | undefined {
  return getRealEstateListings().find(listing => listing.slug === slug);
}

