import PageLayout from "../components/PageLayout";

const About = () => {
  const team = [
    { name: "Dr. Rajesh Kumar", role: "Faculty Coordinator", image: "👨‍🏫" },
    { name: "Priya Sharma", role: "Student President", image: "👩‍💼" },
    { name: "Arjun Patel", role: "Tech Lead", image: "👨‍💻" },
    { name: "Sneha Reddy", role: "Event Manager", image: "👩‍💼" },
    { name: "Vikram Singh", role: "Design Head", image: "👨‍🎨" },
    { name: "Ananya Das", role: "Marketing Head", image: "👩‍💻" },
  ];

  const timeline = [
    { time: "09:00 AM", event: "Registration & Inauguration", icon: "🎪" },
    { time: "10:00 AM", event: "Technical Events Begin", icon: "⚡" },
    { time: "12:00 PM", event: "Hackathon Kickoff", icon: "💻" },
    { time: "01:00 PM", event: "Lunch Break", icon: "🍽️" },
    { time: "02:00 PM", event: "Workshops & Seminars", icon: "📚" },
    { time: "05:00 PM", event: "Cultural Events", icon: "🎭" },
    { time: "07:00 PM", event: "Prize Distribution", icon: "🏆" },
    { time: "08:00 PM", event: "Closing Ceremony", icon: "🎉" },
  ];

  return (
    <PageLayout>
      <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                About Us
              </span>
            </h1>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Discover the vision behind College Event Expo and meet the amazing
              team that makes it all possible.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <div className="bg-gradient-to-br from-gray-900 to-black border border-cyan-500/30 rounded-2xl p-8 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20">
              <div className="text-5xl mb-4">🎯</div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Our Mission
              </h2>
              <p className="text-gray-400 leading-relaxed">
                To create a platform that nurtures innovation, fosters
                collaboration, and showcases the incredible talent of students.
                We aim to bridge the gap between academic knowledge and
                real-world applications through hands-on experiences and
                competitive events.
              </p>
            </div>
            <div className="bg-gradient-to-br from-gray-900 to-black border border-purple-500/30 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20">
              <div className="text-5xl mb-4">🚀</div>
              <h2 className="text-3xl font-bold text-white mb-4">Our Vision</h2>
              <p className="text-gray-400 leading-relaxed">
                To become the premier tech expo in the region, inspiring the
                next generation of innovators and entrepreneurs. We envision a
                future where students from all backgrounds come together to
                learn, compete, and create solutions for tomorrow's challenges.
              </p>
            </div>
          </div>

          {/* Why We Organize */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
                Why College Event Expo?
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: "🌟",
                  title: "Skill Development",
                  description:
                    "Enhance technical and soft skills through practical challenges",
                },
                {
                  icon: "🤝",
                  title: "Industry Connect",
                  description:
                    "Network with professionals and potential employers",
                },
                {
                  icon: "💡",
                  title: "Innovation Hub",
                  description:
                    "Transform ideas into reality with mentorship and resources",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-900 to-black border border-cyan-500/20 rounded-xl p-6 text-center hover:border-cyan-500/50 transition-all duration-300"
                >
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Organizing Team */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Meet Our Team
              </span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <div
                  key={index}
                  className="group bg-gradient-to-br from-gray-900 to-black border border-purple-500/20 rounded-xl p-6 text-center hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-2"
                >
                  <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300">
                    {member.image}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {member.name}
                  </h3>
                  <p className="text-purple-500 font-semibold">{member.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Event Timeline */}
          <div>
            <h2 className="text-4xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
                Event Day Timeline
              </span>
            </h2>
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-purple-500 to-pink-500"></div>

                {/* Timeline Items */}
                <div className="space-y-8">
                  {timeline.map((item, index) => (
                    <div
                      key={index}
                      className="relative flex items-center gap-6"
                    >
                      {/* Icon */}
                      <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border-2 border-cyan-500 rounded-full flex items-center justify-center text-3xl z-10 flex-shrink-0">
                        {item.icon}
                      </div>
                      {/* Content */}
                      <div className="flex-1 bg-gradient-to-r from-gray-900 to-black border border-cyan-500/20 rounded-lg p-4 hover:border-cyan-500/50 transition-all duration-300">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <h3 className="text-lg font-bold text-white mb-1 sm:mb-0">
                            {item.event}
                          </h3>
                          <span className="text-cyan-500 font-semibold">
                            {item.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default About;
