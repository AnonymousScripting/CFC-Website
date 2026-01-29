// import React from "react";

// export default function ApprovedMemberModal({ isOpen, onClose, member }) {
//   if (!isOpen || !member) return null;

//   return (
//     <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-2">
//       <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg relative max-h-[90vh] overflow-y-auto border-2 border-yellow-500">
//         {/* Header */}
//         <div className="bg-[#c7a462] text-white px-6 py-4 rounded-t-lg">
//           <h2 className="text-xl font-bold mb-3">Member Details</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
//             <div>
//               <p className="font-semibold">Name</p>
//               <p className="text-black font-medium bg-white/80 px-2 py-1 rounded">
//                 {member.fullName}
//               </p>
//             </div>
//             <div>
//               <p className="font-semibold">Email</p>
//               <p className="text-black font-medium bg-white/80 px-2 py-1 rounded break-words">
//                 {member.email}
//               </p>
//             </div>
//             <div>
//               <p className="font-semibold">Phone</p>
//               <p className="text-black font-medium bg-white/80 px-2 py-1 rounded">
//                 {member.phoneNumber}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-2 right-2 px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
//         >
//           ✕
//         </button>

//         {/* Body */}
//         <div className="p-6 space-y-4">
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <p>
//               <strong>Profession:</strong> {member.profession}
//             </p>
//             <p>
//               <strong>Culinary Skills:</strong> {member.culinarySkills}
//             </p>
//             <p>
//               <strong>Cuisine Interests:</strong> {member.cuisineInterests}
//             </p>
//             <p>
//               <strong>Dining Frequency:</strong> {member.diningFrequency}
//             </p>
//             <p>
//               <strong>Cohosting Interest:</strong> {member.cohostingInterest}
//             </p>
//             <p>
//               <strong>Referral Source:</strong> {member.referralSource}
//             </p>
//             <p>
//               <strong>Instagram:</strong>{" "}
//               {member.instagramUrl ? (
//                 <a
//                   href={member.instagramUrl}
//                   className="text-blue-600 underline"
//                   target="_blank"
//                   rel="noreferrer"
//                 >
//                   Profile
//                 </a>
//               ) : (
//                 "N/A"
//               )}
//             </p>
//             <p>
//               <strong>LinkedIn:</strong>{" "}
//               {member.linkedinUrl ? (
//                 <a
//                   href={member.linkedinUrl}
//                   className="text-blue-600 underline"
//                   target="_blank"
//                   rel="noreferrer"
//                 >
//                   Profile
//                 </a>
//               ) : (
//                 "N/A"
//               )}
//             </p>
//             <p>
//               <strong>Dietary Restrictions:</strong>{" "}
//               {member.dietaryRestrictions || "None"}
//             </p>
//           </div>

//           {/* Membership Goals */}
//           <div>
//             <strong>Membership Goals:</strong>
//             <ul className="list-disc ml-6">
//               {member.membershipGoals?.length > 0 ? (
//                 member.membershipGoals.map((goal, i) => <li key={i}>{goal}</li>)
//               ) : (
//                 <li>No goals provided</li>
//               )}
//             </ul>
//           </div>

//           {/* Available Days */}
//           <div>
//             <strong>Available Days:</strong>
//             <ul className="list-disc ml-6">
//               {member.availableDays?.length > 0 ? (
//                 member.availableDays.map((day, i) => <li key={i}>{day}</li>)
//               ) : (
//                 <li>No availability</li>
//               )}
//             </ul>
//           </div>

//           <p>
//             <strong>Approved At:</strong>{" "}
//             {new Date(member.reviewedAt).toLocaleString()}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

import { X, CheckCircle, Circle } from "lucide-react";
import { format } from "date-fns";


export default function ApprovedMemberModal({ isOpen, onClose, member }) {
  if (!isOpen || !member) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-4xl shadow-lg relative overflow-y-auto max-h-[95vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <X size={24} />
        </button>

        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center gap-6 p-6 border-b">
          {member?.user?.profilePicture ? (
            <img
              src={member.user.profilePicture}
              alt={member.fullName}
              className="w-24 h-24 rounded-full object-cover border"
            />
          ) : (
            <div className="w-24 h-24 flex items-center justify-center rounded-full bg-[#c7a462] text-white text-2xl font-bold">
              {member.fullName?.slice(0, 2).toUpperCase()}
            </div>
          )}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-800">{member.fullName}</h2>
            <p className="text-gray-600">{member.email}</p>
            <p className="text-gray-600">{member.phoneNumber || "N/A"}</p>
            <p className="text-[#c7a462] font-medium">{member.profession || "N/A"}</p>
          </div>
        </div>

        {/* Content Sections */}
        <div className="p-6 space-y-8 text-sm text-gray-700">
          
          {/* Professional Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Professional Info</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoItem label="Contribution" value={member.professionalContribution} />
              <InfoItem label="Interest Reason" value={member.interestReason} />
              <InfoItem label="Culinary Skills" value={member.culinarySkills} />
              <InfoItem label="Cuisine Interests" value={member.cuisineInterests} />
              <InfoItem label="Restaurant Recommendations" value={member.restaurantRecommendations} />
            </div>
          </div>

          {/* Membership Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Membership Info</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoItem label="Dining Frequency" value={member.diningFrequency} />
              <InfoItem label="Cohosting Interest" value={member.cohostingInterest} />
              <InfoItem label="Referral Source" value={member.referralSource} />
              <InfoItem label="Membership Goals" value={member.membershipGoals?.join(", ")} />
            </div>
          </div>
{/* Availability */}
<div>
  <h3 className="text-lg font-semibold text-gray-900 mb-3">Availability</h3>
  {member.availableDays && member.availableDays.length > 0 ? (
    <div className="flex flex-wrap gap-2">
      {member.availableDays.map((day) => (
        <span
          key={day}
          className="px-3 py-1 rounded-lg border border-[#c7a462] bg-white text-[#c7a462] text-sm font-medium"
        >
          {day}
        </span>
      ))}
    </div>
  ) : (
    <p className="text-gray-500">No availability provided</p>
  )}
</div>


          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Social Links</h3>
            <div className="space-y-2">
              <InfoItem label="Instagram" value={member.instagramUrl} isLink />
              <InfoItem label="LinkedIn" value={member.linkedinUrl} isLink />
            </div>
          </div>

          {/* Approved Date */}
<div>
  <h3 className="text-lg font-semibold text-gray-900 mb-3">Approved At</h3>
  <p className="text-gray-700">
    {member.reviewedAt
      ? format(new Date(member.reviewedAt), "MMMM d, yyyy")
      : "Not available"}
  </p>
</div>


        </div>
      </div>
    </div>
  );
}

/* Small reusable component for cleaner code */
function InfoItem({ label, value, isLink }) {
  return (
    <div>
      <p className="font-medium text-gray-800">{label}</p>
      {value ? (
        isLink ? (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline break-all"
          >
            {value}
          </a>
        ) : (
          <p className="text-gray-600 break-words">{value}</p>
        )
      ) : (
        <p className="text-gray-400">N/A</p>
      )}
    </div>
  );
}
