import type { Student } from "../data/students";

type StudentTableProps = {
  students: Student[];
  onDeleteStudent: (id: number) => void;
  onEditStudent: (student: Student) => void;
  onViewStudent: (student: Student) => void;
};

function StudentTable({
  students,
  onDeleteStudent,
  onEditStudent,
  onViewStudent,
}: StudentTableProps) {
  const formatStudentId = (id: number) => `STU-${String(id).padStart(3, "0")}`;

  return (
    <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm dark:border-stone-800 dark:bg-stone-900">
      <div className="overflow-x-auto">
        <table className="w-full min-w-212.5 table-fixed">
          {/* Header */}
          <thead>
            <tr className="border-b border-stone-200 bg-stone-50/70 dark:border-stone-800 dark:bg-stone-950/40">
              <th className="w-[23%] px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-stone-500 sm:px-6 dark:text-stone-400">
                Student
              </th>

              <th className="w-[25%] px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-stone-500 sm:px-6 dark:text-stone-400">
                Email
              </th>

              <th className="w-[17%] px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-stone-500 sm:px-6 dark:text-stone-400">
                Course
              </th>

              <th className="w-[13%] px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-stone-500 sm:px-6 dark:text-stone-400">
                Status
              </th>

              <th className="w-[22%] px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-stone-500 sm:px-6 dark:text-stone-400">
                Actions
              </th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {students.map((student) => (
              <tr
                key={student.id}
                className="border-b border-stone-100 transition-colors last:border-0 hover:bg-stone-50/70 dark:border-stone-800 dark:hover:bg-stone-800/40">
                {/* Student */}
                <td className="px-5 py-5 sm:px-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-sm font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                      {student.name.charAt(0).toUpperCase()}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-medium text-stone-900 dark:text-stone-100">
                        {student.name}
                      </p>

                      <p className="mt-0.5 text-xs text-stone-400 dark:text-stone-500">
                        {formatStudentId(student.id)}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Email */}
                <td className="px-5 py-5 sm:px-6">
                  <p className="truncate text-sm text-stone-600 dark:text-stone-300">
                    {student.email}
                  </p>
                </td>

                {/* Course */}
                <td className="px-5 py-5 sm:px-6">
                  <p className="truncate text-sm text-stone-600 dark:text-stone-300">
                    {student.course}
                  </p>
                </td>

                {/* Status */}
                <td className="px-5 py-5 sm:px-6">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                      student.status === "Active"
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                        : "bg-stone-100 text-stone-500 dark:bg-stone-800 dark:text-stone-400"
                    }`}>
                    {student.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-5 py-5 sm:px-6">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => onViewStudent(student)}
                      className="rounded-lg px-3 py-2 text-xs font-medium text-stone-600 transition hover:bg-stone-100 hover:text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-300/50 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-stone-100 dark:focus:ring-stone-700">
                      View
                    </button>

                    <button
                      type="button"
                      onClick={() => onEditStudent(student)}
                      className="rounded-lg px-3 py-2 text-xs font-medium text-stone-600 transition hover:bg-stone-100 hover:text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-300/50 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-stone-100 dark:focus:ring-stone-700">
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => onDeleteStudent(student.id)}
                      className="rounded-lg px-3 py-2 text-xs font-medium text-red-500 transition hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-300/50 dark:text-red-400 dark:hover:bg-red-500/10 dark:hover:text-red-300 dark:focus:ring-red-500/20">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile scroll hint */}
      <div className="border-t border-stone-100 px-4 py-2.5 text-center text-xs text-stone-400 dark:border-stone-800 dark:text-stone-500 sm:hidden">
        Swipe horizontally to view all columns
      </div>
    </div>
  );
}

export default StudentTable;
