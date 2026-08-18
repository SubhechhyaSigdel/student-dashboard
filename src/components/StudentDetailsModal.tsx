import type { Student } from "../data/students";

type StudentDetailsModalProps = {
  student: Student;
  onClose: () => void;
};

function StudentDetailsModal({ student, onClose }: StudentDetailsModalProps) {
  const formatStudentId = (id: number) => `STU-${String(id).padStart(3, "0")}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}>
      <div
        className="my-auto w-full max-w-md overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-2xl dark:border-stone-800 dark:bg-stone-900"
        onMouseDown={(event) => event.stopPropagation()}>
        {/* Header */}
        <div className="border-b border-stone-100 px-6 py-5 dark:border-stone-800">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500 text-lg font-semibold text-white shadow-sm">
                {student.name.charAt(0).toUpperCase()}
              </div>

              <div>
                <h2 className="font-semibold tracking-tight text-stone-900 dark:text-stone-100">
                  {student.name}
                </h2>

                <p className="mt-0.5 text-xs text-stone-500 dark:text-stone-400">
                  {formatStudentId(student.id)}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="flex h-9 w-9 items-center justify-center rounded-xl text-lg text-stone-400 transition hover:bg-stone-100 hover:text-stone-700 dark:hover:bg-stone-800 dark:hover:text-stone-200">
              ✕
            </button>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-4 px-6 py-6">
          {/* Email */}
          <div className="rounded-xl bg-stone-50 p-4 dark:bg-stone-800/60">
            <p className="text-xs font-medium uppercase tracking-wide text-stone-400 dark:text-stone-500">
              Email
            </p>

            <p className="mt-1 break-all text-sm font-medium text-stone-800 dark:text-stone-200">
              {student.email}
            </p>
          </div>

          {/* Course */}
          <div className="rounded-xl bg-stone-50 p-4 dark:bg-stone-800/60">
            <p className="text-xs font-medium uppercase tracking-wide text-stone-400 dark:text-stone-500">
              Course
            </p>

            <p className="mt-1 text-sm font-medium text-stone-800 dark:text-stone-200">
              {student.course}
            </p>
          </div>

          {/* Status */}
          <div className="rounded-xl bg-stone-50 p-4 dark:bg-stone-800/60">
            <p className="text-xs font-medium uppercase tracking-wide text-stone-400 dark:text-stone-500">
              Status
            </p>

            <div className="mt-2">
              <span
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${
                  student.status === "Active"
                    ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                    : "bg-stone-200 text-stone-600 dark:bg-stone-700 dark:text-stone-300"
                }`}>
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    student.status === "Active"
                      ? "bg-emerald-500"
                      : "bg-stone-400 dark:bg-stone-500"
                  }`}
                />

                {student.status}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-stone-100 px-6 py-5 dark:border-stone-800">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm font-medium text-stone-600 transition hover:bg-stone-50 hover:text-stone-900 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-stone-100">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudentDetailsModal;
