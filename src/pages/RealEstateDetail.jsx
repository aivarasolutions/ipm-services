import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Container from '../components/Container';
import LeadCaptureForm from '../components/LeadCaptureForm';
import { getRealEstateListing } from '../lib/realEstateData';

const RealEstateDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const listing = getRealEstateListing(slug);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!listing) {
      navigate('/real-estate');
    }
  }, [listing, navigate]);

  const openModal = (index) => {
    setCurrentImageIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const nextImage = () => {
    if (listing?.gallery) {
      const totalImages = listing.gallery.images.length + 1; // +1 for main image
      setCurrentImageIndex((prev) => (prev + 1) % totalImages);
    }
  };

  const prevImage = () => {
    if (listing?.gallery) {
      const totalImages = listing.gallery.images.length + 1; // +1 for main image
      setCurrentImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
    }
  };

  const getAllImages = () => {
    if (!listing) return [];
    const images = [{ src: listing.image, alt: listing.title }];
    if (listing.gallery) {
      images.push(...listing.gallery.images);
    }
    return images;
  };

  if (!listing) {
    return null;
  }

  return (
    <Container>
      <div className="section">
        <div style={{marginBottom: '20px'}}>
          <button
            onClick={() => navigate('/real-estate')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            ← Back to Properties
          </button>
        </div>
        <div className="row" style={{gap: '40px', alignItems: 'flex-start'}}>
          <div style={{flex: '2', minWidth: '400px'}}>
            <div className="listing-badge">{listing.status}</div>
            <h1>{listing.title}</h1>
            <p className="location" style={{fontSize: '1.1rem'}}>{listing.location}</p>
            
            {listing.gallery ? (
              <div className="property-gallery" style={{marginBottom: '30px'}}>
                <div className="gallery-main">
                  <img 
                    src={listing.image} 
                    alt={listing.title} 
                    onClick={() => openModal(0)}
                    style={{
                      width: '100%', 
                      height: '400px', 
                      objectFit: 'cover',
                      borderRadius: '12px',
                      cursor: 'pointer'
                    }}
                  />
                </div>
                <div className="gallery-thumbnails" style={{
                  display: 'grid', 
                  gridTemplateColumns: `repeat(${Math.min(listing.gallery.images.length, 4)}, 1fr)`, 
                  gap: '10px', 
                  marginTop: '15px'
                }}>
                  {listing.gallery.images.map((image, index) => (
                    <img 
                      key={index}
                      src={image.src} 
                      alt={image.alt}
                      onClick={() => openModal(index + 1)}
                      style={{
                        width: '100%', 
                        height: '100px', 
                        objectFit: 'cover',
                        borderRadius: '8px',
                        cursor: 'pointer'
                      }}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <img 
                src={listing.image} 
                alt={listing.title} 
                onClick={() => openModal(0)}
                style={{
                  width: '100%', 
                  height: '400px', 
                  objectFit: 'cover',
                  borderRadius: '12px', 
                  marginBottom: '30px',
                  cursor: 'pointer'
                }}
              />
            )}
            
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
              
              {listing.specialContent && (
                <div className="special-content" style={{
                  backgroundColor: '#f8f9fa',
                  padding: '20px',
                  borderRadius: '12px',
                  marginBottom: '20px',
                  border: '2px solid #e9ecef'
                }}>
                  <h4 style={{color: '#2d3748', marginBottom: '15px'}}>{listing.specialContent.title}</h4>
                  <ul style={{color: '#4a5568', lineHeight: '1.6'}}>
                    {listing.specialContent.highlights.map((highlight, index) => (
                      <li key={index}>• <strong>{highlight.split(' - ')[0]}</strong>{highlight.includes(' - ') ? ` - ${highlight.split(' - ')[1]}` : ''}</li>
                    ))}
                  </ul>
                  {listing.specialContent.downloadLinks && listing.specialContent.downloadLinks.length > 0 && (
                    <div style={{marginTop: '15px', display: 'flex', flexDirection: 'column', gap: '10px'}}>
                      {listing.specialContent.downloadLinks.map((downloadLink, index) => (
                        <a 
                          key={index}
                          href={downloadLink.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="btn primary"
                          style={{
                            display: 'inline-block',
                            textDecoration: 'none',
                            padding: '10px 20px',
                            fontSize: '0.9rem',
                            width: 'fit-content'
                          }}
                        >
                          {downloadLink.text}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              )}
              
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

      {/* Image Modal */}
      {modalOpen && (
        <div 
          className="modal-overlay" 
          onClick={closeModal}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
        >
          <div 
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '90vw',
              maxHeight: '90vh'
            }}
          >
            <img 
              src={getAllImages()[currentImageIndex]?.src}
              alt={getAllImages()[currentImageIndex]?.alt}
              style={{
                maxWidth: '100%',
                maxHeight: '90vh',
                objectFit: 'contain',
                borderRadius: '8px'
              }}
            />
            
            {/* Close Button */}
            <button
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                fontSize: '20px',
                cursor: 'pointer'
              }}
            >
              ×
            </button>

            {/* Navigation Arrows */}
            {getAllImages().length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  style={{
                    position: 'absolute',
                    left: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(0, 0, 0, 0.5)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '50px',
                    height: '50px',
                    fontSize: '24px',
                    cursor: 'pointer'
                  }}
                >
                  ‹
                </button>
                <button
                  onClick={nextImage}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(0, 0, 0, 0.5)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '50px',
                    height: '50px',
                    fontSize: '24px',
                    cursor: 'pointer'
                  }}
                >
                  ›
                </button>
              </>
            )}

            {/* Image Counter */}
            <div style={{
              position: 'absolute',
              bottom: '10px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              padding: '5px 15px',
              borderRadius: '15px',
              fontSize: '14px'
            }}>
              {currentImageIndex + 1} / {getAllImages().length}
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default RealEstateDetail;