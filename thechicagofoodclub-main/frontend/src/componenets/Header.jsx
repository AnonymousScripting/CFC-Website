import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu, X } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { currentUser, isAuthenticated } = useSelector((state) => state.user);
  const isAdmin = currentUser?.isAdmin;
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setSidebarOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: "About", id: "about" },
    { name: "Contact", id: "contact" },
    { name: "Benefits", id: "benefits" },
  ];

  const scrollToSection = (id) => {
    setActiveLink(id);
    if (window.location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
    setSidebarOpen(false);
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
          isHome
            ? scrolled
              ? "bg-white shadow-md"
              : "bg-transparent"
            : scrolled
            ? "bg-white shadow-md"
            : "bg-black z-50"
        }`}
    >
      <div className="max-w-8xl mx-auto flex justify-between items-center px-6 py-4 relative">
        {/* Logo Left */}
        <h1
          onClick={() => scrollToSection("home")}
          className={`text-2xl font-bold font-playfair cursor-pointer duration-300 ${
            scrolled ? "text-black" : "text-white"
          }`}
        >
          Chicago Food Club
        </h1>

        {/* Desktop Nav Right */}
        {!isAdmin && (
          <nav className="hidden sm:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`relative group transition-colors duration-300 cursor-pointer font-montserrat ${
                  scrolled
                    ? "text-[#c8a76f] hover:text-black"
                    : "text-[#c8a76f] hover:text-white"
                }`}
              >
                {link.name}
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#c7a462] transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}

            {!isAuthenticated ? (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className={`relative group transition-colors duration-300 cursor-pointer ${
                    scrolled
                      ? "text-[#c8a76f] hover:text-black"
                      : "text-[#c8a76f] hover:text-white"
                  }`}
                >
                  Member Login
                  <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#c8a76f] transition-all duration-300 group-hover:w-full"></span>
                </button>
                <button
                  onClick={() => scrollToSection("join")}
                  className={`bg-[#c8a76f] text-white px-4 sm:px-6 py-2 border border-[#c8a76f] transition-colors duration-300
                    hover:bg-black cursor-pointer hover:border-black font-montserrat
                    ${
                      scrolled
                        ? "hover:border-black"
                        : "hover:border-white/30"
                    }`}
                >
                  Join Now
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate("/user")}
                className={` font-montserrat bg-[#c8a76f] rounded-xl text-white px-4 sm:px-6 py-2  transition-colors duration-300
                  hover:saturate-150 cursor-pointer hover:border-[#c8176f]`}
              >
                Dashboard
              </button>
            )}
          </nav>
        )}

        {/* Mobile hamburger menu (still right side) */}
        {/* <div ref={dropdownRef} className="sm:hidden relative ml-auto">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2">
            {sidebarOpen ? (
              <X
                size={28}
                className={`transition-colors ${
                  scrolled ? "text-black" : "text-white"
                }`}
              />
            ) : (
              <Menu
                size={28}
                className={`transition-colors ${
                  scrolled ? "text-black" : "text-white"
                }`}
              />
            )}
          </button>

          {sidebarOpen && (
            <div className="absolute -right-8 mt-4 w-screen bg-white shadow-lg rounded-lg py-3 z-50">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`block w-full text-center px-4 py-2 text-[#c7a462] hover:bg-[#c7a462] hover:text-white transition-colors font-montserrat ${
                    activeLink === link.id ? "bg-[#c7a462] text-white" : ""
                  }`}
                >
                  {link.name}
                </button>
              ))}

              {!isAuthenticated ? (
                <>
                  <button
                    onClick={() => {
                      navigate("/login");
                      setActiveLink("login");
                      setSidebarOpen(false);
                    }}
                    className={`font-montserrat block w-full text-center px-4 py-2 text-[#c7a462] hover:bg-[#c7a462] hover:text-white ${
                      activeLink === "login" ? "bg-[#c7a462] text-white" : ""
                    }`}
                  >
                    Login
                  </button>

                  <button
                    onClick={() => scrollToSection("join")}
                    className={`font-montserrat block w-full text-center px-4 py-2 text-[#c7a462] hover:bg-[#c7a462] hover:text-white ${
                      activeLink === "join" ? "bg-[#c7a462] text-white" : ""
                    }`}
                  >
                    Join Now
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    navigate(isAdmin ? "/admin" : "/user");
                    setActiveLink("dashboard");
                    setSidebarOpen(false);
                  }}
                  className={`font-montserrat block w-full text-left px-4 py-2 text-[#c7a462] hover:bg-[#c7a462] hover:text-white ${
                    activeLink === "dashboard" ? "bg-[#c7a462] text-white" : ""
                  }`}
                >
                  Dashboard
                </button>
              )}
            </div>
          )}
        </div> */}
        {/* Mobile hamburger menu (only for non-admins) */}
{!isAdmin && (
  <div ref={dropdownRef} className="sm:hidden relative ml-auto">
    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2">
      {sidebarOpen ? (
        <X
          size={28}
          className={`transition-colors ${
            scrolled ? "text-black" : "text-white"
          }`}
        />
      ) : (
        <Menu
          size={28}
          className={`transition-colors ${
            scrolled ? "text-black" : "text-white"
          }`}
        />
      )}
    </button>

    {sidebarOpen && (
      <div className="absolute -right-6 mt-4 w-screen bg-white shadow-lg rounded-lg py-3 z-50">
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => scrollToSection(link.id)}
            className={`block w-full text-center px-4 py-2 text-[#c7a462] hover:bg-[#c7a462] hover:text-white transition-colors font-montserrat ${
              activeLink === link.id ? "bg-[#c7a462] text-white" : ""
            }`}
          >
            {link.name}
          </button>
        ))}

        {!isAuthenticated ? (
          <>
            <button
              onClick={() => {
                navigate("/login");
                setActiveLink("login");
                setSidebarOpen(false);
              }}
              className={`font-montserrat block w-full text-center px-4 py-2 text-[#c7a462] hover:bg-[#c7a462] hover:text-white ${
                activeLink === "login" ? "bg-[#c7a462] text-white" : ""
              }`}
            >
              Login
            </button>

            <button
              onClick={() => scrollToSection("join")}
              className={`font-montserrat block w-full text-center px-4 py-2 text-[#c7a462] hover:bg-[#c7a462] hover:text-white ${
                activeLink === "join" ? "bg-[#c7a462] text-white" : ""
              }`}
            >
              Join Now
            </button>
          </>
        ) : (
          <button
            onClick={() => {
              navigate("/user");
              setActiveLink("dashboard");
              setSidebarOpen(false);
            }}
            className={`font-montserrat block w-full text-center px-4 py-2 text-[#c7a462] hover:bg-[#c7a462] hover:text-white ${
              activeLink === "dashboard" ? "bg-[#c7a462] text-white" : ""
            }`}
          >
            Dashboard
          </button>
        )}
      </div>
    )}
  </div>
)}

      </div>
    </header>
  );
}
