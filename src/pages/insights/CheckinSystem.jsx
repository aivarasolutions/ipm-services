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
    <div className="min-h-screen bg-gradient-to-b from-[#050505] to-[#111111]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link to="/insights" className="inline-flex items-center text-[#D4AF37] hover:text-[#E6C978] mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Insights
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#F8F8F8] mb-4">
            Check-In System Design (IPM Method)
          </h1>
          <p className="text-xl text-[#D4AF37] font-semibold">
            A Modern, API-Free Guest Workflow That Keeps Your Operations Professional
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="prose prose-lg max-w-none"
        >
          <div className="bg-[#D4AF37]/10 border-l-4 border-[#D4AF37] p-6 rounded-r-lg mb-8">
            <p className="text-lg text-[#CFCFCF] m-0">
              Disconnecting your PMS API doesn't mean losing automation.
            </p>
            <p className="text-lg text-[#CFCFCF] mt-3 m-0">
              In fact, IPM teaches hosts how to build a <strong>cleaner, more reliable, and more flexible check-in
              system</strong> that works everywhere — without paying Airbnb 15.5% or relying on PMS limitations.
            </p>
          </div>

          <p className="text-[#B8B8B8] leading-relaxed">
            This page explains the IPM check-in method used by top-performing hosts.
          </p>

          <section className="bg-[#050505] rounded-xl shadow-lg p-8 my-10">
            <h2 className="text-3xl font-bold text-[#F8F8F8] mb-6 flex items-center gap-3">
              <XCircle className="w-8 h-8 text-red-600" />
              The Problem With PMS-Dependent Check-In Systems
            </h2>
            <p className="text-[#B8B8B8] mb-6">When hosts rely on PMS API:</p>
            <div className="grid md:grid-cols-2 gap-4">
              {problems.map((problem, index) => (
                <div key={index} className="bg-red-50 rounded-lg p-4 flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                  <span className="text-[#CFCFCF]">{problem}</span>
                </div>
              ))}
            </div>
            <div className="bg-[#050505] text-white rounded-lg p-6 mt-6">
              <p className="text-lg font-bold m-0">
                API setups create fragile systems.
              </p>
              <p className="mt-3 m-0">
                IPM designs independent systems that you fully control.
              </p>
            </div>
          </section>

          <section className="bg-gradient-to-br from-[#171717] to-[#1F1F1F] rounded-xl shadow-lg p-8 my-10">
            <h2 className="text-3xl font-bold text-[#F8F8F8] mb-6 flex items-center gap-3">
              <Smartphone className="w-8 h-8 text-[#D4AF37]" />
              IPM's API-Free Check-In Framework
            </h2>
            <p className="text-[#B8B8B8] mb-6">Your check-in system should include:</p>

            <div className="space-y-6">
              <div className="bg-[#050505] rounded-lg p-6 shadow-md border-l-4 border-[#D4AF37]">
                <h3 className="text-xl font-bold text-[#F8F8F8] mb-3 flex items-center gap-2">
                  <Mail className="w-6 h-6 text-[#D4AF37]" />
                  An automated message from Airbnb
                </h3>
                <p className="text-[#B8B8B8]">
                  <strong>Trigger:</strong> "Reservation Confirmed"
                </p>
              </div>

              <div className="bg-[#050505] rounded-lg p-6 shadow-md border-l-4 border-[#D4AF37]">
                <h3 className="text-xl font-bold text-[#F8F8F8] mb-3">
                  A link to your website's check-in page
                </h3>
                <p className="text-[#B8B8B8] mb-2">Example:</p>
                <code className="bg-[#1F1F1F] px-4 py-2 rounded text-[#D4AF37] font-mono">
                  https://ipm.services/check-in/listing-name
                </code>
              </div>

              <div className="bg-[#050505] rounded-lg p-6 shadow-md border-l-4 border-green-500">
                <h3 className="text-xl font-bold text-[#F8F8F8] mb-3">
                  A Mailchimp (or Typeform/JotForm) embedded form
                </h3>
                <p className="text-[#B8B8B8] mb-3">Collect only:</p>
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
                <p className="text-[#A8A8A8] text-sm mt-3 italic">
                  (Nothing else — Airbnb already gave you the rest)
                </p>
              </div>

              <div className="bg-[#050505] rounded-lg p-6 shadow-md border-l-4 border-amber-500">
                <h3 className="text-xl font-bold text-[#F8F8F8] mb-3">
                  A simple matching key
                </h3>
                <p className="text-[#B8B8B8] mb-3">
                  For guests who struggle with reservation codes, IPM uses:
                </p>
                <div className="space-y-2">
                  <div className="bg-amber-50 rounded p-3">
                    <strong>Last Name + Check-In Date</strong>
                  </div>
                  <div className="text-center text-[#A8A8A8] font-bold">OR</div>
                  <div className="bg-amber-50 rounded p-3">
                    <strong>Phone Number</strong>
                  </div>
                  <div className="text-center text-[#A8A8A8] font-bold">OR</div>
                  <div className="bg-amber-50 rounded p-3">
                    <strong>Reservation Code</strong> (optional)
                  </div>
                </div>
              </div>

              <div className="bg-[#050505] rounded-lg p-6 shadow-md border-l-4 border-[#D4AF37]">
                <h3 className="text-xl font-bold text-[#F8F8F8] mb-3 flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-[#D4AF37]" />
                  A backend data sync
                </h3>
                <p className="text-[#B8B8B8] mb-3">Tool options:</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['Mailchimp', 'Zapier or Make', 'MailParser or Parseur', 'Airtable or Google Sheets'].map((tool) => (
                    <div key={tool} className="bg-[#D4AF37]/10 rounded p-3 text-center text-sm font-medium">
                      {tool}
                    </div>
                  ))}
                </div>
                <p className="text-[#B8B8B8] mt-4">
                  This creates a unified guest profile without needing PMS data.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-[#050505] rounded-xl shadow-lg p-8 my-10">
            <h2 className="text-3xl font-bold text-[#F8F8F8] mb-6">
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

          <section className="bg-gradient-to-br from-[#111111] to-[#1F1F1F] rounded-xl shadow-lg p-8 my-10">
            <h2 className="text-3xl font-bold text-[#F8F8F8] mb-6 flex items-center gap-3">
              <Users className="w-8 h-8 text-[#D4AF37]" />
              How Guests Experience the System
            </h2>
            <p className="text-[#B8B8B8] mb-6">Your guests will:</p>
            <div className="space-y-3">
              {guestSteps.map((step, index) => (
                <div key={index} className="bg-[#050505] rounded-lg p-4 flex items-center gap-4 shadow-md">
                  <span className="text-3xl">{step.num}</span>
                  <span className="text-lg text-[#CFCFCF]">{step.text}</span>
                </div>
              ))}
            </div>
            <div className="bg-[#111111] border border-[#D4AF37]/25 text-white rounded-lg p-6 mt-6 text-center">
              <p className="text-xl font-bold m-0">
                They don't feel the backend work — they experience polished simplicity.
              </p>
            </div>
          </section>

          <section className="bg-[#050505] rounded-xl shadow-lg p-8 my-10">
            <h2 className="text-3xl font-bold text-[#F8F8F8] mb-6">
              IPM Check-In System Advantages
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {systemAdvantages.map((advantage, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#D4AF37] flex-shrink-0 mt-1" />
                  <span className="text-[#CFCFCF] font-medium">{advantage}</span>
                </div>
              ))}
            </div>
            <div className="bg-[#D4AF37]/15 border-l-4 border-[#D4AF37] p-6 rounded-r-lg mt-6">
              <p className="text-lg font-bold text-[#F2D98D] m-0">
                This is the system professional hosts use, and it gives you operational control while reducing costs.
              </p>
            </div>
          </section>

          <section className="bg-[#050505] rounded-xl shadow-lg p-8 my-10">
            <h2 className="text-3xl font-bold text-[#F8F8F8] mb-6">
              Key Takeaways
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <p className="text-[#CFCFCF] font-medium">Use Airbnb automated messages → link to your site</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <p className="text-[#CFCFCF] font-medium">Use Mailchimp/Typeform forms → collect guest info</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <p className="text-[#CFCFCF] font-medium">Use simple matching keys → no confusion</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <p className="text-[#CFCFCF] font-medium">Use Zapier/Make → unify booking + guest data</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <p className="text-[#CFCFCF] font-medium">Use IPM → build, install, and optimize the whole system</p>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-r from-[#D4AF37] to-[#C8A24A] rounded-2xl shadow-2xl p-8 text-center text-white my-10">
            <h2 className="text-3xl font-bold mb-4">Book a Consultation with IPM</h2>
            <p className="text-lg mb-6 opacity-90">
              Optimize your property, reduce costs, and increase profits. Click below to get started.
            </p>
            <a
              href="#"
              className="inline-block bg-[#050505] text-[#D4AF37] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#D4AF37]/10 transition-colors shadow-lg"
            >
              Schedule a Call →
            </a>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
