import { useState, useEffect } from "react";
import UserHeader from "../../componenets/UserHeader";
import { useSelector, useDispatch } from "react-redux";
import ApprovedMemberModal from "../../componenets/ApprovedMembersModal";
import axios from "../../axios/axiosInstance";
import EditProfileModal from "../../componenets/EditProfileModal";
import EventsCalender from "../../componenets/EventsCalender";
import { updateUser } from "../../redux/user/userSlice";
import MemberDirectory from "../../componenets/MemberDirectory";

export default function UserDashboard() {
  const { currentUser } = useSelector((state) => state.user);
  const [approvedMembers, setApprovedMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMember, setSelectedMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleProfileUpdated = async (updatedUser) => {
    dispatch(updateUser(updatedUser));
    await fetchApprovedMembers();
  };

  const fetchApprovedMembers = async () => {
    try {
      const membersResponse = await axios.get(
        `/admin/membership/verifiedMembers?userId=${currentUser.id}`
      );
      setApprovedMembers(membersResponse.data.data);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApprovedMembers();
  }, []);

  const handleView = (member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  function getInitials(fullname = "") {
    return fullname
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#c7a462]"></div>
      </div>
    );
  }
  if (error) return <p className="text-red-500">{error}</p>;

  return (
   <div className="bg-gray-100 min-h-screen">
  <UserHeader
    user={{
      initials: getInitials(currentUser?.fullName || ""),
      name: currentUser?.fullName,
      membership: "Distinguished Member",
      since: currentUser?.createdAt,
      profilePicture: currentUser?.profilePicture,
    }}
    onEditClick={() => setIsEditModalOpen(true)}
  />

  {/* Tab Content */}
  <div className="px-4 sm:px-6 md:px-8 lg:px-12 pb-12 mt-10 max-w-7xl mx-auto">
    {/* Calendar */}
    <div className="mb-10">
      <EventsCalender />
    </div>

    {/* Approved Members Directory */}
    <MemberDirectory
      members={approvedMembers}
      onView={handleView}
      getInitials={getInitials}
    />
  </div>

  {/* Modals */}
  <ApprovedMemberModal
    isOpen={isModalOpen}
    onClose={() => setIsModalOpen(false)}
    member={selectedMember}
  />

  <EditProfileModal
    isOpen={isEditModalOpen}
    onClose={() => setIsEditModalOpen(false)}
    user={currentUser}
    onProfileUpdated={handleProfileUpdated}
  />
</div>

  );
}
