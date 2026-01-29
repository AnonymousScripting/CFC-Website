import { useState } from "react";

export default function DeactivateModal({ isOpen, onClose, onSubmit, member }) {
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // ✅ loading state

  if (!isOpen || !member) return null;

  const handleDeactivate = async () => {
    if (!reason.trim()) {
      setError("Reason is required");
      return;
    }
    setError("");
    setLoading(true); // ✅ start loading
    try {
      await onSubmit(reason); // assuming onSubmit returns a Promise
      setReason("");
      onClose();
    } catch (err) {
      console.error("Deactivation failed:", err);
    } finally {
      setLoading(false); // ✅ stop loading
    }
  };

  return (
    <>
      <div className="fixed inset-0 backdrop-blur-sm z-40"></div>

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-lg relative">
          <h2 className="text-xl font-bold mb-4">
            Deactivate {member.fullName}
          </h2>
          <p className="mb-2 text-gray-600">
            Please provide a reason for deactivation:
          </p>

          <textarea
            className={`w-full border rounded-md p-2 mb-2 resize-none ${
              error ? "border-red-500" : "border-gray-300"
            }`}
            rows={4}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter reason..."
          />

          {error && <p className="text-red-500 mb-2">{error}</p>}

          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 transition disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleDeactivate}
              disabled={loading}
              className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-700 transition disabled:opacity-50"
            >
              {loading ? "Blocking..." : "Block"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
