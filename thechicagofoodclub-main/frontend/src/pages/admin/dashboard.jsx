import { useState, useEffect } from "react";
import DashboardOverview from "../../componenets/dashboardOverview";
import MembershipRequests from "../../componenets/membershipRequests";
import ApprovedRequests from "../../componenets/ApprovedRequests";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../../redux/user/userSlice";
import {
  LayoutDashboard,
  Users,
  CheckCircle,
  Settings,
  LogOut,
} from "lucide-react";

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState("dashboard");
  const [headerHeight, setHeaderHeight] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    const header = document.querySelector("header");
    if (header) {
      setHeaderHeight(header.offsetHeight);
    }

    const handleResize = () => {
      const header = document.querySelector("header");
      if (header) {
        setHeaderHeight(header.offsetHeight);
      }
      if (window.innerWidth < 640) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    // Run once on load
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navigateToView = (view) => {
    setActivePage(view);

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 639.98px)").matches
    ) {
      setSidebarOpen(false);
    }
  };

  const navItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "dashboard",
    },
    {
      name: "Membership Requests",
      icon: <Users size={20} />,
      path: "membershipRequests",
    },
    {
      name: "Approved Requests",
      icon: <CheckCircle size={20} />,
      path: "approvedRequests",
    },
  ];

  // Decide which component to render
  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <DashboardOverview />;
      case "membershipRequests":
        return <MembershipRequests />;
      case "approvedRequests":
        return <ApprovedRequests />;

      default:
        return <div>Select a page</div>;
    }
  };

  return (
    <div className="relative flex bg-gray-100 min-h-screen">
      <aside
        className={`
    bg-white transition-all duration-300 flex flex-col
    fixed top-0 left-0 h-full z-40 sm:static sm:h-auto
    ${sidebarOpen ? "w-64" : "w-16"}
  `}
        style={{ marginTop: headerHeight }}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <span
            className={`text-lg font-semibold text-black ${
              sidebarOpen ? "block" : "hidden"
            }`}
          >
            Admin Panel
          </span>
          <button
            className="text-2xl text-black"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            &#9776;
          </button>
        </div>

        <nav className="mt-4 space-y-2 px-2 flex-grow">
          {navItems.map((item) => (
            <button
              key={item.path}
              className={`w-full flex items-center space-x-4 text-left px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                activePage === item.path
                  ? "bg-[#c7a462] text-white"
                  : "hover:bg-gray-200 text-black"
              }`}
              onClick={() => navigateToView(item.path)}
            >
              <span
                className={`${
                  activePage === item.path ? "text-white" : "text-gray-500"
                }`}
              >
                {item.icon}
              </span>
              <span className={`${sidebarOpen ? "block" : "hidden"}`}>
                {item.name}
              </span>
            </button>
          ))}

          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium text-red-600 hover:bg-red-100 transition"
          >
            <span className="text-red-600">
              <LogOut size={20} />
            </span>
            <span className={`${sidebarOpen ? "block" : "hidden"}`}>
              Logout
            </span>
          </button>
        </nav>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm sm:hidden z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main
        className="flex-1 min-w-0 flex flex-col min-h-screen p-6 bg-white"
        style={{ marginTop: headerHeight }}
      >
        <div className="flex-1 p-6">{renderPage()}</div>
      </main>
    </div>
  );
}
