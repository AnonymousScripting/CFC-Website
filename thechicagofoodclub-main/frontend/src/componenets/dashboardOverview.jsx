import { useEffect, useState } from "react";
import ApprovedMemberModal from "./ApprovedMembersModal";
import axios from "../axios/axiosInstance";

export default function DashboardOverview() {
  const [stats, setStats] = useState({ pending: 0, approved: 0 });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMember, setSelectedMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchStatsAndMembers = async () => {
      try {
        const statsResponse = await axios.get("/admin/membership/stats");
        setStats(statsResponse.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchStatsAndMembers();
  }, []);

  const handleView = (member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen">
  //       <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#c7a462]"></div>
  //     </div>
  //   );
  // }

  if (error) return <p className="text-red-500">{error}</p>;

 return (
  <div className="px-8 bg-gray-50 min-h-screen">
    <h2 className="text-3xl font-bold mb-8 text-gray-800">
      Dashboard Overview
    </h2>

    {loading ? (
      <div className="flex items-center justify-center min-h-90">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#c7a462]"></div>
      </div>
    ) : (
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-blue-100 rounded-lg shadow">
            <p className="text-lg font-semibold">Pending Requests</p>
            <p className="text-2xl">{stats.pending}</p>
          </div>
          <div className="p-4 bg-green-100 rounded-lg shadow">
            <p className="text-lg font-semibold">Approved Requests</p>
            <p className="text-2xl">{stats.approved}</p>
          </div>
        </div>

        {/* Modal */}
        <ApprovedMemberModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          member={selectedMember}
        />
      </div>
    )}
  </div>
);

}
