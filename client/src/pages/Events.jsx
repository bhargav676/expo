import PageLayout from "../components/PageLayout";
import EventCard from "../components/EventCard";
import {
  HiWrench,
  HiDocumentText,
  HiCog,
  HiCommandLine,
  HiPuzzlePiece,
  HiSparkles,
  HiBolt,
  HiPaintBrush,
} from "react-icons/hi2";

const Events = () => {
  const technicalEvents = [
    {
      title: "Hardware Expo",
      description:
        "Showcase your innovative hardware projects and prototypes. Display cutting-edge IoT devices, robotics, and embedded systems.",
      icon: HiWrench,
      category: "Technical",
      registrationLink: "",
    },
    {
      title: "Paper Presentation",
      description:
        "Present your research papers and technical findings to a panel of expert judges. Share your innovative ideas with the tech community.",
      icon: HiDocumentText,
      category: "Technical",
      registrationLink: "",
    },
    {
      title: "Robo Wars",
      description:
        "Battle it out with custom-built robots in this epic combat arena. Bring your strongest robot and compete for the championship.",
      icon: HiCog,
      category: "Technical",
      registrationLink:
        "https://docs.google.com/forms/d/e/1FAIpQLSdQ_OvZJGGmvEfDbz93_VHCOqRPJvQQpGgTnP9swF1Y2DKMoA/viewform",
    },
  ];

  const nonTechnicalEvents = [
    {
      title: "Digital Hackathon",
      description:
        "Code for 24 hours straight to build innovative solutions. Team up and solve real-world problems with cutting-edge technology.",
      icon: HiCommandLine,
      category: "Non-Technical",
      registrationLink: "",
    },
    {
      title: "Fun Events",
      description:
        "Participate in exciting fun activities, games, and entertainment. Relax and enjoy with friends while taking a break from tech.",
      icon: HiPuzzlePiece,
      category: "Non-Technical",
      registrationLink:
        "https://docs.google.com/forms/d/e/1FAIpQLSfmU92d5U3XOONUGpZuWB0Ml29Wr5zWh7aBhLH0GRB8Rrs7sA/viewform",
    },
    {
      title: "Cultural Night",
      description:
        "Experience an evening of music, dance, and cultural performances. Showcase your talents or enjoy spectacular performances.",
      icon: HiSparkles,
      category: "Non-Technical",
      registrationLink: "",
    },
  ];

  return (
    <PageLayout>
      <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Event Lineup
              </span>
            </h1>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Choose from our diverse range of technical and non-technical
              events. Challenge yourself, learn new skills, and have fun!
            </p>
          </div>

          {/* Technical Events Section */}
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
              <h2 className="text-3xl font-bold text-white flex items-center gap-2">
                <HiBolt className="text-cyan-500" /> Technical Events
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {technicalEvents.map((event, index) => (
                <EventCard key={index} {...event} />
              ))}
            </div>
          </div>

          {/* Non-Technical Events Section */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
              <h2 className="text-3xl font-bold text-white flex items-center gap-2">
                <HiPaintBrush className="text-purple-500" /> Non-Technical
                Events
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {nonTechnicalEvents.map((event, index) => (
                <EventCard key={index} {...event} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Events;
