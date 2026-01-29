export default function MembersTable({ members, onView }) {
  return (
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
          {members.length > 0 ? (
            members.map((member) => (
              <tr
                key={member.id}
                className="text-center border-b border-gray-100 hover:bg-gray-50 transition"
              >
                <td className="px-4 py-2">{member.fullName}</td>
                <td className="px-4 py-2">{member.email}</td>
                <td className="px-4 py-2">{member.phoneNumber}</td>
                <td className="px-4 py-2">{member.profession}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => onView(member)}
                    className="px-3 py-1 bg-[#c7a462] text-white rounded-md hover:bg-black transition"
                  >
                    View
                  </button>
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
  );
}
