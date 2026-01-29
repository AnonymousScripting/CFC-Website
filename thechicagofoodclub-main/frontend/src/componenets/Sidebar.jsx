export default function Sidebar({
  open,
  onClose,
  navLinks,
  isAuthenticated,
  isAdmin,
  navigate,
  scrollToSection,
  activeLink,
  setActiveLink,
}) {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-white text-black z-50 transform transition-transform duration-300 ${
        open ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-[#c7a462]">Menu</h2>
        <button onClick={onClose} className="text-[#c7a462] text-2xl">
          ✕
        </button>
      </div>

      {/* Links vertically centered */}
      <div className="flex flex-col items-center justify-center h-[80%] space-y-6">
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => {
              setActiveLink(link.id);
              scrollToSection(link.id);
              onClose();
            }}
            className={`text-lg px-4 py-2 rounded transition-colors duration-300 ${
              activeLink === link.id
                ? "bg-[#c7a462] text-white font-semibold"
                : "text-[#c7a462] hover:bg-[#c7a462] hover:text-white"
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
                onClose();
              }}
              className={`text-lg px-4 py-2 rounded transition-colors duration-300 ${
                activeLink === "login"
                  ? "bg-[#c7a462] text-white font-semibold"
                  : "text-[#c7a462] hover:bg-[#c7a462] hover:text-white"
              }`}
            >
              Login
            </button>

            <button
              onClick={() => {
                setActiveLink("join");
                scrollToSection("join");
                onClose();
              }}
              className={`text-lg px-4 py-2 rounded transition-colors duration-300 ${
                activeLink === "join"
                  ? "bg-[#c7a462] text-white font-semibold"
                  : "text-[#c7a462] hover:bg-[#c7a462] hover:text-white"
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
              onClose();
            }}
            className={`text-lg px-4 py-2 rounded transition-colors duration-300 ${
              activeLink === "dashboard"
                ? "bg-[#c7a462] text-white font-semibold"
                : "text-[#c7a462] hover:bg-[#c7a462] hover:text-white"
            }`}
          >
            Dashboard
          </button>
        )}
      </div>
    </div>
  );
}
