import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Container from '../components/Container';
import LeadCaptureForm from '../components/LeadCaptureForm';
import { getRealEstateListing } from '../lib/realEstateData';

const RealEstateDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const listing = getRealEstateListing(slug);

  useEffect(() => {
    if (!listing) {
      navigate('/real-estate');
    }
  }, [listing, navigate]);

  if (!listing) {
    return null;
  }

  return (
    <Container>
      <div className="section">
        <div className="row" style={{gap: '40px', alignItems: 'flex-start'}}>
          <div style={{flex: '2', minWidth: '400px'}}>
            <div className="listing-badge">{listing.status}</div>
            <h1>{listing.title}</h1>
            <p className="location" style={{fontSize: '1.1rem'}}>{listing.location}</p>
            
            <img 
              src={listing.image} 
              alt={listing.title} 
              style={{
                width: '100%', 
                height: '400px', 
                objectFit: 'cover',
                borderRadius: '12px', 
                marginBottom: '30px'
              }}
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
                    {listing.details.yearBuilt && (
                      <li><strong>Year Built:</strong> {listing.details.yearBuilt}</li>
                    )}
                  </ul>
                </div>
                
                <div className="detail-section">
                  <h3>Investment Details</h3>
                  <ul>
                    <li><strong>Down Payment:</strong> ${listing.investment.downPayment.toLocaleString()}</li>
                    <li><strong>Monthly Payment:</strong> ${listing.investment.monthlyPayment.toLocaleString()}</li>
                    <li><strong>Expected Rental Income:</strong> ${listing.investment.rentalIncome.toLocaleString()}/month</li>
                    <li><strong>Expected Appreciation:</strong> {listing.investment.appreciation}</li>
                  </ul>
                </div>
              </div>
              
              <div className="amenities-section">
                <h3>Amenities</h3>
                <div className="amenities-grid">
                  {listing.details.amenities.map((amenity, index) => (
                    <span key={index} className="amenity-tag">{amenity}</span>
                  ))}
                </div>
              </div>
              
              <div className="features-section">
                <h3>Key Features</h3>
                <div className="listing-features">
                  {listing.features.map((feature, index) => (
                    <span key={index} className="feature-tag">{feature}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div style={{flex: '1', minWidth: '300px'}}>
            <div style={{position: 'sticky', top: '20px'}}>
              <LeadCaptureForm variant="detailed" />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default RealEstateDetail;