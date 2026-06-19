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
    red: 'from-[#D4AF37] to-[#F2D98D]',
    blue: 'from-[#D4AF37] to-[#F2D98D]',
    amber: 'from-[#D4AF37] to-[#F2D98D]',
    green: 'from-[#D4AF37] to-[#F2D98D]'
  };

  return (
    <div className="min-h-screen bg-[#06121F]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link to="/insights" className="inline-flex items-center text-[#D4AF37] hover:text-[#F2D98D] mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Insights
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            IPM Video Library
          </h1>
          <p className="text-xl text-[#D4AF37] font-semibold">
            Step-By-Step Tutorials, System Breakdowns & Host Training
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="prose prose-lg max-w-none"
        >
          <div className="bg-[#F8F5EF] border-l-4 border-[#D4AF37] p-6 rounded-r-lg mb-10">
            <p className="text-lg text-[#334155] m-0">
              This section will become your video hub for hosts who want to learn new systems, understand
              Airbnb better, and operate professionally.
            </p>
          </div>

          <section className="bg-[#0A1A30] border border-[#D4AF37]/20 rounded-xl shadow-lg p-8 mb-10">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <Video className="w-8 h-8 text-[#D4AF37]" />
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
                    className="bg-[#0F2440] rounded-lg shadow-md p-6 border-2 border-[#D4AF37]/20"
                  >
                    <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${colorClasses[section.color]} mb-4`}>
                      <Icon className="w-6 h-6 text-[#06121F]" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">{section.title}</h3>
                    <ul className="space-y-2">
                      {section.topics.map((topic, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-[#C9D2DE]">
                          <span className="text-[#D4AF37] mt-1">•</span>
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>
          </section>

          <section className="bg-white rounded-xl shadow-lg p-8 mb-10">
            <h2 className="text-3xl font-bold text-[#0A1A30] mb-6">
              Coming Soon: Video Content
            </h2>
            <p className="text-lg text-[#334155] leading-relaxed mb-6">
              IPM is building a complete video library to help new and experienced hosts learn proven
              systems to operate better, avoid unnecessary fees, and run profitable rental businesses.
            </p>
            <p className="text-lg font-medium text-[#0A1A30]">
              Check back soon for new videos and full training modules.
            </p>
          </section>

          <section className="bg-[#0A1A30] border border-[#D4AF37]/20 rounded-xl shadow-lg p-8 mb-10">
            <h2 className="text-3xl font-bold text-white mb-6">
              Upcoming Video Releases (Placeholders)
            </h2>
            <p className="text-[#9CA9B8] mb-8 italic">
              These are placeholder examples of the professional training content that will be available soon.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {placeholderVideos.map((video, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-[#0F2440] rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer group"
                >
                  <div className="relative bg-gradient-to-br from-[#0A1A30] to-[#06121F] aspect-video flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Play className="w-16 h-16 text-[#D4AF37] opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                    </div>
                    <div className="absolute bottom-3 right-3 bg-[#06121F]/80 px-2 py-1 rounded text-white text-sm font-medium">
                      {video.duration}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="text-xs font-semibold text-[#D4AF37] mb-2 uppercase tracking-wide">
                      {video.category}
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                      {video.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="bg-[#F8F5EF] rounded-xl shadow-lg p-8 mb-10">
            <h2 className="text-3xl font-bold text-[#0A1A30] mb-6">
              Suggested Page Sections (For Future Content)
            </h2>
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-6 shadow">
                <h3 className="text-xl font-bold text-[#0A1A30] mb-2">Section 1: Featured Training Video</h3>
                <p className="text-[#475569]">(Your most important video)</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow">
                <h3 className="text-xl font-bold text-[#0A1A30] mb-2">Section 2: Airbnb Fee Videos</h3>
                <p className="text-[#475569]">(Playlist of all fee-related content)</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow">
                <h3 className="text-xl font-bold text-[#0A1A30] mb-2">Section 3: Automation Strategy Videos</h3>
                <p className="text-[#475569]">(Check-in, forms, workflows, etc.)</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow">
                <h3 className="text-xl font-bold text-[#0A1A30] mb-2">Section 4: Advanced Host Guides</h3>
                <p className="text-[#475569]">(Long-form explainers, deep dives)</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow">
                <h3 className="text-xl font-bold text-[#0A1A30] mb-2">Section 5: IPM System Tutorials</h3>
                <p className="text-[#475569]">(Your proprietary methods)</p>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-r from-[#D4AF37] to-[#F2D98D] rounded-2xl shadow-2xl p-8 text-center text-[#06121F]">
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
