// eslint-disable-next-line no-unused-vars -- JSX member expressions are not tracked by the base rule.
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Calculator, CheckCircle2, TrendingUp } from 'lucide-react';

export default function AvoidFees() {
  return (
    <div className="min-h-screen bg-[#06121F] text-[#C9D2DE]">
      <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link to="/insights" className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-[#F2D98D] mb-8">
          <ArrowLeft size={18} /> Back to Insights
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">How to Offset Airbnb’s Host Fee</h1>
          <p className="text-xl text-[#D4AF37] font-semibold">Price for your target payout, not just the displayed nightly rate.</p>
        </motion.div>

        <div className="bg-[#0F2440] border border-[#D4AF37]/30 rounded-xl p-6 sm:p-8 my-10">
          <h2 className="text-2xl font-bold text-white mb-3">What changed?</h2>
          <p className="leading-relaxed">
            Airbnb is moving many hosts from a split service fee to a single fee deducted from the host payout.
            The single-fee structure is mandatory for most affected hosts, including software-connected hosts
            and hosts in countries where Airbnb requires it. Most hosts on this structure pay 15.5%; the
            exact rate can vary by listing and location. Disconnecting your property management software or
            switching to iCal is <strong className="text-white">not a reliable way to return to a 3% host fee</strong>.
          </p>
        </div>

        <section className="bg-white rounded-xl p-6 sm:p-8 my-8 text-[#334155]">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0A1A30] mb-5 flex items-center gap-3">
            <Calculator className="text-[#B89025] shrink-0" /> The math behind your nightly payout
          </h2>
          <p className="leading-relaxed mb-5">
            With a 15.5% single fee, a $100 booking subtotal leaves $84.50 before other costs.
            To receive a target of $100 after that fee, the starting calculation is
            <strong> $100 ÷ (1 − 0.155) = $118.34</strong> in guest-facing subtotal.
            Your actual price may need to account for cleaning and other host-added fees, taxes,
            discounts, and the fee shown in your Airbnb account.
          </p>
          <div className="bg-[#F8F5EF] border-l-4 border-[#D4AF37] rounded-r-lg p-5">
            <p className="font-semibold text-[#0A1A30] mb-2">If you previously listed at $100 under a 3% host fee:</p>
            <p>Your host payout was about $97 before other costs. At a 15.5% host fee,
              a guest-facing subtotal of about <strong>$114.80</strong> yields roughly the same $97 payout.
              This is an illustration, not a recommended price for every property.</p>
          </div>
        </section>

        <section className="bg-[#0F2440] border border-[#D4AF37]/25 rounded-xl p-6 sm:p-8 my-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <TrendingUp className="text-[#D4AF37] shrink-0" /> How IPM responds
          </h2>
          <ol className="space-y-5">
            {[
              ['Check the actual fee and target payout', 'We review your Airbnb transaction details and what you were earning per night before the change, including other fees and discounts.'],
              ['Compare your market', 'We look at nearby comparable properties, seasonality, occupancy, and the total price guests see—not only your old base rate.'],
              ['Apply the right markup, then test it', 'We adjust the nightly rate to account for the applicable host fee while remaining competitive. We monitor bookings, conversion, and net revenue and refine the rate as the market changes.'],
            ].map(([title, description], index) => (
              <li key={title} className="flex gap-4">
                <span className="flex items-center justify-center shrink-0 rounded-full bg-[#D4AF37] text-[#06121F] font-bold w-9 h-9">{index + 1}</span>
                <div><h3 className="font-bold text-white text-lg">{title}</h3><p className="leading-relaxed mt-1">{description}</p></div>
              </li>
            ))}
          </ol>
          <p className="mt-7 border-t border-[#D4AF37]/25 pt-5 text-sm leading-relaxed">
            A markup protects your payout only if guests still book. We cannot promise the same or higher
            net revenue for every listing; the goal is to preserve or improve your nightly payout where
            local demand supports the new guest-facing price.
          </p>
        </section>

        <aside className="text-sm leading-relaxed border border-[#D4AF37]/20 rounded-xl p-6 my-8">
          <p className="mb-2"><strong className="text-white">Reviewed by:</strong> IPM Operations &amp; Revenue Team</p>
          <p className="mb-2"><strong className="text-white">Last reviewed:</strong> <time dateTime="2026-09-27">September 27, 2026</time></p>
          <p><strong className="text-white">Sources:</strong>{' '}
            <a className="text-[#F2D98D] underline" href="https://www.airbnb.com/help/article/1857" target="_blank" rel="noopener noreferrer">Airbnb service fees for home hosts</a>
            {' · '}
            <a className="text-[#F2D98D] underline" href="https://www.airbnb.com/resources/hosting-homes/a/simplifying-service-fees-on-airbnb-771" target="_blank" rel="noopener noreferrer">Airbnb’s price-adjustment guidance</a>
          </p>
        </aside>

        <section className="bg-gradient-to-r from-[#D4AF37] to-[#F2D98D] rounded-2xl p-8 text-center text-[#06121F]">
          <CheckCircle2 className="mx-auto mb-3" size={32} aria-hidden="true" />
          <h2 className="text-3xl font-bold mb-3">Review your property’s pricing with IPM</h2>
          <p className="mb-6">We’ll look at your fee, target payout, and local market before recommending a rate.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-[#06121F] text-[#F2D98D] px-7 py-3 rounded-lg font-bold hover:bg-[#0A1A30]">
            Schedule a Consultation <ArrowRight size={18} />
          </Link>
        </section>
      </article>
    </div>
  );
}