import Link from "next/link";
import Image from "next/image";
import Container from "@/components/Container";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import { getRealEstateListings } from "@/lib/realEstateData";

export const metadata = {
  title: "Real Estate Sales | International Property Management",
  description: "Discover premium real estate opportunities in Mexico & USA. Pre-sale and ready properties with guaranteed ROI. Expert property investment guidance.",
  keywords: "real estate sales, property investment, Mexico real estate, USA properties, pre-sale properties, ROI guaranteed"
};

export default function RealEstatePage() {
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
            <Link className="btn primary" href="#listings">View Properties</Link>
            <Link className="btn" href="#consultation">Free Consultation</Link>
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
              <article className="real-estate-card" key={listing.id}>
                <div className="listing-badge">{listing.status}</div>
                <Image src={listing.image} alt={listing.title} width={400} height={250} />
                <div className="card-body">
                  <h3>{listing.title}</h3>
                  <p className="location">{listing.location}</p>
                  <div className="price-info">
                    <span className="price">${listing.price.toLocaleString()}</span>
                    <span className="roi">ROI: {listing.expectedROI}%</span>
                  </div>
                  <p className="description">{listing.description}</p>
                  <div className="listing-features">
                    {listing.features.map((feature, i) => (
                      <span key={i} className="feature-tag">{feature}</span>
                    ))}
                  </div>
                  <div className="row" style={{marginTop: '16px'}}>
                    <Link className="btn primary" href={`/real-estate/${listing.slug}`}>
                      View Details
                    </Link>
                    <button className="btn" onClick={() => window.open('#consultation', '_self')}>
                      Schedule Tour
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div style={{textAlign: 'center', marginTop: '40px'}}>
            <Link className="btn" href="/real-estate/all">View All Properties</Link>
          </div>
        </section>

        {/* Investment Process */}
        <section className="section cta-section">
          <h2>Simple Investment Process</h2>
          <div className="process-steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Consultation</h3>
              <p>Free consultation to understand your investment goals</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Property Selection</h3>
              <p>We present curated properties matching your criteria</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Legal & Financing</h3>
              <p>Complete legal support and financing assistance</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>Management</h3>
              <p>Immediate rental management and guaranteed returns</p>
            </div>
          </div>
        </section>

        {/* Lead Capture Section */}
        <section className="section" id="consultation" style={{background: 'var(--light-bg)', borderRadius: '12px', padding: '60px 40px'}}>
          <div className="row" style={{gap: '40px', alignItems: 'center'}}>
            <div style={{flex: '1'}}>
              <h2>Ready to Start Investing?</h2>
              <p>Get personalized property recommendations and ROI projections</p>
              <ul>
                <li>Free market analysis</li>
                <li>Personalized investment strategy</li>
                <li>Exclusive pre-sale access</li>
                <li>Guaranteed management services</li>
              </ul>
            </div>
            <div style={{flex: '1', minWidth: '400px'}}>
              <LeadCaptureForm variant="detailed" />
            </div>
          </div>
        </section>
      </Container>
    </>
  );
}

