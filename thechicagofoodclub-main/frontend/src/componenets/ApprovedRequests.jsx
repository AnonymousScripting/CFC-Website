import { useEffect, useState } from "react";
import ApprovedMemberModal from "../componenets/ApprovedMembersModal";
import axios from "../axios/axiosInstance";
import toast from "react-hot-toast";
import DeactivateModal from "./DeactivateModal";

export default function DashboardOverview() {
  const [approvedMembers, setApprovedMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMember, setSelectedMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deactivateMember, setDeactivateMember] = useState(null);
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);

  const [activatingId, setActivatingId] = useState(null);

  const handleDeactivate = (member) => {
    setDeactivateMember(member);
    setIsDeactivateModalOpen(true);
  };

  const submitDeactivation = async (reason) => {
    try {
      await axios.post("/admin/membership/change-verification", {
        userId: deactivateMember?.user.id,
        isVerified: false, // send isVerified to backend
        reason,
      });
      toast.success("Member blocked successfully!");

      setApprovedMembers((prev) =>
        prev.map((m) =>
          m.user.id === deactivateMember.user.id
            ? { ...m, user: { ...m.user, isActive: false } } // update frontend state
            : m
        )
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to block member");
    } finally {
      setIsDeactivateModalOpen(false);
      setDeactivateMember(null);
    }
  };

  const fetchApprovedMembers = async () => {
    try {
      const res = await axios.get("/admin/membership/approvedMembers");
      setApprovedMembers(res.data.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load members");
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

  const toggleVerification = async (member, status) => {
    setActivatingId(member.user.id);
    try {
      await axios.post("/admin/membership/change-verification", {
        userId: member.user.id,
        isVerified: status, // send to backend
      });
      toast.success("Status updated successfully!");

      setApprovedMembers((prev) =>
        prev.map((m) =>
          m.user.id === member.user.id
            ? { ...m, user: { ...m.user, isActive: status } } // update frontend state
            : m
        )
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to update member status");
    } finally {
      setActivatingId(null);
    }
  };


  if (error) return <p className="text-red-500">{error}</p>;

return (
  <div className="px-8 bg-gray-50 min-h-screen">
    <h2 className="text-3xl font-bold mb-8 text-gray-800">
      Approved Members
    </h2>

    {loading ? (
      <div className="flex items-center justify-center min-h-90">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#c7a462]"></div>
      </div>
    ) : (
      <div>
        <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-100">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-[#c7a462] text-white">
              <tr>
                <th className="px-4 py-2">Full Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Phone</th>
                <th className="px-4 py-2">Profession</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {approvedMembers.length > 0 ? (
                approvedMembers.map((member) => (
                  <tr
                    key={member.user.id}
                    className="text-center border-b border-gray-100 hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-2">{member.fullName}</td>
                    <td className="px-4 py-2">{member.email}</td>
                    <td className="px-4 py-2">{member.phoneNumber}</td>
                    <td className="px-4 py-2">{member.profession}</td>
                    <td className="px-4 py-2 flex justify-center gap-2">
                      <button
                        onClick={() => handleView(member)}
                        className="w-28 px-3 py-1 bg-[#c7a462] text-white rounded-md hover:bg-black transition"
                      >
                        View
                      </button>

                      {member.user.isActive ? (
                        <button
                          onClick={() => handleDeactivate(member)}
                          className="w-28 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-700 transition"
                        >
                          Block
                        </button>
                      ) : (
                        <button
                          onClick={() => toggleVerification(member, true)}
                          disabled={activatingId === member.user.id}
                          className={`w-28 px-3 py-1 rounded-md text-white transition ${
                            activatingId === member.user.id
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-green-500 hover:bg-green-700"
                          }`}
                        >
                          {activatingId === member.user.id
                            ? "Unblocking..."
                            : "Unblock"}
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-4 py-6 text-gray-500 text-center">
                    No members found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <ApprovedMemberModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          member={selectedMember}
        />
        <DeactivateModal
          isOpen={isDeactivateModalOpen}
          onClose={() => setIsDeactivateModalOpen(false)}
          member={deactivateMember}
          onSubmit={submitDeactivation}
        />
      </div>
    )}
  </div>
);

}
