import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Profile", path: "/profile" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/90 backdrop-blur-xl shadow-lg shadow-cyan-500/10 border-b border-cyan-500/30"
          : "bg-black/60 backdrop-blur-md border-b border-cyan-500/10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo with enhanced styling */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
              <div className="relative w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-cyan-500/50">
                <span className="text-white font-bold text-xl">CE</span>
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="text-white font-bold text-2xl">
                College{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  Expo
                </span>
              </div>
              <div className="text-xs text-gray-400 -mt-1">
                Innovation Unleashed
              </div>
            </div>
          </Link>

          {/* Desktop Navigation with enhanced styling */}
          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 group ${
                  isActive(link.path)
                    ? "text-white"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {isActive(link.path) && (
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl"></div>
                )}
                {!isActive(link.path) && (
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/20 group-hover:to-purple-500/20 rounded-xl transition-all duration-300"></div>
                )}
                <span className="relative z-10">{link.name}</span>
                {isActive(link.path) && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent"></div>
                )}
              </Link>
            ))}
          </div>

          {/* Mobile menu button with animation */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative w-10 h-10 text-gray-300 hover:text-cyan-500 transition-colors focus:outline-none group"
          >
            <div className="absolute inset-0 bg-cyan-500/0 group-hover:bg-cyan-500/20 rounded-lg transition-colors duration-300"></div>
            <svg
              className="w-6 h-6 mx-auto transition-transform duration-300"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation with enhanced styling */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-gradient-to-b from-black/95 to-gray-900/95 backdrop-blur-xl border-t border-cyan-500/20 shadow-lg">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {navLinks.map((link, index) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                style={{ animationDelay: `${index * 50}ms` }}
                className={`block px-5 py-3 rounded-xl text-base font-semibold transition-all duration-300 animate-fade-in-up ${
                  isActive(link.path)
                    ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/30 transform scale-105"
                    : "text-gray-300 hover:text-white bg-white/5 hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-purple-500/20 hover:scale-105"
                }`}
              >
                <span className="flex items-center justify-between">
                  {link.name}
                  {isActive(link.path)}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
