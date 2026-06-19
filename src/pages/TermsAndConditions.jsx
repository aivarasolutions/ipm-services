import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';

export default function TermsAndConditions() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const lastUpdated = 'June 2026';

  return (
    <div className="min-h-screen bg-[#F8F5EF]">
      {/* Hero */}
      <section className="bg-gradient-to-r from-[#06121F] to-[#0A1A30] text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10">
            <FileText className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-[#F2D98D] text-xs font-semibold tracking-[0.2em] uppercase">Legal</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Terms &amp; Conditions</h1>
          <p className="text-[#C9D2DE] text-lg">The terms that govern the use of our website and services.</p>
          <p className="text-[#C9D2DE]/70 text-sm mt-4">Last updated: {lastUpdated}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-[#0A1A30]/10 shadow-lg shadow-[#06121F]/5 p-8 md:p-12 space-y-10">

            <p className="text-[#334155] leading-relaxed">
              These Terms &amp; Conditions ("Terms") govern your use of the International Property Management
              ("IPM," "we," "us," or "our") website and the services we offer. By using our website or engaging
              our services, you agree to these Terms. Please read them carefully.
            </p>

            <div>
              <h2 className="font-display text-2xl font-bold text-[#0A1A30] mb-3">1. Use of the Website</h2>
              <p className="text-[#334155] leading-relaxed">
                You agree to use this website for lawful purposes only and not to misuse, disrupt, or attempt to
                gain unauthorized access to any part of the site. Content on this website is provided for general
                informational purposes and may be updated or changed without notice.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-[#0A1A30] mb-3">2. Property Management Inquiries and Owner Consultations</h2>
              <p className="text-[#334155] leading-relaxed">
                Submitting an inquiry or requesting an owner consultation does not create a management agreement.
                Any property management relationship is established only through a separate written agreement that
                defines the specific scope, fees, and responsibilities of both parties.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-[#0A1A30] mb-3">3. Listing Promotion and Multi-Platform Listing Services</h2>
              <p className="text-[#334155] leading-relaxed mb-3">
                IPM offers listing promotion and multi-platform listing support to help market properties across
                major booking platforms such as Airbnb, Booking.com, VRBO, Expedia, Hotels.com, and Google
                Vacation Rentals.
              </p>
              <ul className="space-y-2 text-[#334155] leading-relaxed list-disc pl-6">
                <li>Our listing and promotion service is available from a 10% commission.</li>
                <li>Full property management is available at 20% plus a competitive monthly fee.</li>
              </ul>
              <p className="text-[#334155] leading-relaxed mt-3">
                Exact pricing, inclusions, and terms are confirmed in your individual service agreement.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-[#0A1A30] mb-3">4. Reservations and Booking-Related Payments</h2>
              <p className="text-[#334155] leading-relaxed">
                Reservations may be subject to nightly rates, service fees, taxes, security deposits, and platform
                charges. Booking-related payments are processed through reputable third-party payment processors.
                Specific reservation terms, including amounts and due dates, are provided at the time of booking.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-[#0A1A30] mb-3">5. Deposits, Fees, Cancellations, Guest Rules, and Verification</h2>
              <p className="text-[#334155] leading-relaxed">
                Security deposits, fees, cancellation policies, house rules, damage responsibility, and identity
                or payment verification requirements may apply to a reservation where applicable. These conditions
                are communicated as part of the booking process and, where relevant, the policies of the booking
                platform used. Guests are responsible for damages beyond normal wear and tear.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-[#0A1A30] mb-3">6. Third-Party Platforms and Payment Processors</h2>
              <p className="text-[#334155] leading-relaxed">
                Some bookings, payments, and communications are handled through third-party platforms and payment
                processors (such as Airbnb, Booking.com, VRBO, Expedia, Hotels.com, Google Vacation Rentals,
                Stripe, WhatsApp, and email providers). Your use of those services is also subject to their own
                terms and policies, over which IPM has no control.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-[#0A1A30] mb-3">7. No Guarantee of Results</h2>
              <p className="text-[#334155] leading-relaxed">
                While we work to promote properties effectively, IPM does not guarantee any specific level of
                revenue, occupancy, booking volume, or financial result. Performance depends on many factors
                outside our control, including market conditions, seasonality, pricing, and platform policies.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-[#0A1A30] mb-3">8. Limitation of Liability</h2>
              <p className="text-[#334155] leading-relaxed">
                To the maximum extent permitted by law, IPM is not liable for any indirect, incidental, or
                consequential damages arising from the use of our website or services. Our services are provided
                on a reasonable-efforts basis, and nothing on this website constitutes a legal or financial
                guarantee.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-[#0A1A30] mb-3">9. Changes to These Terms</h2>
              <p className="text-[#334155] leading-relaxed">
                We may update these Terms from time to time. Any changes will be posted on this page, and your
                continued use of the website or services after changes are posted constitutes acceptance of the
                updated Terms.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-[#0A1A30] mb-3">10. Contact Information</h2>
              <p className="text-[#334155] leading-relaxed">
                For questions about these Terms, please contact International Property Management at{' '}
                <a href="mailto:info@richaf.global" className="text-[#B8932A] font-semibold hover:underline">info@richaf.global</a>{' '}
                or through our{' '}
                <Link to="/contact" className="text-[#B8932A] font-semibold hover:underline">Contact page</Link>.
              </p>
            </div>

            <div className="bg-[#F8F5EF] border border-[#D4AF37]/30 rounded-xl p-5">
              <p className="text-[#475569] text-sm leading-relaxed">
                <strong className="text-[#0A1A30]">Note:</strong> These Terms &amp; Conditions are provided as
                general website language for informational purposes and do not constitute legal advice. They may
                be updated from time to time, and any changes will be reflected on this page.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
