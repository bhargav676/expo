import PageLayout from "../components/PageLayout";
import { useState, useEffect } from "react";
import {
  HiUser,
  HiMagnifyingGlass,
  HiCheckCircle,
  HiXCircle,
  HiCalendar,
  HiEnvelope,
  HiPhone,
  HiTicket,
  HiAcademicCap,
  HiChartBar,
  HiSparkles,
  HiCog,
  HiPuzzlePiece,
  HiShieldCheck,
  HiQrCode,
  HiArrowDownTray,
  HiPrinter,
  HiArrowUpTray,
} from "react-icons/hi2";

const Profile = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const [searchCount, setSearchCount] = useState(0);
  const [selectedFeature, setSelectedFeature] = useState("badge");

  // Floating particles effect
  useEffect(() => {
    if (!userData && searchCount > 0) return;

    const canvas = document.getElementById("particles-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles = [];
    const particleCount = userData ? 80 : 50;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: Math.random() * 1 - 0.5,
        speedY: Math.random() * 1 - 0.5,
        color: userData
          ? `hsla(${Math.random() * 60 + 180}, 100%, 70%, ${
              Math.random() * 0.3 + 0.1
            })`
          : `hsla(${Math.random() * 60 + 270}, 100%, 70%, ${
              Math.random() * 0.2 + 0.05
            })`,
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.y < 0) particle.y = canvas.height;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        // Draw connections
        particles.forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = particle.color
              .replace("hsla", "hsla")
              .replace(/,[^,]+\)$/, ",0.05)");
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      // Clean up animation
    };
  }, [userData, searchCount]);

  const fetchUserData = async (searchEmail) => {
    // Array of event sheets to search
    const eventSheets = [
      {
        name: "Robo Wars",
        url: import.meta.env.VITE_ROBO_WARS,
        color: "from-cyan-500 to-blue-600",
        icon: HiCog,
      },
      {
        name: "Fun Events",
        url: import.meta.env.VITE_FUN_EVENTS,
        color: "from-purple-500 to-pink-600",
        icon: HiPuzzlePiece,
      },
    ];

    let userInfo = null;
    const allRegistrations = [];

    // Search through each event sheet
    for (const sheet of eventSheets) {
      if (!sheet.url) continue;

      try {
        const response = await fetch(sheet.url);
        const text = await response.text();

        // Remove the callback wrapper
        const jsonText = text.substring(47).slice(0, -2);
        const data = JSON.parse(jsonText);

        const rows = data.table.rows;
        const cols = data.table.cols;

        // Find the email column index
        const emailColIndex = cols.findIndex(
          (col) =>
            col.label.toLowerCase().includes("email") ||
            col.label.toLowerCase().includes("e-mail") ||
            col.label.toLowerCase().includes("mail")
        );

        if (emailColIndex === -1) continue;

        // Search for matching email
        for (const row of rows) {
          const rowEmail = row.c[emailColIndex]?.v;
          if (
            rowEmail &&
            rowEmail.toLowerCase() === searchEmail.toLowerCase()
          ) {
            // If this is the first match, extract user info
            if (!userInfo) {
              userInfo = {};
              cols.forEach((col, index) => {
                const label = col.label;
                const value = row.c[index]?.v || row.c[index]?.f || "N/A";

                // Extract common user fields
                if (
                  label.toLowerCase().includes("name") &&
                  !label.toLowerCase().includes("event")
                ) {
                  userInfo.Name = value;
                } else if (label.toLowerCase().includes("email")) {
                  userInfo.Email = value;
                } else if (
                  label.toLowerCase().includes("phone") ||
                  label.toLowerCase().includes("mobile")
                ) {
                  userInfo.Phone = value;
                } else if (label.toLowerCase().includes("college")) {
                  userInfo.College = value;
                } else if (label.toLowerCase().includes("year")) {
                  userInfo.Year = value;
                } else if (label.toLowerCase().includes("department")) {
                  userInfo.Department = value;
                }
              });
            }

            // Extract event-specific registration info
            const registration = {
              category: sheet.name,
              color: sheet.color,
              icon: sheet.icon,
            };

            cols.forEach((col, index) => {
              const label = col.label;
              const value = row.c[index]?.v || row.c[index]?.f || "N/A";

              // Try to find event name field
              if (
                label.toLowerCase().includes("event") &&
                label.toLowerCase().includes("name")
              ) {
                registration.eventName = value;
              } else if (label.toLowerCase().includes("timestamp")) {
                registration.registrationDate = value;
              } else if (
                label.toLowerCase().includes("transaction") ||
                label.toLowerCase().includes("payment")
              ) {
                registration.transactionId = value;
              } else if (label.toLowerCase().includes("status")) {
                registration.status = value;
              } else if (label.toLowerCase().includes("team")) {
                registration.teamName = value;
              }
            });

            // If no specific event name field or if it's N/A, use sheet name
            if (!registration.eventName || registration.eventName === "N/A") {
              registration.eventName = sheet.name;
            }

            allRegistrations.push(registration);
          }
        }
      } catch (err) {
        console.error(`Error fetching from ${sheet.name}:`, err);
        // Continue to next sheet even if one fails
      }
    }

    if (!userInfo) {
      throw new Error("No registration found for this email");
    }

    return {
      ...userInfo,
      registrations: allRegistrations,
      totalEvents: allRegistrations.length,
    };
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Please enter an email address");
      return;
    }

    setLoading(true);
    setError("");
    setUserData(null);
    setSearchCount((prev) => prev + 1);

    try {
      const data = await fetchUserData(email);
      setUserData(data);
    } catch (err) {
      setError(err.message || "Failed to fetch user data");
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      id: "badge",
      title: "Digital ID Badge",
      description: "Your official event participant badge",
      icon: HiShieldCheck,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "certificate",
      title: "Event Certificate",
      description: "Download your participation certificate",
      icon: HiArrowDownTray,
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "qr",
      title: "QR Code Pass",
      description: "Quick access pass for event entry",
      icon: HiQrCode,
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <PageLayout>
      <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Animated Background Canvas */}
        <canvas
          id="particles-canvas"
          className="absolute inset-0 w-full h-full pointer-events-none"
        />

        {/* Glowing Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-cyan-500/20 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                My Profile
              </span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Manage your event registrations, access digital credentials, and
              track your participation history.
            </p>
          </div>

          {/* Enhanced Search Form */}
          <div className="mb-12">
            <div className="max-w-2xl mx-auto bg-gradient-to-br from-gray-900/90 to-black/95 border border-gray-700/50 rounded-2xl p-8 backdrop-blur-sm shadow-2xl">
              <form onSubmit={handleSearch} className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-base font-semibold text-white">
                      Email Address
                    </label>
                  </div>

                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                      <HiEnvelope className="text-gray-400 text-xl group-focus-within:text-cyan-400 transition-colors duration-200" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-black/50 border-2 border-gray-700 rounded-xl pl-14 pr-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:bg-black/60 transition-all duration-200 text-base font-medium hover:border-gray-600 shadow-lg"
                      placeholder="your.email@college.edu"
                      required
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-blue-500/0 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>

                  <p className="text-xs text-gray-500 pl-1">
                    Enter your registered email to access your profile and event
                    details
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full relative group bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold py-4 rounded-xl hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg hover:shadow-cyan-500/25 hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      <span className="text-base">Searching Database...</span>
                    </>
                  ) : (
                    <>
                      <HiMagnifyingGlass className="text-xl" />
                      <span className="text-base">Find My Profile</span>
                    </>
                  )}
                </button>

                {error && (
                  <div className="bg-red-500/10 border-2 border-red-500/30 rounded-xl p-4 flex items-center gap-3 animate-slideDown">
                    <div className="flex-shrink-0">
                      <div className="w-11 h-11 bg-red-500/20 rounded-full flex items-center justify-center">
                        <HiXCircle className="text-red-400 text-2xl" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-red-300 font-semibold text-base">
                        {error}
                      </p>
                      <p className="text-red-400/70 text-sm mt-1">
                        Please check your email address and try again
                      </p>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* User Data Display */}
          {userData && (
            <div className="space-y-6 animate-fadeIn">
              {/* User Profile Header */}
              <div className="bg-gradient-to-br from-gray-900/90 to-black/90 border border-gray-700/30 rounded-2xl p-8 backdrop-blur-sm shadow-xl">
                <div className="flex flex-col lg:flex-row items-center lg:items-center gap-8">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div className="w-28 h-28 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                      <HiUser className="text-white text-5xl" />
                    </div>
                  </div>

                  {/* User Info */}
                  <div className="flex-1">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                      {/* Left: Name and Badge */}
                      <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-bold text-white mb-3">
                          {userData.Name || "N/A"}
                        </h2>
                        <div className="inline-flex items-center gap-2 bg-green-500/10 px-4 py-2 rounded-full border border-green-500/30">
                          <HiCheckCircle className="text-green-400 text-base" />
                          <span className="text-green-400 text-sm font-semibold">
                            Verified Participant
                          </span>
                        </div>
                      </div>

                      {/* Right: Contact Info */}
                      <div className="space-y-3 flex-1 max-w-md mx-auto lg:mx-0">
                        <div className="flex items-center gap-3 text-base bg-gray-800/30 rounded-lg px-4 py-3">
                          <HiEnvelope className="text-cyan-400 text-xl flex-shrink-0" />
                          <span className="text-gray-300 truncate font-medium">
                            {userData.Email}
                          </span>
                        </div>
                        {userData.Phone && (
                          <div className="flex items-center gap-3 text-base bg-gray-800/30 rounded-lg px-4 py-3">
                            <HiPhone className="text-cyan-400 text-xl flex-shrink-0" />
                            <span className="text-gray-300 font-medium">
                              {userData.Phone}
                            </span>
                          </div>
                        )}
                        {userData.College && (
                          <div className="flex items-center gap-3 text-base bg-gray-800/30 rounded-lg px-4 py-3">
                            <HiAcademicCap className="text-cyan-400 text-xl flex-shrink-0" />
                            <span className="text-gray-300 truncate font-medium">
                              {userData.College}
                            </span>
                          </div>
                        )}
                        {userData.Department && (
                          <div className="flex items-center gap-3 text-base bg-gray-800/30 rounded-lg px-4 py-3">
                            <HiUser className="text-cyan-400 text-xl flex-shrink-0" />
                            <span className="text-gray-300 font-medium">
                              {userData.Department}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex-shrink-0">
                    <div className="bg-gradient-to-br from-cyan-600/20 to-blue-600/20 border border-cyan-500/30 rounded-xl p-8 min-w-[160px]">
                      <div className="text-5xl font-bold text-cyan-400 mb-2 text-center">
                        {userData.totalEvents || 0}
                      </div>
                      <div className="text-sm text-gray-400 font-medium text-center whitespace-nowrap">
                        Events Registered
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Two Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left: Digital Assets */}
                <div className="lg:col-span-1 space-y-6">
                  <div className="bg-gradient-to-br from-gray-900/90 to-black/90 border border-gray-700/30 rounded-2xl p-6 backdrop-blur-sm shadow-xl">
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                      <HiSparkles className="text-cyan-400" />
                      Digital Assets
                    </h3>

                    {/* Feature Tabs */}
                    <div className="grid grid-cols-3 gap-2 mb-6">
                      {features.map((feature) => (
                        <button
                          key={feature.id}
                          onClick={() => setSelectedFeature(feature.id)}
                          className={`p-3 rounded-lg transition-all duration-200 ${
                            selectedFeature === feature.id
                              ? "bg-cyan-500/20 border-2 border-cyan-500/50"
                              : "bg-gray-800/50 border-2 border-gray-700 hover:border-gray-600"
                          }`}
                        >
                          <feature.icon
                            className={`w-6 h-6 mx-auto mb-1 ${
                              selectedFeature === feature.id
                                ? "text-cyan-400"
                                : "text-gray-400"
                            }`}
                          />
                          <span
                            className={`text-xs font-medium block ${
                              selectedFeature === feature.id
                                ? "text-white"
                                : "text-gray-400"
                            }`}
                          >
                            {feature.title.split(" ")[0]}
                          </span>
                        </button>
                      ))}
                    </div>

                    {/* Feature Content */}
                    <div className="bg-black/40 rounded-xl p-4 border border-gray-700">
                      {selectedFeature === "badge" && (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h4 className="text-white font-semibold text-sm">
                              Digital ID Badge
                            </h4>
                            <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-xs font-semibold">
                              Official
                            </span>
                          </div>
                          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-lg p-4 border border-blue-500/30">
                            <div className="flex items-center gap-3">
                              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                <HiShieldCheck className="text-white text-2xl" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-white font-semibold text-sm truncate">
                                  {userData.Name}
                                </p>
                                <p className="text-gray-300 text-xs truncate">
                                  {userData.College || "Participant"}
                                </p>
                                <p className="text-blue-300 text-xs font-mono mt-1">
                                  ID: {userData.Email?.split("@")[0]}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-2 rounded-lg text-xs font-semibold hover:opacity-90 transition-opacity">
                              <HiArrowDownTray className="inline mr-1" />
                              Download
                            </button>
                            <button className="flex-1 bg-gray-700 text-white py-2 rounded-lg text-xs font-semibold hover:bg-gray-600 transition-colors">
                              <HiArrowUpTray className="inline mr-1" />
                              Share
                            </button>
                          </div>
                        </div>
                      )}

                      {selectedFeature === "certificate" && (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h4 className="text-white font-semibold text-sm">
                              Participation Certificate
                            </h4>
                            <span className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded text-xs font-semibold">
                              Verified
                            </span>
                          </div>
                          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg p-4 border border-purple-500/30 text-center py-6">
                            <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                              <HiCheckCircle className="text-white text-xl" />
                            </div>
                            <p className="text-white font-semibold text-sm">
                              Event Participation
                            </p>
                            <p className="text-gray-300 text-xs mt-1">
                              {userData.totalEvents || 0} Events
                            </p>
                            <p className="text-purple-300 text-xs mt-2 font-mono">
                              CERT-{Date.now().toString().slice(-8)}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg text-xs font-semibold hover:opacity-90 transition-opacity">
                              <HiArrowDownTray className="inline mr-1" />
                              Download PDF
                            </button>
                            <button className="px-3 bg-gray-700 text-white py-2 rounded-lg text-xs font-semibold hover:bg-gray-600 transition-colors">
                              <HiPrinter className="text-base" />
                            </button>
                          </div>
                        </div>
                      )}

                      {selectedFeature === "qr" && (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h4 className="text-white font-semibold text-sm">
                              QR Access Pass
                            </h4>
                            <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded text-xs font-semibold">
                              Active
                            </span>
                          </div>
                          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-lg p-4 border border-green-500/30 text-center py-6">
                            <div className="w-32 h-32 mx-auto mb-4 bg-white rounded-lg flex items-center justify-center">
                              <HiQrCode className="text-gray-800 text-5xl" />
                            </div>
                            <p className="text-white font-semibold text-sm">
                              Event Access Pass
                            </p>
                            <p className="text-gray-300 text-xs mt-1">
                              Valid for all registered events
                            </p>
                            <p className="text-green-300 text-xs font-mono mt-2 font-semibold">
                              SCAN FOR ENTRY
                            </p>
                          </div>
                          <button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-2 rounded-lg text-xs font-semibold hover:opacity-90 transition-opacity">
                            <HiArrowDownTray className="inline mr-1" />
                            Download QR Code
                          </button>
                        </div>
                      )}
                    </div>

                    <p className="text-xs text-gray-400 text-center mt-4">
                      All digital assets are securely verified
                    </p>
                  </div>
                </div>

                {/* Right: Events List */}
                <div className="lg:col-span-2">
                  <div className="bg-gradient-to-br from-gray-900/90 to-black/90 border border-gray-700/30 rounded-2xl p-6 backdrop-blur-sm shadow-xl">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <HiTicket className="text-cyan-400" />
                        Event Registrations
                      </h3>
                      <span className="bg-cyan-500/20 text-cyan-300 px-3 py-1.5 rounded-full text-xs font-semibold border border-cyan-500/30">
                        {userData.registrations?.length || 0} Event
                        {userData.registrations?.length !== 1 ? "s" : ""}
                      </span>
                    </div>

                    <div className="space-y-4">
                      {userData.registrations?.length > 0 ? (
                        userData.registrations.map((registration, index) => (
                          <div
                            key={index}
                            className="bg-gradient-to-r from-gray-900/50 to-black/50 border border-gray-700 rounded-xl p-5 hover:border-cyan-500/40 transition-all duration-200"
                          >
                            <div className="flex items-start gap-4">
                              {/* Event Icon */}
                              <div
                                className={`w-12 h-12 bg-gradient-to-br ${registration.color} rounded-lg flex items-center justify-center flex-shrink-0`}
                              >
                                {typeof registration.icon === "function" ? (
                                  <registration.icon className="text-white text-xl" />
                                ) : (
                                  <span className="text-xl">
                                    {registration.icon}
                                  </span>
                                )}
                              </div>

                              {/* Event Details */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between mb-2">
                                  <div className="flex-1 min-w-0">
                                    <h4 className="text-white font-semibold text-base mb-1 truncate">
                                      {registration.eventName}
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                      <span
                                        className={`bg-gradient-to-r ${registration.color}/20 text-cyan-300 px-2 py-0.5 rounded-full text-xs font-semibold`}
                                      >
                                        {registration.category}
                                      </span>
                                      {registration.teamName &&
                                        registration.teamName !== "N/A" && (
                                          <span className="bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full text-xs font-semibold">
                                            Team: {registration.teamName}
                                          </span>
                                        )}
                                    </div>
                                  </div>
                                  <div className="ml-4 flex-shrink-0">
                                    <div className="inline-flex items-center gap-1.5 bg-green-500/20 text-green-400 px-2 py-1 rounded-full border border-green-500/30">
                                      <HiCheckCircle className="text-sm" />
                                      <span className="text-xs font-semibold">
                                        Confirmed
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                                  {registration.registrationDate && (
                                    <div className="flex items-center gap-2">
                                      <HiCalendar className="text-gray-400 text-base flex-shrink-0" />
                                      <div className="min-w-0">
                                        <p className="text-gray-400 text-xs">
                                          Registered
                                        </p>
                                        <p className="text-white text-xs font-medium truncate">
                                          {(() => {
                                            try {
                                              // Handle Date() format from Google Sheets: Date(2025,10,13,22,46,57)
                                              const dateStr =
                                                registration.registrationDate;

                                              if (dateStr.includes("Date(")) {
                                                const match = dateStr.match(
                                                  /Date\((\d+),(\d+),(\d+),(\d+),(\d+),(\d+)\)/
                                                );
                                                if (match) {
                                                  const [
                                                    _,
                                                    year,
                                                    month,
                                                    day,
                                                    hour,
                                                    minute,
                                                    second,
                                                  ] = match;
                                                  // Note: Google Sheets months are 0-indexed (0=Jan, 11=Dec)
                                                  const date = new Date(
                                                    year,
                                                    month,
                                                    day,
                                                    hour,
                                                    minute,
                                                    second
                                                  );
                                                  return (
                                                    date.toLocaleDateString(
                                                      "en-US",
                                                      {
                                                        month: "short",
                                                        day: "numeric",
                                                        year: "numeric",
                                                      }
                                                    ) +
                                                    " • " +
                                                    date.toLocaleTimeString(
                                                      "en-US",
                                                      {
                                                        hour: "numeric",
                                                        minute: "2-digit",
                                                        hour12: true,
                                                      }
                                                    )
                                                  );
                                                }
                                              }

                                              // Try parsing as normal date
                                              const date = new Date(dateStr);
                                              if (!isNaN(date.getTime())) {
                                                return (
                                                  date.toLocaleDateString(
                                                    "en-US",
                                                    {
                                                      month: "short",
                                                      day: "numeric",
                                                      year: "numeric",
                                                    }
                                                  ) +
                                                  " • " +
                                                  date.toLocaleTimeString(
                                                    "en-US",
                                                    {
                                                      hour: "numeric",
                                                      minute: "2-digit",
                                                      hour12: true,
                                                    }
                                                  )
                                                );
                                              }
                                              return dateStr;
                                            } catch {
                                              return registration.registrationDate;
                                            }
                                          })()}
                                        </p>
                                      </div>
                                    </div>
                                  )}

                                  {registration.transactionId &&
                                    registration.transactionId !== "N/A" && (
                                      <div className="flex items-center gap-2">
                                        <HiSparkles className="text-gray-400 text-base flex-shrink-0" />
                                        <div className="min-w-0">
                                          <p className="text-gray-400 text-xs">
                                            Transaction ID
                                          </p>
                                          <p className="text-cyan-400 text-xs font-mono font-semibold truncate">
                                            {registration.transactionId}
                                          </p>
                                        </div>
                                      </div>
                                    )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-12">
                          <div className="w-16 h-16 mx-auto mb-4 bg-gray-800/50 rounded-full flex items-center justify-center">
                            <HiTicket className="text-gray-600 text-3xl" />
                          </div>
                          <h4 className="text-base font-semibold text-gray-400 mb-2">
                            No Events Found
                          </h4>
                          <p className="text-gray-500 text-sm">
                            You haven't registered for any events yet.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Note */}
              <div className="text-center">
                <div className="inline-flex items-center gap-2 text-gray-400 text-sm bg-gray-900/50 px-4 py-2 rounded-full border border-gray-700">
                  <HiShieldCheck className="text-cyan-400" />
                  <p>
                    All digital assets are securely verified.{" "}
                    <a
                      href="/contact"
                      className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
                    >
                      Need help?
                    </a>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Add CSS animations */}
        <style jsx>{`
          @keyframes gradient {
            0%,
            100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
          }
          .animate-gradient {
            background-size: 200% 200%;
            animation: gradient 3s ease infinite;
          }
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-slideUp {
            animation: slideUp 0.6s ease forwards;
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.5s ease forwards;
          }
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-slideDown {
            animation: slideDown 0.3s ease forwards;
          }
        `}</style>
      </div>
    </PageLayout>
  );
};

export default Profile;
