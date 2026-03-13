"use client";

interface Student {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "super_admin" | "instructor" | "student";
  status: "active" | "inactive";
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  isSuspended: boolean;
  createdAt: string;
}

const roleConfig = {
  super_admin: { badge: "bg-orange-100 text-orange-700", label: "Super Admin" },
  instructor: { badge: "bg-blue-100 text-blue-700", label: "Instructor" },
  student: { badge: "bg-green-100 text-green-700", label: "Student" },
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const Avatar = ({ firstName, lastName }: { firstName: string; lastName: string }) => (
  <div className="bg-orange-500 w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold">
    {firstName[0]}{lastName[0]}
  </div>
);

const SkeletonRow = () => (
  <tr className="border-b border-zinc-100">
    {Array.from({ length: 6 }).map((_, i) => (
      <td key={i} className="px-5 py-4">
        <div className="h-4 bg-zinc-100 rounded animate-pulse w-24" />
      </td>
    ))}
  </tr>
);

interface Props {
  students: Student[];
  loading: boolean;
  onView: (student: Student) => void;
}

const StudentsTable = ({ students, loading, onView }: Props) => {
  return (
    <div className="bg-white border   rounded-xl overflow-hidden">
      <table className="w-full">
        <thead className="bg-zinc-50 text-xs text-zinc-500 uppercase">
          <tr>
            <th className="px-5 py-3 text-left">User</th>
            <th className="px-5 py-3 text-left">Email</th>
            <th className="px-5 py-3 text-left">Role</th>
            <th className="px-5 py-3 text-left">Status</th>
            <th className="px-5 py-3 text-left">Joined</th>
            <th className="px-5 py-3 text-left">Details</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
          ) : students.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-10 text-zinc-400">
                No users found
              </td>
            </tr>
          ) : (
            students.map((s) => (
              <tr key={s._id} className="border-t">
                <td className="px-5 py-4 flex items-center gap-3">
                  <Avatar firstName={s.firstName} lastName={s.lastName} />
                  <span className="font-medium">
                    {s.firstName} {s.lastName}
                  </span>
                </td>

                <td className="px-5 py-4 text-sm text-zinc-500">{s.email}</td>

                <td className="px-5 py-4">
                  <span className={`text-xs px-2 py-1 rounded ${roleConfig[s.role].badge}`}>
                    {roleConfig[s.role].label}
                  </span>
                </td>

                <td className="px-5 py-4 text-sm">
                  {s.isSuspended ? "Suspended" : s.status}
                </td>

                <td className="px-5 py-4 text-sm text-zinc-400">
                  {formatDate(s.createdAt)}
                </td>

                <td className="px-5 py-4">
                  <button
                    onClick={() => onView(s)}
                    className="text-orange-500 text-sm font-medium"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsTable;