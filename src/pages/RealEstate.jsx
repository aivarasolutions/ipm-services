import { Link } from 'react-router-dom';
import Container from '../components/Container';
import LeadCaptureForm from '../components/LeadCaptureForm';
import { getRealEstateListings } from '../lib/realEstateData';

const RealEstate = () => {
  const listings = getRealEstateListings();
  const featuredListings = listings.filter(listing => listing.featured).slice(0, 6);

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <Container>
          <h1>Premium Real Estate Investment Opportunities</h1>
          <p>Discover high-ROI properties in Mexico & USA with guaranteed rental management</p>
          <div className="hero-cta">
            <a className="btn primary" href="#listings">View Properties</a>
            <a className="btn" href="#consultation">Free Consultation</a>
          </div>
        </Container>
      </section>

      <Container>
        {/* Value Proposition */}
        <section className="section">
          <div className="row" style={{gap: '40px', alignItems: 'flex-start'}}>
            <div style={{flex: '1', minWidth: '300px'}}>
              <h2>Why Invest with IPM?</h2>
              <ul className="value-props">
                <li>✓ <strong>Guaranteed 8-12% ROI</strong> with our management</li>
                <li>✓ <strong>Pre-sale opportunities</strong> with 20-30% discounts</li>
                <li>✓ <strong>Turnkey solutions</strong> - we handle everything</li>
                <li>✓ <strong>Prime locations</strong> in high-demand areas</li>
                <li>✓ <strong>Legal support</strong> for international buyers</li>
                <li>✓ <strong>Immediate rental income</strong> upon completion</li>
              </ul>
            </div>
            <div style={{flex: '1', minWidth: '300px'}}>
              <LeadCaptureForm />
            </div>
          </div>
        </section>

        {/* Featured Listings */}
        <section className="section" id="listings">
          <h2>Featured Investment Properties</h2>
          <div className="real-estate-grid">
            {featuredListings.map(listing => (
              <div key={listing.id} className="real-estate-card">
                <div className="listing-badge">{listing.status}</div>
                <img 
                  src={listing.image} 
                  alt={listing.title}
                  style={{width: '100%', height: '220px', objectFit: 'cover'}}
                />
                <div style={{padding: '20px'}}>
                  <h3>{listing.title}</h3>
                  <p className="location">{listing.location}</p>
                  <div className="price-info">
                    <span className="price">
                      {listing.slug === 'paulus-condos' ? 
                        `Starting at $${listing.price.toLocaleString()} USD` : 
                        `$${listing.price.toLocaleString()}`
                      }
                    </span>
                    <span className="roi">ROI: {listing.expectedROI}%</span>
                  </div>
                  <p style={{fontSize: '0.95rem', color: '#666', marginBottom: '16px'}}>
                    {listing.description}
                  </p>
                  <div className="listing-features">
                    {listing.features.map((feature, index) => (
                      <span key={index} className="feature-tag">{feature}</span>
                    ))}
                  </div>
                  <Link 
                    to={`/real-estate/${listing.slug}`}
                    className="btn primary"
                    style={{width: '100%', textAlign: 'center', display: 'block', textDecoration: 'none'}}
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Investment Process */}
        <section className="section" id="consultation">
          <h2>Investment Process</h2>
          <div className="process-steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Consultation</h3>
              <p>Free consultation to understand your investment goals</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Property Selection</h3>
              <p>We present properties matching your criteria and budget</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Due Diligence</h3>
              <p>Legal review, market analysis, and ROI projections</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>Purchase & Management</h3>
              <p>Handle purchase process and immediate rental management</p>
            </div>
          </div>
          
          <div className="cta-section" style={{textAlign: 'center', marginTop: '50px'}}>
            <h2>Ready to Start Investing?</h2>
            <p>Get your free investment analysis today</p>
            <div style={{maxWidth: '500px', margin: '0 auto'}}>
              <LeadCaptureForm variant="detailed" />
            </div>
          </div>
        </section>
      </Container>
    </>
  );
};

export default RealEstate;