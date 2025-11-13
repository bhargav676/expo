import PageLayout from "../components/PageLayout";
import Button from "../components/Button";

const Profile = () => {
  const registrations = [
    { event: "Hardware Expo", status: "Confirmed", date: "Mar 15, 2025" },
    { event: "Digital Hackathon", status: "Pending", date: "Mar 16, 2025" },
    { event: "Robo Wars", status: "Confirmed", date: "Mar 17, 2025" },
  ];

  return (
    <PageLayout>
      <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                My Profile
              </span>
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-gray-900 to-black border border-cyan-500/30 rounded-2xl p-8 sticky top-24">
                {/* Profile Image */}
                <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center text-6xl">
                  👨‍🎓
                </div>

                {/* User Info */}
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    John Doe
                  </h2>
                  <p className="text-cyan-500 font-semibold mb-1">
                    Computer Science
                  </p>
                  <p className="text-gray-400 text-sm">john.doe@college.edu</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-cyan-500/10 rounded-lg p-3 text-center border border-cyan-500/30">
                    <div className="text-2xl font-bold text-cyan-500">3</div>
                    <div className="text-xs text-gray-400 mt-1">Events</div>
                  </div>
                  <div className="bg-purple-500/10 rounded-lg p-3 text-center border border-purple-500/30">
                    <div className="text-2xl font-bold text-purple-500">2</div>
                    <div className="text-xs text-gray-400 mt-1">Confirmed</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button variant="primary" className="w-full">
                    Edit Profile ✏️
                  </Button>
                  <Button variant="outline" className="w-full">
                    Settings ⚙️
                  </Button>
                </div>

                {/* Additional Info */}
                <div className="mt-6 pt-6 border-t border-cyan-500/20">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-gray-400">Roll No:</span>
                      <span className="text-white font-semibold">
                        CS2025001
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-gray-400">Year:</span>
                      <span className="text-white font-semibold">3rd Year</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-gray-400">Member Since:</span>
                      <span className="text-white font-semibold">Jan 2025</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Registrations */}
              <div className="bg-gradient-to-br from-gray-900 to-black border border-purple-500/30 rounded-2xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">
                    My Registrations
                  </h2>
                  <Button variant="ghost" className="px-4 py-2 text-sm">
                    View All →
                  </Button>
                </div>

                <div className="space-y-4">
                  {registrations.map((reg, index) => (
                    <div
                      key={index}
                      className="bg-black/50 border border-cyan-500/20 rounded-lg p-4 hover:border-cyan-500/40 transition-all duration-300"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-white mb-1">
                            {reg.event}
                          </h3>
                          <p className="text-gray-400 text-sm">
                            Event Date: {reg.date}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              reg.status === "Confirmed"
                                ? "bg-green-500/20 text-green-500"
                                : "bg-yellow-500/20 text-yellow-500"
                            }`}
                          >
                            {reg.status}
                          </span>
                          <button className="text-cyan-500 hover:text-cyan-400 transition-colors">
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path d="M9 5l7 7-7 7"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {registrations.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📝</div>
                    <p className="text-gray-400 mb-4">No registrations yet</p>
                    <Button variant="primary">Browse Events</Button>
                  </div>
                )}
              </div>

              {/* Achievements */}
              <div className="bg-gradient-to-br from-gray-900 to-black border border-cyan-500/30 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Achievements & Badges
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { icon: "🏆", name: "Winner", color: "yellow" },
                    { icon: "⭐", name: "Top Performer", color: "cyan" },
                    { icon: "🎯", name: "Early Bird", color: "purple" },
                    { icon: "🔥", name: "Active", color: "pink" },
                  ].map((badge, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-gray-800 to-black border border-cyan-500/20 rounded-lg p-4 text-center hover:border-cyan-500/40 transition-all duration-300 hover:scale-105"
                    >
                      <div className="text-4xl mb-2">{badge.icon}</div>
                      <p className="text-white text-sm font-semibold">
                        {badge.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gradient-to-br from-gray-900 to-black border border-purple-500/30 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Quick Actions
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-lg p-4 text-left hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center text-2xl">
                        🎫
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">
                          New Registration
                        </h3>
                        <p className="text-gray-400 text-sm">
                          Register for events
                        </p>
                      </div>
                    </div>
                  </button>
                  <button className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-4 text-left hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center text-2xl">
                        💳
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">
                          Payment History
                        </h3>
                        <p className="text-gray-400 text-sm">
                          View transactions
                        </p>
                      </div>
                    </div>
                  </button>
                  <button className="bg-gradient-to-r from-pink-500/10 to-cyan-500/10 border border-pink-500/30 rounded-lg p-4 text-left hover:border-pink-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/20">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center text-2xl">
                        📄
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">
                          Certificates
                        </h3>
                        <p className="text-gray-400 text-sm">
                          Download certificates
                        </p>
                      </div>
                    </div>
                  </button>
                  <button className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-lg p-4 text-left hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center text-2xl">
                        📞
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">Support</h3>
                        <p className="text-gray-400 text-sm">Get help</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Profile;
