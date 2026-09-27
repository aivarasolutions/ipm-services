import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Link as LinkIcon, TrendingUp } from 'lucide-react';

export default function ApiCosts() {
  return (
    <div className="min-h-screen bg-[#06121F] text-[#C9D2DE]">
      <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link to="/insights" className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-[#F2D98D] mb-8"><ArrowLeft size={18} /> Back to Insights</Link>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">API Connections &amp; Operating Costs</h1>
        <p className="text-xl text-[#D4AF37] font-semibold mb-10">Evaluate software for the work it does—not as a fee loophole.</p>

        <section className="bg-[#0F2440] border border-[#D4AF37]/25 rounded-xl p-6 sm:p-8 my-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3"><LinkIcon className="text-[#D4AF37]" /> What an API connection does</h2>
          <p className="leading-relaxed">
            A property management system or channel manager can keep prices and calendars in sync, centralize
            reservations and messages, and save work across channels. Software subscriptions and operational
            tradeoffs matter, but an Airbnb API connection is no longer the sole explanation for a
            15.5% host-paid service fee. Airbnb now requires the single-fee structure for many hosts,
            including software-connected hosts and hosts in affected countries.
          </p>
        </section>

        <section className="bg-white text-[#334155] rounded-xl p-6 sm:p-8 my-8">
          <h2 className="text-2xl font-bold text-[#0A1A30] mb-4">What to include in a real cost comparison</h2>
          <ul className="space-y-3 list-disc pl-6 leading-relaxed">
            <li>The Airbnb service-fee percentage actually charged on each listing (typically 15.5% under the single-fee structure, but exceptions apply).</li>
            <li>Software subscriptions, setup costs, and any channel-specific commissions.</li>
            <li>Time saved through automation and the risk of errors or double bookings without it.</li>
            <li>What guests see in comparable listings and what you keep after all fees.</li>
          </ul>
          <div className="bg-[#F8F5EF] border-l-4 border-[#D4AF37] p-5 mt-6 rounded-r-lg">
            <p><strong>Example:</strong> A $2,000 booking subtotal at a 15.5% Airbnb host fee produces a $1,690
              payout before other costs. A PMS subscription is a separate expense. Removing your API
              connection does not guarantee the host fee will fall to 3%.</p>
          </div>
        </section>

        <section className="bg-[#0F2440] border border-[#D4AF37]/25 rounded-xl p-6 sm:p-8 my-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3"><TrendingUp className="text-[#D4AF37]" /> IPM’s approach</h2>
          <p className="leading-relaxed mb-4">
            We keep the tools that make your operation reliable and price the listing based on its market,
            season, and target net payout. Where comparable properties and demand support it, we apply the
            appropriate nightly-rate markup and check whether occupancy and actual payouts hold up.
          </p>
          <Link to="/insights/avoid-fees" className="inline-flex items-center gap-2 text-[#F2D98D] underline hover:text-white">See the host-fee pricing strategy <ArrowRight size={16} /></Link>
        </section>

        <aside className="text-sm border border-[#D4AF37]/20 rounded-xl p-6 my-8 leading-relaxed">
          <p><strong className="text-white">Last reviewed:</strong> <time dateTime="2026-09-27">September 27, 2026</time></p>
          <p className="mt-2"><strong className="text-white">Sources:</strong>{' '}
            <a className="text-[#F2D98D] underline" href="https://www.airbnb.com/help/article/1857" target="_blank" rel="noopener noreferrer">Airbnb service fees</a>
            {' · '}
            <a className="text-[#F2D98D] underline" href="https://www.airbnb.com/resources/hosting-homes/a/simplifying-service-fees-on-airbnb-771" target="_blank" rel="noopener noreferrer">Airbnb price-adjustment guidance</a>
          </p>
        </aside>
        <Link to="/contact" className="inline-flex items-center gap-2 bg-[#D4AF37] text-[#06121F] px-7 py-3 rounded-lg font-bold hover:bg-[#F2D98D]">Review My Listing with IPM <ArrowRight size={18} /></Link>
      </article>
    </div>
  );
}