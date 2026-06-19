import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

export default function PrivacyPolicy() {
  const lastUpdated = 'June 2026';

  return (
    <div className="min-h-screen bg-[#F8F5EF]">
      {/* Hero */}
      <section className="bg-gradient-to-r from-[#06121F] to-[#0A1A30] text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10">
            <Shield className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-[#F2D98D] text-xs font-semibold tracking-[0.2em] uppercase">Legal</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-[#C9D2DE] text-lg">How International Property Management collects, uses, and protects your information.</p>
          <p className="text-[#C9D2DE]/70 text-sm mt-4">Last updated: {lastUpdated}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-[#0A1A30]/10 shadow-lg shadow-[#06121F]/5 p-8 md:p-12 space-y-10">

            <p className="text-[#334155] leading-relaxed">
              International Property Management ("IPM," "we," "us," or "our") respects your privacy and is
              committed to protecting the personal information you share with us. This Privacy Policy explains
              what information we collect, how we use it, and the choices you have. It applies to our website,
              forms, and the property management and vacation rental services we provide.
            </p>

            <div>
              <h2 className="font-display text-2xl font-bold text-[#0A1A30] mb-3">1. Information We Collect</h2>
              <p className="text-[#334155] leading-relaxed mb-3">
                We may collect the following information when you interact with us:
              </p>
              <ul className="space-y-2 text-[#334155] leading-relaxed list-disc pl-6">
                <li>Contact details (name, email, phone number) submitted through website forms, property management inquiries, or owner consultations.</li>
                <li>Details related to vacation rental reservations and booking requests.</li>
                <li>Owner lead information, such as property details and management preferences.</li>
                <li>Guest communication records related to stays, support, and inquiries.</li>
                <li>Payment and deposit information processed through secure third-party payment processors.</li>
                <li>Identification, security deposit, or payment verification information where applicable for bookings and damage protection.</li>
                <li>Technical and usage data such as cookies and analytics, where used (see Section 5).</li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-[#0A1A30] mb-3">2. How We Use Your Information</h2>
              <ul className="space-y-2 text-[#334155] leading-relaxed list-disc pl-6">
                <li>Respond to property management inquiries, owner leads, and consultation requests.</li>
                <li>Process and manage vacation rental reservations, payments, and deposits.</li>
                <li>Communicate with guests and owners before, during, and after a stay.</li>
                <li>Verify identity, payment, or deposit details where required for a booking.</li>
                <li>Improve our website, services, and customer experience.</li>
                <li>Send relevant updates about our services when you have requested them.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-[#0A1A30] mb-3">3. Payments and Deposits</h2>
              <p className="text-[#334155] leading-relaxed">
                Payments, security deposits, and related transactions are handled through reputable third-party
                payment processors. We do not store full card numbers on our own systems. Any verification
                information collected for a booking, deposit, or damage protection is used only for that purpose
                and handled with reasonable care.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-[#0A1A30] mb-3">4. Third-Party Platforms and Service Providers</h2>
              <p className="text-[#334155] leading-relaxed mb-3">
                To provide our services we work with trusted third parties. Information may be shared with or
                processed by these platforms in accordance with their own privacy policies:
              </p>
              <ul className="space-y-2 text-[#334155] leading-relaxed list-disc pl-6">
                <li>Booking and listing platforms such as Airbnb, Booking.com, VRBO, Expedia, Hotels.com, and Google Vacation Rentals.</li>
                <li>Payment processors such as Stripe and other payment providers.</li>
                <li>Communication tools such as WhatsApp and email service providers.</li>
                <li>Analytics tools and website hosting providers.</li>
              </ul>
              <p className="text-[#334155] leading-relaxed mt-3">
                We do not sell your personal information.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-[#0A1A30] mb-3">5. Cookies and Analytics</h2>
              <p className="text-[#334155] leading-relaxed">
                Our website may use cookies and analytics tools to understand how visitors use the site and to
                improve performance and content. You can usually control or disable cookies through your browser
                settings. Disabling cookies may affect some website functionality.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-[#0A1A30] mb-3">6. Data Retention and Security</h2>
              <p className="text-[#334155] leading-relaxed">
                We retain personal information only as long as necessary to provide our services and meet legal
                or operational requirements. We take reasonable measures to protect your information, though no
                method of transmission or storage is completely secure.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-[#0A1A30] mb-3">7. Your Choices</h2>
              <p className="text-[#334155] leading-relaxed">
                You may request access to, correction of, or deletion of your personal information, and you may
                opt out of non-essential communications at any time by contacting us using the details below.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-[#0A1A30] mb-3">8. Contact Us</h2>
              <p className="text-[#334155] leading-relaxed">
                If you have questions about this Privacy Policy or how your information is handled, please contact
                International Property Management at{' '}
                <a href="mailto:info@richaf.global" className="text-[#B8932A] font-semibold hover:underline">info@richaf.global</a>{' '}
                or through our{' '}
                <Link to="/contact" className="text-[#B8932A] font-semibold hover:underline">Contact page</Link>.
              </p>
            </div>

            <div className="bg-[#F8F5EF] border border-[#D4AF37]/30 rounded-xl p-5">
              <p className="text-[#475569] text-sm leading-relaxed">
                <strong className="text-[#0A1A30]">Note:</strong> This Privacy Policy is provided as general
                website language for informational purposes and does not constitute legal advice. It may be
                updated from time to time, and any changes will be reflected on this page.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
