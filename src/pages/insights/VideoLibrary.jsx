import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Video, Play, ArrowLeft, Film, BookOpen, Lightbulb, TrendingUp } from 'lucide-react';

export default function VideoLibrary() {
  const videoSections = [
    {
      id: 'tutorials',
      title: 'Tutorials',
      icon: Film,
      color: 'red',
      topics: [
        'How Airbnb fees work',
        'Why API triggers the 15.5%',
        'How to switch back to 3%',
        'How to build your check-in system',
        'How to use Mailchimp for guest workflows',
        'How to parse Airbnb emails',
        'Automation workflows with Zapier/Make'
      ]
    },
    {
      id: 'explanations',
      title: 'Explanations',
      icon: BookOpen,
      color: 'blue',
      topics: [
        'Industry secrets',
        'PMS limitations',
        'Airbnb transparency issues',
        'Best practices for hosts'
      ]
    },
    {
      id: 'implementation',
      title: 'Implementation Videos',
      icon: Lightbulb,
      color: 'amber',
      topics: [
        'Screenshares',
        'Setup walkthroughs',
        'Troubleshooting tips',
        'Real IPM systems in action'
      ]
    },
    {
      id: 'case-studies',
      title: 'Case Studies',
      icon: TrendingUp,
      color: 'green',
      topics: [
        'Hosts who saved thousands by removing API',
        'Operational transformations',
        'Profit recovery strategies'
      ]
    }
  ];

  const placeholderVideos = [
    {
      title: 'Understanding Airbnb Fee Structures',
      duration: '12:45',
      category: 'Airbnb Fee Videos',
      thumbnail: 'placeholder'
    },
    {
      title: 'API vs iCal: What Every Host Needs to Know',
      duration: '15:30',
      category: 'Airbnb Fee Videos',
      thumbnail: 'placeholder'
    },
    {
      title: 'Building Your Check-In System',
      duration: '18:20',
      category: 'Automation Strategy Videos',
      thumbnail: 'placeholder'
    },
    {
      title: 'Setting Up Mailchimp for Guest Communication',
      duration: '22:15',
      category: 'Automation Strategy Videos',
      thumbnail: 'placeholder'
    },
    {
      title: 'From 15.5% to 3%: Real Host Success Story',
      duration: '10:30',
      category: 'Case Studies',
      thumbnail: 'placeholder'
    },
    {
      title: 'IPM System Setup Walkthrough',
      duration: '25:40',
      category: 'IPM System Tutorials',
      thumbnail: 'placeholder'
    }
  ];

  const colorClasses = {
    red: 'from-red-500 to-red-600',
    blue: 'from-blue-500 to-blue-600',
    amber: 'from-amber-500 to-amber-600',
    green: 'from-green-500 to-green-600'
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link to="/insights" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Insights
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            IPM Video Library
          </h1>
          <p className="text-xl text-red-600 font-semibold">
            Step-By-Step Tutorials, System Breakdowns & Host Training
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="prose prose-lg max-w-none"
        >
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-10">
            <p className="text-lg text-slate-800 m-0">
              This section will become your video hub for hosts who want to learn new systems, understand
              Airbnb better, and operate professionally.
            </p>
          </div>

          <section className="bg-white rounded-xl shadow-lg p-8 mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <Video className="w-8 h-8 text-red-600" />
              Content Categories
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {videoSections.map((section, index) => {
                const Icon = section.icon;
                return (
                  <motion.div
                    key={section.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="bg-gradient-to-br from-slate-50 to-white rounded-lg shadow-md p-6 border-2 border-slate-200"
                  >
                    <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${colorClasses[section.color]} mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">{section.title}</h3>
                    <ul className="space-y-2">
                      {section.topics.map((topic, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-slate-700">
                          <span className="text-blue-600 mt-1">•</span>
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>
          </section>

          <section className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl shadow-lg p-8 mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Coming Soon: Video Content
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              IPM is building a complete video library to help new and experienced hosts learn proven
              systems to operate better, avoid unnecessary fees, and run profitable rental businesses.
            </p>
            <p className="text-lg font-medium text-amber-900">
              Check back soon for new videos and full training modules.
            </p>
          </section>

          <section className="bg-white rounded-xl shadow-lg p-8 mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Upcoming Video Releases (Placeholders)
            </h2>
            <p className="text-slate-600 mb-8 italic">
              These are placeholder examples of the professional training content that will be available soon.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {placeholderVideos.map((video, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-slate-50 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer group"
                >
                  <div className="relative bg-gradient-to-br from-slate-700 to-slate-900 aspect-video flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Play className="w-16 h-16 text-white opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                    </div>
                    <div className="absolute bottom-3 right-3 bg-black/70 px-2 py-1 rounded text-white text-sm font-medium">
                      {video.duration}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="text-xs font-semibold text-blue-600 mb-2 uppercase tracking-wide">
                      {video.category}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {video.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl shadow-lg p-8 mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Suggested Page Sections (For Future Content)
            </h2>
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-6 shadow">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Section 1: Featured Training Video</h3>
                <p className="text-slate-600">(Your most important video)</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Section 2: Airbnb Fee Videos</h3>
                <p className="text-slate-600">(Playlist of all fee-related content)</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Section 3: Automation Strategy Videos</h3>
                <p className="text-slate-600">(Check-in, forms, workflows, etc.)</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Section 4: Advanced Host Guides</h3>
                <p className="text-slate-600">(Long-form explainers, deep dives)</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Section 5: IPM System Tutorials</h3>
                <p className="text-slate-600">(Your proprietary methods)</p>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl shadow-2xl p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Book a Consultation with IPM</h2>
            <p className="text-lg mb-6 opacity-90">
              Optimize your property, reduce costs, and increase profits. Click below to get started.
            </p>
            <a
              href="#"
              className="inline-block bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-50 transition-colors shadow-lg"
            >
              Schedule a Call →
            </a>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
