import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { DollarSign, Link as LinkIcon, Shield, Smartphone, Video, ArrowRight, CheckCircle } from 'lucide-react';

export default function Insights() {
  const insightTopics = [
    {
      id: 'airbnb-fees',
      title: 'Airbnb Fees Explained',
      description: 'A direct, professional breakdown of how Airbnb fees actually work today — including the split-fee model, host-only fee model, and how hosts lose thousands per year without realizing it.',
      icon: DollarSign,
      path: '/insights/airbnb-fees',
      color: 'blue'
    },
    {
      id: 'api-costs',
      title: 'API Connections & Hidden Costs',
      description: 'A deeper look at PMS and channel manager integrations. Learn why an API connection triggers Airbnb\'s 15.5% host-only fee, why Airbnb keeps this quiet, and what it means for your earnings.',
      icon: LinkIcon,
      path: '/insights/api-costs',
      color: 'indigo'
    },
    {
      id: 'avoid-fees',
      title: 'How to Avoid the 15.5% Fee',
      description: 'A proven, step-by-step strategy to return your listings to the 3% fee model, eliminate unnecessary charges, and maintain full automation — safely and correctly.',
      icon: Shield,
      path: '/insights/avoid-fees',
      color: 'green'
    },
    {
      id: 'checkin-system',
      title: 'Check-In System Design (IPM Method)',
      description: 'Our professional, API-free system for guest communication, data collection, and automation. Clean, scalable, brand-consistent, and completely under your control.',
      icon: Smartphone,
      path: '/insights/checkin-system',
      color: 'purple'
    },
    {
      id: 'video-library',
      title: 'IPM Video Library',
      description: 'A growing collection of educational videos, system breakdowns, tutorials, and expert host training designed to help you operate with clarity and confidence.',
      icon: Video,
      path: '/insights/video-library',
      color: 'red'
    }
  ];

  const advantages = [
    'How to prevent Airbnb from taking 15–20% of your income',
    'How to automate your hosting systems without expensive PMS software',
    'How to build a professional guest check-in workflow',
    'How to collect and control your own guest data',
    'How to scale operations with simple, effective systems',
    'How to operate like a multinational property management firm'
  ];

  const problems = [
    'Unexpected fee increases',
    'Confusing payout breakdowns',
    'Unnecessary dependence on expensive software',
    'Unclear automation workflows',
    'Limited control over their own operations'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
            INSIGHTS
          </h1>
          <p className="text-xl md:text-2xl text-blue-600 font-semibold mb-4">
            Expert Knowledge, Transparent Guidance, and Professional Hosting Strategies
          </p>
          <p className="text-lg text-slate-700 max-w-4xl mx-auto leading-relaxed">
            Welcome to the IPM Insights Hub — the industry's most direct and transparent educational
            resource for short-term rental hosts.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-16"
        >
          <p className="text-lg text-slate-700 leading-relaxed mb-6">
            Airbnb, PMS platforms, and channel managers often keep hosts in the dark about how fees
            work, how systems interact, and how API connections can dramatically impact your payouts. At
            IPM, we believe hosts deserve clarity, control, and modern tools that protect their profits.
          </p>
          <p className="text-lg text-slate-700 leading-relaxed mb-6">
            This section of our website provides professional, no-nonsense explanations of how the industry
            really works, based on what we teach our global property management clients every day.
          </p>
          <p className="text-lg text-slate-700 leading-relaxed">
            Whether you're a new host or managing multiple properties, these guides will help you upgrade
            your operations, avoid hidden fees, and build systems that keep you in full control of your
            business.
          </p>
        </motion.div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            What You'll Find in IPM Insights
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {insightTopics.map((topic, index) => {
              const Icon = topic.icon;
              const colorClasses = {
                blue: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
                indigo: 'from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700',
                green: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
                purple: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
                red: 'from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
              };

              return (
                <motion.div
                  key={topic.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <Link to={topic.path}>
                    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all p-6 h-full border-2 border-transparent hover:border-blue-200 group">
                      <div className={`inline-flex p-4 rounded-lg bg-gradient-to-r ${colorClasses[topic.color]} mb-4`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                        {topic.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed mb-4">
                        {topic.description}
                      </p>
                      <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform">
                        Learn more <ArrowRight className="w-4 h-4 ml-2" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-xl p-8 mb-16 border-l-4 border-amber-500"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            Why IPM Creates These Resources
          </h2>
          <p className="text-lg text-slate-700 leading-relaxed mb-6">
            Most hosts never receive transparent explanations from Airbnb, PMS platforms, or other
            property management companies. They are left with:
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {problems.map((problem, index) => (
              <div key={index} className="flex items-start gap-3 bg-white/70 rounded-lg p-4">
                <span className="text-amber-600 mt-1">⚠️</span>
                <span className="text-slate-800 font-medium">{problem}</span>
              </div>
            ))}
          </div>
          <p className="text-xl font-bold text-slate-900 mb-2">
            IPM believes hosts should be empowered — not confused.
          </p>
          <p className="text-lg text-slate-700">
            Our mission is to provide clarity, expertise, and proven systems so hosts can run profitable,
            efficient, and professional short-term rental businesses across the globe.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-xl p-8 mb-16"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            Our Expertise — Your Advantage
          </h2>
          <p className="text-lg text-slate-700 mb-6">
            Through IPM Insights, you will learn:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {advantages.map((advantage, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <span className="text-slate-800 font-medium">{advantage}</span>
              </div>
            ))}
          </div>
          <p className="text-lg text-slate-700 mt-8 font-medium">
            These pages are designed to help you become a smarter, more profitable host — with
            real-world strategies used across hundreds of properties internationally.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-2xl p-8 text-center text-white"
        >
          <h2 className="text-3xl font-bold mb-4">
            Ready to Optimize Your Operations?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            If you want personalized help implementing any of these systems, or if you'd like IPM to
            manage your properties professionally, we're here to help.
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
            <h3 className="text-2xl font-bold mb-3">Book a Consultation with IPM</h3>
            <p className="text-lg mb-6 opacity-90">
              Optimize your property, reduce costs, and increase profits. Click below to get started.
            </p>
            <a
              href="#"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl"
            >
              Schedule a Call →
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
