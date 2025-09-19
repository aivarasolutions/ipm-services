import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import { getRealEstateListing, getRealEstateListings } from "@/lib/realEstateData";

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  return getRealEstateListings().map(listing => ({ slug: listing.slug }));
}

export async function generateMetadata({ params }: Props) {
  const listing = getRealEstateListing(params.slug);
  if (!listing) return { title: "Property Not Found" };
  
  return {
    title: `${listing.title} | Real Estate Investment | IPM`,
    description: `${listing.description} - ${listing.expectedROI}% ROI. Starting at $${listing.price.toLocaleString()}.`,
  };
}

export default function PropertyDetailPage({ params }: Props) {
  const listing = getRealEstateListing(params.slug);
  if (!listing) notFound();

  return (
    <Container>
      <div className="section">
        <div className="row" style={{gap: '40px', alignItems: 'flex-start'}}>
          <div style={{flex: '2', minWidth: '400px'}}>
            <div className="listing-badge">{listing.status}</div>
            <h1>{listing.title}</h1>
            <p className="location" style={{fontSize: '1.1rem'}}>{listing.location}</p>
            
            <Image 
              src={listing.image} 
              alt={listing.title} 
              width={800} 
              height={500}
              priority
              style={{borderRadius: '12px', marginBottom: '30px'}}
            />
            
            <div className="property-overview">
              <div className="price-roi-section">
                <div className="price-display">
                  <span className="price">${listing.price.toLocaleString()}</span>
                  <span className="roi-badge">ROI: {listing.expectedROI}%</span>
                </div>
              </div>
              
              <p style={{fontSize: '1.1rem', lineHeight: '1.7', margin: '20px 0'}}>
                {listing.description}
              </p>
              
              <div className="property-details-grid">
                <div className="detail-section">
                  <h3>Property Details</h3>
                  <ul>
                    <li><strong>Bedrooms:</strong> {listing.details.bedrooms}</li>
                    <li><strong>Bathrooms:</strong> {listing.details.bathrooms}</li>
                    <li><strong>Square Feet:</strong> {listing.details.sqft.toLocaleString()}</li>
                    {listing.details.lotSize && (
                      <li><strong>Lot Size:</strong> {listing.details.lotSize}</li>
                    )}
                  </ul>
                </div>
                
                <div className="detail-section">
                  <h3>Investment Details</h3>
                  <ul>
                    <li><strong>Down Payment:</strong> ${listing.investment.downPayment.toLocaleString()}</li>
                    <li><strong>Monthly Payment:</strong> ${listing.investment.monthlyPayment.toLocaleString()}</li>
                    <li><strong>Rental Income:</strong> ${listing.investment.rentalIncome.toLocaleString()}/month</li>
                    <li><strong>Appreciation:</strong> {listing.investment.appreciation}</li>
                  </ul>
                </div>
              </div>
              
              <div className="amenities-section">
                <h3>Amenities & Features</h3>
                <div className="amenities-grid">
                  {listing.details.amenities.map((amenity, i) => (
                    <span key={i} className="amenity-tag">{amenity}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div style={{flex: '1', minWidth: '350px'}}>
            <LeadCaptureForm variant="detailed" />
            
            <div style={{marginTop: '30px', textAlign: 'center'}}>
              <Link className="btn" href="/real-estate">← Back to All Properties</Link>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

