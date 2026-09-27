import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, DollarSign, TrendingUp } from 'lucide-react';

export default function AirbnbFees() {
  return (
    <div className="min-h-screen bg-[#06121F] text-[#C9D2DE]">
      <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link to="/insights" className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-[#F2D98D] mb-8"><ArrowLeft size={18} /> Back to Insights</Link>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Airbnb Fees Explained</h1>
        <p className="text-xl text-[#D4AF37] font-semibold mb-10">What the updated host-paid fee means for your payout</p>

        <section className="bg-[#0F2440] border border-[#D4AF37]/25 rounded-xl p-6 sm:p-8 my-8">
          <h2 className="text-2xl font-bold text-white mb-4">Airbnb’s fee structure is changing</h2>
          <p className="leading-relaxed">
            Under the traditional split-fee structure, hosts typically paid about 3% while guests paid a
            separate service fee. Airbnb is transitioning affected listings to a single host-paid fee:
            the guest does not see a separate Airbnb service fee, and the full service fee is deducted
            from the host payout. Most hosts on the single-fee structure pay <strong className="text-white">15.5%</strong>;
            others typically pay 14%–16%, including 16% for listings in Brazil and Mexico.
            Airbnb still documents some split-fee listings, so check the actual fee on your account.
          </p>
        </section>

        <section className="bg-white text-[#334155] rounded-xl p-6 sm:p-8 my-8">
          <h2 className="text-2xl font-bold text-[#0A1A30] mb-5 flex items-center gap-3"><DollarSign className="text-[#B89025]" /> Compare the guest price and your payout</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="bg-[#F8F5EF] rounded-lg p-5">
              <h3 className="font-bold text-lg text-[#0A1A30] mb-2">Earlier split-fee example</h3>
              <p>$100 nightly subtotal − 3% host fee = <strong>$97 payout</strong> before other costs.
                A separate guest service fee could increase the total guests paid.</p>
            </div>
            <div className="bg-[#F8F5EF] rounded-lg p-5">
              <h3 className="font-bold text-lg text-[#0A1A30] mb-2">15.5% single-fee example</h3>
              <p>$115 guest-facing subtotal − 15.5% host fee = <strong>about $97.18 payout</strong> before other costs.
                The guest no longer sees a separate Airbnb service fee.</p>
            </div>
          </div>
          <p className="mt-5 leading-relaxed">
            These are illustrations, not a universal rate recommendation. Airbnb’s service-fee calculation can
            include host-added fees; discounts, taxes, and local rules can change the final amount.
          </p>
        </section>

        <section className="bg-[#0F2440] border border-[#D4AF37]/25 rounded-xl p-6 sm:p-8 my-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3"><TrendingUp className="text-[#D4AF37]" /> A better response than trying to bypass the fee</h2>
          <p className="leading-relaxed mb-5">
            Disconnecting an API or switching calendars does not guarantee a return to the old split-fee
            structure. IPM first checks the fee actually applied to your listing, then compares competing
            homes and local demand. We add a suitable percentage to the guest-facing nightly rate where the
            market supports it and keep monitoring occupancy and net payout.
          </p>
          <Link to="/insights/avoid-fees" className="inline-flex items-center gap-2 text-[#F2D98D] underline hover:text-white">
            See how IPM offsets the host fee <ArrowRight size={16} />
          </Link>
        </section>

        <aside className="text-sm border border-[#D4AF37]/20 rounded-xl p-6 my-8 leading-relaxed">
          <p><strong className="text-white">Last reviewed:</strong> <time dateTime="2026-09-27">September 27, 2026</time></p>
          <p className="mt-2"><strong className="text-white">Sources:</strong>{' '}
            <a className="text-[#F2D98D] underline" href="https://www.airbnb.com/help/article/1857" target="_blank" rel="noopener noreferrer">Airbnb service fees</a>
            {' · '}
            <a className="text-[#F2D98D] underline" href="https://www.airbnb.com/resources/hosting-homes/a/simplifying-service-fees-on-airbnb-771" target="_blank" rel="noopener noreferrer">Airbnb price-adjustment guidance</a>
          </p>
        </aside>
        <Link to="/contact" className="inline-flex items-center gap-2 bg-[#D4AF37] text-[#06121F] px-7 py-3 rounded-lg font-bold hover:bg-[#F2D98D]">Review My Pricing with IPM <ArrowRight size={18} /></Link>
      </article>
    </div>
  );
}