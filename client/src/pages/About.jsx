import PageLayout from "../components/PageLayout";
import {
  HiFire,
  HiHandRaised,
  HiLightBulb,
  HiRocketLaunch,
} from "react-icons/hi2";

const About = () => {
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
              <HiRocketLaunch className="text-5xl text-cyan-500 mb-4" />
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
              <HiFire className="text-5xl text-purple-500 mb-4" />
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
                  icon: HiFire,
                  title: "Skill Development",
                  description:
                    "Enhance technical and soft skills through practical challenges",
                },
                {
                  icon: HiHandRaised,
                  title: "Industry Connect",
                  description:
                    "Network with professionals and potential employers",
                },
                {
                  icon: HiLightBulb,
                  title: "Innovation Hub",
                  description:
                    "Transform ideas into reality with mentorship and resources",
                },
              ].map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-gray-900 to-black border border-cyan-500/20 rounded-xl p-6 text-center hover:border-cyan-500/50 transition-all duration-300"
                  >
                    <IconComponent className="text-5xl text-cyan-500 mb-4 mx-auto" />
                    <h3 className="text-xl font-bold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-sm">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default About;
