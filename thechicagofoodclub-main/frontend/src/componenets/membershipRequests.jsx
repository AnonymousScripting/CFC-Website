import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../axios/axiosInstance";
import toast from "react-hot-toast";
import ApprovedMemberModal from "./ApprovedMembersModal";
import { Eye, Check, X } from "lucide-react";
import RejectionModal from "./RejectionModal";

export default function MembershipRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentRequest, setCurrentRequest] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [selectedMember, setSelectedMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rejectionError, setRejectionError] = useState("");

  const [actionLoading, setActionLoading] = useState({});

  const { currentUser } = useSelector((state) => state.user);
  const adminId = currentUser?.id;

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get("/admin/membership/pendingRequests");
        setRequests(res.data.data);
      } catch (err) {
        setError("Failed to load requests");
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const handleAccept = async (requestId) => {
    setActionLoading((prev) => ({ ...prev, [requestId]: true }));
    try {
      await axios.post(`/admin/membership/respond/${requestId}`, {
        adminId,
        action: "approved",
      });
      setRequests((prev) => prev.filter((r) => r.id !== requestId));
      toast.success(`Request accepted successfully`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to accept request");
    } finally {
      setActionLoading((prev) => ({ ...prev, [requestId]: false }));
    }
  };

  const handleRejectClick = (req) => {
    setCurrentRequest(req);
    setShowModal(true);
  };

  const handleRejectSubmit = async () => {
    if (!rejectionReason.trim()) {
      setRejectionError("Rejection reason is required");
      return;
    }
    setRejectionError("");

    setActionLoading((prev) => ({ ...prev, [currentRequest.id]: true }));
    try {
      await axios.post(`/admin/membership/respond/${currentRequest.id}`, {
        adminId,
        action: "rejected",
        rejectionReason,
      });
      toast.success(`Request rejected successfully`);
      setRequests((prev) => prev.filter((r) => r.id !== currentRequest.id));

      setShowModal(false);
      setRejectionReason("");
      setCurrentRequest(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to reject request");
    } finally {
      setActionLoading((prev) => ({ ...prev, [currentRequest.id]: false }));
    }
  };
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
      Pending Requests
    </h2>

    {loading ? (
      <div className="flex items-center justify-center min-h-90">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#c7a462]"></div>
      </div>
    ) : requests.length === 0 ? (
      <p className="text-gray-600">No pending requests</p>
    ) : (
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
            {requests.map((member) => (
              <tr
                key={member.id}
                className="text-center border-b border-gray-100 hover:bg-gray-50 transition"
              >
                <td className="px-4 py-2">{member.fullName}</td>
                <td className="px-4 py-2">{member.email}</td>
                <td className="px-4 py-2">{member.phoneNumber}</td>
                <td className="px-4 py-2">{member.profession}</td>
                <td className="px-4 py-2">
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      onClick={() => handleView(member)}
                      className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                    >
                      <Eye className="h-4 w-4 md:hidden" />
                      <span className="hidden md:inline">View</span>
                    </button>

                    <button
                      onClick={() => handleAccept(member.id)}
                      disabled={actionLoading[member.id]}
                      className={`px-3 py-1 rounded-md text-white transition ${
                        actionLoading[member.id]
                          ? "bg-green-300 cursor-not-allowed"
                          : "bg-green-500 hover:bg-green-600"
                      }`}
                    >
                      <Check className="h-4 w-4 md:hidden" />
                      <span className="hidden md:inline">
                        {actionLoading[member.id] ? "Processing..." : "Accept"}
                      </span>
                    </button>

                    <button
                      onClick={() => handleRejectClick(member)}
                      disabled={actionLoading[member.id]}
                      className={`px-3 py-1 rounded-md text-white transition ${
                        actionLoading[member.id]
                          ? "bg-red-300 cursor-not-allowed"
                          : "bg-red-500 hover:bg-red-600"
                      }`}
                    >
                      <X className="h-4 w-4 md:hidden" />
                      <span className="hidden md:inline">
                        {actionLoading[member.id] ? "Processing..." : "Reject"}
                      </span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}

    <ApprovedMemberModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      member={selectedMember}
    />

    <RejectionModal
      isOpen={showModal}
      onClose={() => {
        setShowModal(false);
        setRejectionReason("");
        setRejectionError("");
      }}
      onSubmit={handleRejectSubmit}
      rejectionReason={rejectionReason}
      setRejectionReason={(val) => {
        setRejectionReason(val);
        if (rejectionError) setRejectionError("");
      }}
      rejectionError={rejectionError}
      actionLoading={actionLoading}
      currentRequest={currentRequest}
    />
  </div>
);

}
