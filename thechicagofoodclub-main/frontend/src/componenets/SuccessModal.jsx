export default function SuccessModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background overlay - transparent with backdrop blur */}
      <div
        className="absolute inset-0 bg-transparent backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal box */}
      <div className="relative bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full text-center transform transition-all scale-100 z-10">
        <h2 className="text-2xl font-bold text-green-600 mb-4">
          🎉 Submitted Successfully!
        </h2>
        <p className="text-gray-700 mb-6">
          Thank you for applying! We'll be in touch within 5-7 business days.
        </p>
        <button
          onClick={onClose}
          className="px-6 py-3 bg-[#c7a462] text-white rounded-lg hover:bg-[#b08e52] transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}
