import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Link as LinkIcon, AlertCircle, DollarSign, Shield, ArrowLeft, X, Check } from 'lucide-react';

export default function ApiCosts() {
  return (
    <div className="min-h-screen bg-[#06121F]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link to="/insights" className="inline-flex items-center text-[#D4AF37] hover:text-[#F2D98D] mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Insights
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            API Connections & Hidden Costs
          </h1>
          <p className="text-xl text-[#D4AF37] font-semibold">
            Why Airbnb Charges More When You Connect Through a PMS — And What They Don't Tell You
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="prose prose-lg max-w-none"
        >
          <div className="bg-[#F8F5EF] border-l-4 border-[#D4AF37] p-6 rounded-r-lg mb-8">
            <p className="text-lg text-[#334155] m-0">
              Most hosts assume that using property management software (PMS) or a channel manager is
              always an upgrade. But Airbnb quietly classifies PMS-connected hosts differently — and
              charges them significantly more.
            </p>
          </div>

          <p className="text-[#C9D2DE] leading-relaxed">
            At IPM, we help hosts understand what Airbnb never explains publicly:
            your software connection can automatically trigger a <strong>15.5% fee structure</strong> — even if you didn't
            ask for it.
          </p>

          <section className="bg-white rounded-xl shadow-lg p-8 my-10">
            <h2 className="text-3xl font-bold text-[#0A1A30] mb-6 flex items-center gap-3">
              <LinkIcon className="w-8 h-8 text-[#D4AF37]" />
              What Is an API Connection — And Why It Matters
            </h2>
            <p className="text-[#334155] mb-4">
              An API connection is a direct data bridge between Airbnb and your software.
              This includes platforms like:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
              {['Lodgify', 'Guesty', 'Hostaway', 'OwnerRez', 'HostTools', 'Smoobu', 'Uplisting', 'Many more'].map((platform) => (
                <div key={platform} className="bg-[#D4AF37]/15 rounded-lg p-3 text-center text-[#0A1A30] font-medium">
                  {platform}
                </div>
              ))}
            </div>

            <p className="text-[#334155] mb-4">With API, your software can:</p>
            <ul className="space-y-2 text-[#334155]">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                <span>Push prices</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                <span>Sync calendars</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                <span>Update availability</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                <span>Create automated messages</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                <span>Manage unified inbox & reservations</span>
              </li>
            </ul>

            <div className="bg-red-50 rounded-lg p-6 mt-6">
              <p className="text-red-900 font-bold m-0">
                Sounds great — until you learn how Airbnb treats API-connected hosts.
              </p>
            </div>
          </section>

          <section className="bg-white rounded-xl shadow-lg p-8 my-10">
            <h2 className="text-3xl font-bold text-[#0A1A30] mb-6 flex items-center gap-3">
              <AlertCircle className="w-8 h-8 text-red-600" />
              How Airbnb Classifies Software-Connected Hosts
            </h2>
            <p className="text-[#334155] mb-6">
              When Airbnb detects ANY API connection, it immediately labels you as:
            </p>
            <div className="bg-[#F8F5EF] rounded-lg p-6 mb-6 text-center">
              <p className="text-2xl font-bold text-red-600">
                "Software-connected" = "Professional Host"
              </p>
            </div>

            <p className="text-[#334155] mb-4">This triggers a completely different pricing model:</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#F8F5EF] rounded-lg p-4 flex items-start gap-3">
                <X className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <span className="font-medium text-[#334155]">No guest service fee</span>
              </div>
              <div className="bg-[#F8F5EF] rounded-lg p-4 flex items-start gap-3">
                <X className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <span className="font-medium text-[#334155]">No option to opt out</span>
              </div>
              <div className="bg-[#F8F5EF] rounded-lg p-4 flex items-start gap-3">
                <Check className="w-6 h-6 text-[#D4AF37] flex-shrink-0 mt-1" />
                <span className="font-medium text-[#334155]">Host pays the ENTIRE service fee (14%–16%)</span>
              </div>
              <div className="bg-[#F8F5EF] rounded-lg p-4 flex items-start gap-3">
                <Check className="w-6 h-6 text-[#D4AF37] flex-shrink-0 mt-1" />
                <span className="font-medium text-[#334155]">Airbnb earns the same — just from YOU instead of the guest</span>
              </div>
            </div>

            <div className="bg-amber-100 border-l-4 border-amber-500 p-6 rounded-r-lg mt-6">
              <p className="text-lg font-bold text-amber-900 m-0">
                Airbnb sees this as: "Professional hosts should cover their own fees."
              </p>
              <p className="text-amber-900 mt-3 m-0">
                But here's the truth: Nothing about the guest experience changes. Nothing extra is provided to you. You just pay more — quietly.
              </p>
            </div>
          </section>

          <section className="bg-white rounded-xl shadow-lg p-8 my-10">
            <h2 className="text-3xl font-bold text-[#0A1A30] mb-6">
              What Airbnb Doesn't Tell You
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3 bg-red-50 rounded-lg p-4">
                <Check className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <p className="text-red-900 font-medium m-0">There is no setting to switch back</p>
              </div>
              <div className="flex items-start gap-3 bg-red-50 rounded-lg p-4">
                <Check className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <p className="text-red-900 font-medium m-0">Airbnb does not warn you when the fee changes</p>
              </div>
              <div className="flex items-start gap-3 bg-red-50 rounded-lg p-4">
                <Check className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <p className="text-red-900 font-medium m-0">Airbnb does not explain this anywhere obvious</p>
              </div>
              <div className="flex items-start gap-3 bg-red-50 rounded-lg p-4">
                <Check className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <p className="text-red-900 font-medium m-0">The PMS company cannot prevent it</p>
              </div>
              <div className="flex items-start gap-3 bg-red-50 rounded-lg p-4">
                <Check className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <p className="text-red-900 font-medium m-0">You can only return to the 3% model by disconnecting the API</p>
              </div>
            </div>

            <div className="bg-[#0A1A30] text-white rounded-lg p-6 mt-6">
              <p className="text-lg font-bold m-0">
                Airbnb's system is automatic. No human reviews it. No toggle exists.
              </p>
              <p className="mt-3 m-0 text-[#C9D2DE]">
                Once your listing becomes API-linked, Airbnb treats it like a hotel.
              </p>
            </div>
          </section>

          <section className="bg-white rounded-xl shadow-lg p-8 my-10">
            <h2 className="text-3xl font-bold text-[#0A1A30] mb-6 flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-red-600" />
              Why Hosts Lose Thousands Without Knowing
            </h2>
            <p className="text-[#334155] mb-6">Here's a simple example:</p>

            <div className="bg-[#F8F5EF] rounded-lg p-6 mb-6">
              <div className="space-y-3 text-lg text-[#334155]">
                <p>Booking subtotal: <strong>$2,000</strong></p>
                <p className="text-green-700">Old fee (3%): <strong>–$60</strong></p>
                <p className="text-red-700">API fee (15.5%): <strong>–$310</strong></p>
                <div className="border-t-2 border-red-200 pt-3 mt-3">
                  <p className="text-2xl font-bold text-red-600">Difference: –$250 loss per booking</p>
                </div>
              </div>
            </div>

            <div className="bg-red-600 text-white rounded-lg p-6">
              <p className="text-xl font-bold mb-4">Multiply that by:</p>
              <ul className="space-y-2">
                <li>4 bookings per month → <strong>$1,000 lost</strong></li>
                <li>12 months → <strong>$12,000 lost</strong></li>
                <li>Across 5 properties → <strong>$60,000 lost annually</strong></li>
              </ul>
              <p className="mt-6 text-lg">
                Most hosts never catch this because Airbnb doesn't label the fee clearly — it's buried inside the
                payout breakdown.
              </p>
            </div>
          </section>

          <section className="bg-white rounded-xl shadow-lg p-8 my-10">
            <h2 className="text-3xl font-bold text-[#0A1A30] mb-6">
              "But if I use a PMS, don't I GET more?"
            </h2>
            <p className="text-2xl font-bold text-red-600 mb-6">No.</p>
            <p className="text-[#334155] mb-6">
              Here's exactly what Airbnb gives PMS-connected hosts vs. regular hosts:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-[#334155]">
                <thead>
                  <tr className="bg-[#0A1A30] text-white">
                    <th className="border border-[#D4AF37]/25 p-4 text-left">Feature</th>
                    <th className="border border-[#D4AF37]/25 p-4 text-left">Regular Host</th>
                    <th className="border border-[#D4AF37]/25 p-4 text-left">API Host</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-[#D4AF37]/25 p-4 font-medium">Host fee</td>
                    <td className="border border-[#D4AF37]/25 p-4 bg-green-50">~3%</td>
                    <td className="border border-[#D4AF37]/25 p-4 bg-red-50">14–16%</td>
                  </tr>
                  <tr>
                    <td className="border border-[#D4AF37]/25 p-4 font-medium">Guest service fee</td>
                    <td className="border border-[#D4AF37]/25 p-4">Yes</td>
                    <td className="border border-[#D4AF37]/25 p-4">No</td>
                  </tr>
                  <tr>
                    <td className="border border-[#D4AF37]/25 p-4 font-medium">Airbnb support</td>
                    <td className="border border-[#D4AF37]/25 p-4">Same</td>
                    <td className="border border-[#D4AF37]/25 p-4">Same</td>
                  </tr>
                  <tr>
                    <td className="border border-[#D4AF37]/25 p-4 font-medium">Host protection (AirCover)</td>
                    <td className="border border-[#D4AF37]/25 p-4">Same</td>
                    <td className="border border-[#D4AF37]/25 p-4">Same</td>
                  </tr>
                  <tr>
                    <td className="border border-[#D4AF37]/25 p-4 font-medium">Guest visibility</td>
                    <td className="border border-[#D4AF37]/25 p-4">Same</td>
                    <td className="border border-[#D4AF37]/25 p-4">Same</td>
                  </tr>
                  <tr>
                    <td className="border border-[#D4AF37]/25 p-4 font-medium">Search ranking benefits</td>
                    <td className="border border-[#D4AF37]/25 p-4">Same</td>
                    <td className="border border-[#D4AF37]/25 p-4">Same</td>
                  </tr>
                  <tr>
                    <td className="border border-[#D4AF37]/25 p-4 font-medium">PMS features</td>
                    <td className="border border-[#D4AF37]/25 p-4">Provided by PMS, not Airbnb</td>
                    <td className="border border-[#D4AF37]/25 p-4">Provided by PMS, not Airbnb</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-red-100 rounded-lg p-6 mt-6 text-center">
              <p className="text-2xl font-bold text-red-900 m-0">
                You pay 5x more for the same service.
              </p>
            </div>
          </section>

          <section className="bg-white rounded-xl shadow-lg p-8 my-10">
            <h2 className="text-3xl font-bold text-[#0A1A30] mb-6">
              Key Takeaways
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <p className="text-[#334155] font-medium">API = 15.5%</p>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <p className="text-[#334155] font-medium">PMS → forces "host-only fee"</p>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <p className="text-[#334155] font-medium">No extra support, no extra features from Airbnb</p>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <p className="text-[#334155] font-medium">Airbnb earns the same money but charges YOU instead of the guest</p>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <p className="text-[#334155] font-medium">The only way back to 3% is disconnecting the API</p>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <p className="text-[#334155] font-medium">IPM helps implement the safer alternative</p>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-r from-[#D4AF37] to-[#F2D98D] rounded-2xl shadow-2xl p-8 text-center text-[#06121F] my-10">
            <h2 className="text-3xl font-bold mb-4">Book a Consultation with IPM</h2>
            <p className="text-lg mb-6 opacity-90">
              Optimize your property, reduce costs, and increase profits. Click below to get started.
            </p>
            <a
              href="#"
              className="inline-block bg-[#06121F] text-[#F2D98D] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#0A1A30] transition-colors shadow-lg"
            >
              Schedule a Call →
            </a>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
