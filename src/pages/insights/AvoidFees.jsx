import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, CheckCircle, ArrowLeft, AlertTriangle, TrendingUp } from 'lucide-react';

export default function AvoidFees() {
  const steps = [
    {
      number: 1,
      title: 'Disconnect your PMS API',
      description: 'Inside your PMS dashboard (e.g., Lodgify, Guesty, Hostaway), disable the Airbnb API connection for each listing.',
      result: 'Airbnb will immediately remove the "software-connected" label, return your listing to the classic 3% fee model, re-enable guest service fees, and stop charging 15.5% on your side.'
    },
    {
      number: 2,
      title: 'Rebuild your connection using iCal',
      description: 'iCal provides calendar sync, basic availability updates, and double-booking protection (as long as you sync frequently).',
      details: ['Copy Airbnb\'s iCal link', 'Paste into your website or PMS (Lodgify iCal import)', 'Import your PMS iCal link back into Airbnb'],
      result: 'This creates a two-way calendar sync without API fees.'
    },
    {
      number: 3,
      title: 'Replace PMS-level automations with direct systems',
      description: 'Because the API will be gone, you must replace: automated guest messages, unified inbox, guest detail collection, and check-in workflow.',
      tools: ['Airbnb scheduled messages', 'Mailchimp forms', 'Website check-in pages', 'Zapier / Make automations', 'Email parsers', 'Calendar event triggers'],
      note: '(This is exactly what IPM teaches hosts during consultations.)'
    },
    {
      number: 4,
      title: 'Verify the Fee Change',
      description: 'Inside Airbnb → Transaction History: Your next booking under iCal will show "Host Fee: 3%"',
      result: 'The change is immediate and permanent as long as you avoid reconnecting any API tool.'
    }
  ];

  const keepsFeatures = ['Reviews', 'Listing rank', 'Amenities', 'Instant Book', 'Host protections', 'Calendar visibility', 'Search placement'];
  
  const fears = [
    { fear: '"Will my listing be penalized?"', truth: 'No. Airbnb does not punish hosts for removing API connections.' },
    { fear: '"Will my bookings drop?"', truth: 'No. In fact, your prices become more competitive.' },
    { fear: '"Will I lose messages?"', truth: 'No. Airbnb messaging stays inside Airbnb.' },
    { fear: '"Will my PMS stop working?"', truth: 'Only the automated sync features change — not your entire workflow.' }
  ];

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
            How to Avoid Airbnb's 15.5% Host-Only Fee
          </h1>
          <p className="text-xl text-green-600 font-semibold">
            The Proven Method to Return to the 3% Fee Structure
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="prose prose-lg max-w-none"
        >
          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-8">
            <p className="text-lg font-bold text-green-900 m-0">Good news:</p>
            <p className="text-lg text-slate-800 mt-3 m-0">
              Most hosts can get back to the 3% Airbnb fee — but only if they disconnect their PMS API and
              follow the correct steps.
            </p>
          </div>

          <p className="text-slate-700 leading-relaxed">
            At IPM, we help hosts transition safely without losing automation, without risking double
            bookings, and without violating Airbnb's system. Here's exactly how it works.
          </p>

          <section className="bg-white rounded-xl shadow-lg p-8 my-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-amber-600" />
              Understand What Actually Triggers the 15.5% Fee
            </h2>
            <p className="text-slate-700 mb-4">The fee is NOT based on:</p>
            <ul className="space-y-2 mb-6">
              <li className="text-slate-600">Your host rating</li>
              <li className="text-slate-600">Your booking volume</li>
              <li className="text-slate-600">Your property type</li>
              <li className="text-slate-600">Your location</li>
            </ul>

            <p className="text-slate-700 mb-4">It is triggered by one thing only:</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-red-100 border-2 border-red-400 rounded-lg p-6 text-center">
                <p className="text-xl font-bold text-red-800 m-0">API CONNECTION =</p>
                <p className="text-2xl font-bold text-red-600 mt-2">HOST-ONLY FEE</p>
              </div>
              <div className="bg-green-100 border-2 border-green-400 rounded-lg p-6 text-center">
                <p className="text-xl font-bold text-green-800 m-0">iCal CONNECTION =</p>
                <p className="text-2xl font-bold text-green-600 mt-2">REGULAR 3% FEE</p>
              </div>
            </div>

            <div className="bg-slate-100 rounded-lg p-6 mt-6">
              <p className="text-lg font-medium text-slate-800 m-0">
                Airbnb sees API as "professional hosting." iCal is treated as "manual hosting." Only iCal allows the standard 3% model.
              </p>
            </div>
          </section>

          <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg p-8 my-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              <Shield className="w-8 h-8 text-green-600" />
              How to Switch Back to the 3% Fee (Step-by-Step)
            </h2>

            <div className="space-y-8">
              {steps.map((step, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                      {step.number}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-slate-900 mb-3">{step.title}</h3>
                      <p className="text-slate-700 mb-3">{step.description}</p>
                      
                      {step.details && (
                        <ul className="space-y-2 mb-3">
                          {step.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                              <span className="text-slate-700">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      
                      {step.tools && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
                          {step.tools.map((tool, idx) => (
                            <div key={idx} className="bg-blue-50 rounded-lg p-3 text-sm text-center text-slate-800 font-medium">
                              {tool}
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {step.note && (
                        <p className="text-sm italic text-slate-600 mb-3">{step.note}</p>
                      )}
                      
                      {step.result && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                          <p className="text-green-900 font-medium m-0">
                            <strong>Result:</strong> {step.result}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-xl shadow-lg p-8 my-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-green-600" />
              What Changes Immediately
            </h2>
            <p className="text-slate-700 mb-6">After disconnecting API:</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 rounded-lg p-4 flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <span className="font-medium text-slate-800">Host fee drops from 15.5% → ~3%</span>
              </div>
              <div className="bg-green-50 rounded-lg p-4 flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <span className="font-medium text-slate-800">Guest service fee returns to the guest</span>
              </div>
              <div className="bg-green-50 rounded-lg p-4 flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <span className="font-medium text-slate-800">Payouts increase significantly</span>
              </div>
              <div className="bg-green-50 rounded-lg p-4 flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <span className="font-medium text-slate-800">Airbnb considers you a "regular" host again</span>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl shadow-lg p-8 my-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              What Stays the Same
            </h2>
            <p className="text-lg font-bold text-green-800 mb-4">You KEEP:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {keepsFeatures.map((feature, index) => (
                <div key={index} className="bg-white rounded-lg p-4 text-center shadow-md">
                  <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <span className="text-slate-800 font-medium text-sm">{feature}</span>
                </div>
              ))}
            </div>
            <div className="bg-green-600 text-white rounded-lg p-6 mt-6 text-center">
              <p className="text-2xl font-bold m-0">
                You lose NOTHING important.
              </p>
            </div>
          </section>

          <section className="bg-white rounded-xl shadow-lg p-8 my-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Common Fears — And the Real Truth
            </h2>
            <div className="space-y-4">
              {fears.map((item, index) => (
                <div key={index} className="bg-slate-50 rounded-lg p-6">
                  <p className="text-xl font-bold text-red-600 mb-3">{item.fear}</p>
                  <p className="text-lg font-medium text-green-700 m-0">{item.truth}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-xl shadow-lg p-8 my-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Key Takeaways
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <p className="text-slate-800 font-medium">API triggers the 15.5% host-only fee</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <p className="text-slate-800 font-medium">Switching to iCal restores the 3% fee instantly</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <p className="text-slate-800 font-medium">Your listing is NOT penalized</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <p className="text-slate-800 font-medium">Your payouts increase dramatically</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <p className="text-slate-800 font-medium">IPM can set up the new workflow for you</p>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl shadow-2xl p-8 text-center text-white my-10">
            <h2 className="text-3xl font-bold mb-4">Book a Consultation with IPM</h2>
            <p className="text-lg mb-6 opacity-90">
              Optimize your property, reduce costs, and increase profits. Click below to get started.
            </p>
            <a
              href="#"
              className="inline-block bg-white text-green-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-50 transition-colors shadow-lg"
            >
              Schedule a Call →
            </a>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
