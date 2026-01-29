import { LogOut, Edit } from "lucide-react";
import { logout } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

export default function UserHeader({ user, onEditClick }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="bg-gradient-to-r from-black to-gray-900 text-white shadow-lg">
      <div className="max-w-5xl mx-auto p-6 flex flex-col lg:flex-row items-center lg:items-center justify-between">
        {/* Avatar + Info */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4">
          {/* Avatar */}
          <div className="relative w-16 h-16 rounded-full bg-[#c7a462] flex items-center justify-center overflow-hidden">
            {user?.profilePicture ? (
              <img
                src={user.profilePicture}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-2xl font-bold text-black">
                {user.initials}
              </span>
            )}
            <button
              onClick={onEditClick}
              className="absolute bottom-0 right-0 bg-gray-800 p-1 rounded-full border border-white"
            >
              <Edit className="w-3 h-3 text-white" />
            </button>
          </div>

          {/* User Info */}
          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-semibold">Welcome back,</h2>
            <h1 className="text-3xl font-bold text-[#c7a462]">{user.name}</h1>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mt-2 text-sm">
              <span className="px-3 py-1 rounded-full bg-black/80 border border-[#c7a462] text-[#c7a462] font-medium">
                {user.membership}
              </span>
              <span className="text-gray-300">
                Since{" "}
                {user.since ? format(new Date(user.since), "MMMM d, yyyy") : "-"}
              </span>
            </div>

            <p className="text-gray-400 mt-2 max-w-lg">
              Your private gateway to Chicago’s most exclusive culinary
              experiences
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-4 lg:mt-0 justify-center sm:justify-start">
          <button
            onClick={onEditClick}
            className="flex items-center gap-2 cursor-pointer bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
          >
            <Edit className="w-4 h-4" /> Edit Profile
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-[#c7a462] hover:saturate-150 cursor-pointer text-black font-medium px-4 py-2 rounded-lg"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
