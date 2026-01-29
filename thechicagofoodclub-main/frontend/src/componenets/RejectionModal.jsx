export default function RejectionModal({
  isOpen,
  onClose,
  onSubmit,
  rejectionReason,
  setRejectionReason,
  rejectionError,
  actionLoading,
  currentRequest,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 px-4">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">
          Provide a rejection reason
        </h3>

        <textarea
          value={rejectionReason}
          onChange={(e) => setRejectionReason(e.target.value)}
          className={`w-full border rounded-lg p-2 mb-1 focus:ring-2 ${
            rejectionError
              ? "border-red-500 focus:ring-red-500"
              : "focus:ring-red-500"
          }`}
          rows="4"
          placeholder="Enter reason..."
        ></textarea>

        {rejectionError && (
          <p className="text-red-500 text-sm mb-3">{rejectionError}</p>
        )}

        <div className="flex justify-end gap-3 mt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>

          <button
            onClick={onSubmit}
            disabled={actionLoading[currentRequest?.id]}
            className={`px-4 py-2 rounded-lg text-white transition ${
              actionLoading[currentRequest?.id]
                ? "bg-red-300 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {actionLoading[currentRequest?.id] ? "Processing..." : "Reject"}
          </button>
        </div>
      </div>
    </div>
  );
}
