import { useState } from "react";
import { Users, Search } from "lucide-react";

export default function MemberDirectory({ members, onView, getInitials }) {
  const [search, setSearch] = useState("");

  const filteredMembers = members.filter(
    (m) =>
      m.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      m.profession?.toLowerCase().includes(search.toLowerCase()) ||
      m.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-6 bg-[#FAFAF7] rounded-lg">
      {/* Header */}
<div className="flex flex-col items-center sm:flex-row sm:items-center sm:justify-between mb-6 gap-3 text-center sm:text-left">
  <h2 className="text-2xl font-bold font-serif text-gray-800">Members Directory</h2>
  <span className="flex justify-center font-semibold items-center gap-2 text-sm px-3 py-1 rounded-full bg-[#F7F4ED] text-[#C7A447]">
    {filteredMembers.length} Members
    <Users size={16} className="text-[#C7A447]" />
  </span>
</div>



      {/* Search with icon */}
      <div className="mb-6 relative">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-black/80"
          size={18}
        />
        <input
          type="text"
          placeholder="Search members by name or profession..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-[#E0CFB1] bg-[#FDFBF7] placeholder-black/80 text-gray-700 focus:ring-2 focus:ring-[#b49c73] focus:outline-none"
        />
      </div>

      {/* Members grid */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {filteredMembers.length > 0 ? (
          filteredMembers.map((member) => (
            <div
              key={member._id || member.id}
              onClick={() => onView(member)} // ✅ opens modal
              className="cursor-pointer flex items-center bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition border border-[#EDE9E0]"
            >
              {member.user.profilePicture ? (
                <img
                  src={member.user.profilePicture}
                  alt={member.fullName}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-[#E7DCC7] text-[#7c6a52] flex items-center justify-center text-lg font-bold mr-4">
                  {getInitials(member.fullName)}
                </div>
              )}
              <div className="overflow-hidden">
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {member.fullName}
                </h3>
                <p className="text-sm text-gray-500 truncate">{member.email}</p>
                <p className="text-sm text-[#c7a462] font-medium truncate">
                  {member.profession || "—"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-10 text-gray-400">
            <Users size={48} className="mx-auto mb-3 text-gray-300" />
            <p className="text-lg font-medium">No Members Found</p>
            <p className="text-sm">No active members found in the directory.</p>
          </div>
        )}
      </div>
    </div>
  );
}
