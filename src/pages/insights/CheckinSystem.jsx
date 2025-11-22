import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Smartphone, CheckCircle, ArrowLeft, XCircle, Users, Mail, Calendar } from 'lucide-react';

export default function CheckinSystem() {
  const problems = [
    'Automation breaks when API breaks',
    'Airbnb messages become unreliable',
    'Guests receive duplicate messages',
    'Hosts lose control of branding',
    'PMS fees compound with Airbnb fees',
    'Direct integrations are limited'
  ];

  const advantages = [
    { text: 'You keep 97% of your Airbnb payout', subtext: '(no 15.5% fee)' },
    { text: 'Messages come directly from Airbnb', subtext: '(highest delivery rate, no duplicates)' },
    { text: 'Your branding stays on your website', subtext: '(not a PMS-branded portal)' },
    { text: 'Your form captures only what you need', subtext: '(no long forms, no friction)' },
    { text: 'You own your guest data', subtext: '(can use in Mailchimp, your CRM, etc.)' },
    { text: 'System is durable and platform-independent', subtext: '(no vendor lock-in, no PMS outages)' }
  ];

  const guestSteps = [
    { num: '1️⃣', text: 'Book the property' },
    { num: '2️⃣', text: 'Immediately receive an Airbnb message with your website link' },
    { num: '3️⃣', text: 'Click the link' },
    { num: '4️⃣', text: 'Fill your simple 3-field form' },
    { num: '5️⃣', text: 'Receive your automated check-in instructions (email or Airbnb message)' },
    { num: '6️⃣', text: 'Experience a professional, smooth entry process' }
  ];

  const systemAdvantages = [
    'Eliminates PMS dependency',
    'Works with Airbnb + Booking.com + Vrbo',
    'Seamless across all platforms',
    'No risk of Airbnb API fee trigger',
    'Ability to add videos, photos, maps, door codes',
    'Totally customizable to your brand',
    'Scales to 1 or 100 properties'
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
            Check-In System Design (IPM Method)
          </h1>
          <p className="text-xl text-purple-600 font-semibold">
            A Modern, API-Free Guest Workflow That Keeps Your Operations Professional
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="prose prose-lg max-w-none"
        >
          <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-lg mb-8">
            <p className="text-lg text-slate-800 m-0">
              Disconnecting your PMS API doesn't mean losing automation.
            </p>
            <p className="text-lg text-slate-800 mt-3 m-0">
              In fact, IPM teaches hosts how to build a <strong>cleaner, more reliable, and more flexible check-in
              system</strong> that works everywhere — without paying Airbnb 15.5% or relying on PMS limitations.
            </p>
          </div>

          <p className="text-slate-700 leading-relaxed">
            This page explains the IPM check-in method used by top-performing hosts.
          </p>

          <section className="bg-white rounded-xl shadow-lg p-8 my-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <XCircle className="w-8 h-8 text-red-600" />
              The Problem With PMS-Dependent Check-In Systems
            </h2>
            <p className="text-slate-700 mb-6">When hosts rely on PMS API:</p>
            <div className="grid md:grid-cols-2 gap-4">
              {problems.map((problem, index) => (
                <div key={index} className="bg-red-50 rounded-lg p-4 flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                  <span className="text-slate-800">{problem}</span>
                </div>
              ))}
            </div>
            <div className="bg-slate-900 text-white rounded-lg p-6 mt-6">
              <p className="text-lg font-bold m-0">
                API setups create fragile systems.
              </p>
              <p className="mt-3 m-0">
                IPM designs independent systems that you fully control.
              </p>
            </div>
          </section>

          <section className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl shadow-lg p-8 my-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <Smartphone className="w-8 h-8 text-purple-600" />
              IPM's API-Free Check-In Framework
            </h2>
            <p className="text-slate-700 mb-6">Your check-in system should include:</p>

            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-purple-500">
                <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Mail className="w-6 h-6 text-purple-600" />
                  An automated message from Airbnb
                </h3>
                <p className="text-slate-700">
                  <strong>Trigger:</strong> "Reservation Confirmed"
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-blue-500">
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  A link to your website's check-in page
                </h3>
                <p className="text-slate-700 mb-2">Example:</p>
                <code className="bg-slate-100 px-4 py-2 rounded text-blue-600 font-mono">
                  https://ipm.services/check-in/listing-name
                </code>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-green-500">
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  A Mailchimp (or Typeform/JotForm) embedded form
                </h3>
                <p className="text-slate-700 mb-3">Collect only:</p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Name</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Email</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Phone</span>
                  </li>
                </ul>
                <p className="text-slate-600 text-sm mt-3 italic">
                  (Nothing else — Airbnb already gave you the rest)
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-amber-500">
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  A simple matching key
                </h3>
                <p className="text-slate-700 mb-3">
                  For guests who struggle with reservation codes, IPM uses:
                </p>
                <div className="space-y-2">
                  <div className="bg-amber-50 rounded p-3">
                    <strong>Last Name + Check-In Date</strong>
                  </div>
                  <div className="text-center text-slate-500 font-bold">OR</div>
                  <div className="bg-amber-50 rounded p-3">
                    <strong>Phone Number</strong>
                  </div>
                  <div className="text-center text-slate-500 font-bold">OR</div>
                  <div className="bg-amber-50 rounded p-3">
                    <strong>Reservation Code</strong> (optional)
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-indigo-500">
                <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-indigo-600" />
                  A backend data sync
                </h3>
                <p className="text-slate-700 mb-3">Tool options:</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['Mailchimp', 'Zapier or Make', 'MailParser or Parseur', 'Airtable or Google Sheets'].map((tool) => (
                    <div key={tool} className="bg-indigo-50 rounded p-3 text-center text-sm font-medium">
                      {tool}
                    </div>
                  ))}
                </div>
                <p className="text-slate-700 mt-4">
                  This creates a unified guest profile without needing PMS data.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-xl shadow-lg p-8 my-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Why This Method Works Better Than PMS Automation
            </h2>
            <div className="space-y-4">
              {advantages.map((advantage, index) => (
                <div key={index} className="bg-green-50 rounded-lg p-4">
                  <p className="text-lg font-bold text-green-800 m-0">✓ {advantage.text}</p>
                  <p className="text-green-700 mt-1 m-0">{advantage.subtext}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl shadow-lg p-8 my-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <Users className="w-8 h-8 text-blue-600" />
              How Guests Experience the System
            </h2>
            <p className="text-slate-700 mb-6">Your guests will:</p>
            <div className="space-y-3">
              {guestSteps.map((step, index) => (
                <div key={index} className="bg-white rounded-lg p-4 flex items-center gap-4 shadow-md">
                  <span className="text-3xl">{step.num}</span>
                  <span className="text-lg text-slate-800">{step.text}</span>
                </div>
              ))}
            </div>
            <div className="bg-blue-600 text-white rounded-lg p-6 mt-6 text-center">
              <p className="text-xl font-bold m-0">
                They don't feel the backend work — they experience polished simplicity.
              </p>
            </div>
          </section>

          <section className="bg-white rounded-xl shadow-lg p-8 my-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              IPM Check-In System Advantages
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {systemAdvantages.map((advantage, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                  <span className="text-slate-800 font-medium">{advantage}</span>
                </div>
              ))}
            </div>
            <div className="bg-purple-100 border-l-4 border-purple-500 p-6 rounded-r-lg mt-6">
              <p className="text-lg font-bold text-purple-900 m-0">
                This is the system professional hosts use, and it gives you operational control while reducing costs.
              </p>
            </div>
          </section>

          <section className="bg-white rounded-xl shadow-lg p-8 my-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Key Takeaways
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <p className="text-slate-800 font-medium">Use Airbnb automated messages → link to your site</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <p className="text-slate-800 font-medium">Use Mailchimp/Typeform forms → collect guest info</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <p className="text-slate-800 font-medium">Use simple matching keys → no confusion</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <p className="text-slate-800 font-medium">Use Zapier/Make → unify booking + guest data</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <p className="text-slate-800 font-medium">Use IPM → build, install, and optimize the whole system</p>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl shadow-2xl p-8 text-center text-white my-10">
            <h2 className="text-3xl font-bold mb-4">Book a Consultation with IPM</h2>
            <p className="text-lg mb-6 opacity-90">
              Optimize your property, reduce costs, and increase profits. Click below to get started.
            </p>
            <a
              href="#"
              className="inline-block bg-white text-purple-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-purple-50 transition-colors shadow-lg"
            >
              Schedule a Call →
            </a>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
