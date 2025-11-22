import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { DollarSign, AlertTriangle, TrendingDown, CheckCircle, ArrowLeft } from 'lucide-react';

export default function AirbnbFees() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link to="/insights" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Insights
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Airbnb Fees Explained
          </h1>
          <p className="text-xl text-blue-600 font-semibold">
            Understanding the True Cost of Hosting — What Airbnb Doesn't Tell You
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="prose prose-lg max-w-none"
        >
          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg mb-8">
            <p className="text-lg text-slate-800 m-0">
              Most hosts believe Airbnb only takes a small percentage from each booking.
              In reality, depending on how your listings are set up, <strong>Airbnb may be taking 15.5% or more</strong> of
              your revenue before you even see your payout.
            </p>
          </div>

          <p className="text-slate-700 leading-relaxed">
            At IPM – International Property Management, we analyze Airbnb fee structures across hundreds
            of properties worldwide. This page explains the real fee models, how they affect your profits,
            and why many hosts unknowingly lose thousands per year.
          </p>

          <section className="bg-white rounded-xl shadow-lg p-8 my-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-blue-600" />
              The Two Airbnb Fee Models
            </h2>
            <p className="text-slate-700 mb-6">
              Airbnb uses two different service fee models, but they rarely explain how they apply to hosts:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
                <h3 className="text-2xl font-bold text-green-800 mb-4">A. Split-Fee Model (The Old Standard)</h3>
                <div className="space-y-3">
                  <p className="text-lg"><strong>Host pays:</strong> ~3%</p>
                  <p className="text-lg"><strong>Guest pays:</strong> ~12–15%</p>
                </div>
                <p className="text-slate-700 mt-4">
                  This was the traditional system where guests pay a large "Airbnb service fee" and hosts pay a smaller "host service fee." Everyone shares the cost.
                </p>
                <p className="text-green-800 font-semibold mt-3">
                  ✓ Most hosts prefer this model because the host's fee is low and predictable.
                </p>
              </div>

              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
                <h3 className="text-2xl font-bold text-red-800 mb-4">B. Host-Only Fee Model (15.5%+)</h3>
                <div className="space-y-3">
                  <p className="text-lg"><strong>Host pays:</strong> 14–16%</p>
                  <p className="text-lg"><strong>Guest pays:</strong> 0%</p>
                </div>
                <p className="text-slate-700 mt-4">
                  This is the model Airbnb automatically applies to:
                </p>
                <ul className="list-disc list-inside text-slate-700 mt-3 space-y-1">
                  <li>Hosts who use API-connected software</li>
                  <li>Property managers using PMS platforms</li>
                  <li>Software-connected listings (Lodgify, Guesty, Hostaway, etc.)</li>
                </ul>
              </div>
            </div>

            <div className="bg-red-100 border-l-4 border-red-500 p-6 rounded-r-lg">
              <p className="text-red-900 font-bold text-lg m-0">
                ⚠️ What Airbnb doesn't advertise: Hosts pay 5x more under this model.
              </p>
              <p className="text-red-900 mt-3 m-0">
                If you use ANY software that connects to Airbnb via API, Airbnb forces you into this high-fee
                structure — with no option to switch back unless you disconnect the API entirely.
              </p>
            </div>
          </section>

          <section className="bg-white rounded-xl shadow-lg p-8 my-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-amber-600" />
              Why Airbnb Charges More When You Use a PMS
            </h2>
            <p className="text-slate-700 mb-4">
              Here's the direct truth most hosts never hear:
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-slate-800 font-semibold">Airbnb classifies API-connected hosts as "professional hosts"</p>
                  <p className="text-slate-600">→ Therefore, they shift the entire service fee onto the host.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-slate-800 font-semibold">Airbnb wants guests to see "no service fee"</p>
                  <p className="text-slate-600">→ Cleaner pricing for guests, higher conversion rates for Airbnb.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-slate-800 font-semibold">Airbnb still wants to earn the same total revenue</p>
                  <p className="text-slate-600">→ So the host absorbs the cost.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-slate-800 font-semibold">Airbnb does not provide extra support for the higher fee</p>
                  <p className="text-slate-600">→ No additional services, no extra protection, no higher priority.</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-100 rounded-lg p-6 mt-6">
              <p className="text-xl font-bold text-slate-900">
                The result? Hosts pay dramatically more for the exact same Airbnb features.
              </p>
            </div>
          </section>

          <section className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl shadow-lg p-8 my-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <TrendingDown className="w-8 h-8 text-red-600" />
              Your Payout Under Each Model (Real Numbers, Real Loss)
            </h2>
            <p className="text-slate-700 mb-4">If a booking is:</p>
            <div className="bg-white rounded-lg p-6 mb-6">
              <ul className="space-y-2 text-lg">
                <li>Nightly rate: <strong>$1,446</strong></li>
                <li>Cleaning fee: <strong>$170</strong></li>
                <li>Extra guests: <strong>$240</strong></li>
                <li>Pet fee: <strong>$300</strong></li>
                <li className="pt-3 border-t-2 border-slate-200">Total host earnings: <strong>$2,156</strong></li>
              </ul>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-100 border-2 border-green-400 rounded-lg p-6">
                <h3 className="text-xl font-bold text-green-800 mb-3">Under the 3% model:</h3>
                <p className="text-lg">Host fee: <strong className="text-red-600">–$64.68</strong></p>
                <p className="text-2xl font-bold text-green-800 mt-2">Payout: $2,091.32</p>
              </div>

              <div className="bg-red-100 border-2 border-red-400 rounded-lg p-6">
                <h3 className="text-xl font-bold text-red-800 mb-3">Under the 15.5% host-only model:</h3>
                <p className="text-lg">Host fee: <strong className="text-red-600">–$334.18</strong></p>
                <p className="text-2xl font-bold text-red-800 mt-2">Payout: $1,821.82</p>
              </div>
            </div>

            <div className="bg-red-600 text-white rounded-lg p-6 mt-6 text-center">
              <p className="text-3xl font-bold">You lose $269 PER BOOKING</p>
              <p className="text-lg mt-3">
                Multiply that across 10–20 bookings a month, and most hosts lose <strong>$3,000–$8,000 per property
                per year</strong> — often without realizing it.
              </p>
            </div>
          </section>

          <section className="bg-white rounded-xl shadow-lg p-8 my-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Key Takeaways for Hosts
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <p className="text-slate-800 font-medium">If you use an API-connected PMS → Airbnb charges you 15.5%</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <p className="text-slate-800 font-medium">If you disconnect and use iCal → your fee drops back to 3%</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <p className="text-slate-800 font-medium">Airbnb does NOT provide extra support for the higher fee</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <p className="text-slate-800 font-medium">Most hosts lose thousands per year without knowing</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <p className="text-slate-800 font-medium">There are safer, smarter ways to run your property without an API</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <p className="text-slate-800 font-medium">IPM can set up the entire system for you</p>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-2xl p-8 text-center text-white my-10">
            <h2 className="text-3xl font-bold mb-4">Book a Consultation with IPM</h2>
            <p className="text-lg mb-6 opacity-90">
              Optimize your property, reduce costs, and increase profits. Click below to get started.
            </p>
            <a
              href="#"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg"
            >
              Schedule a Call →
            </a>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
