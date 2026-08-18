import { useState } from "react";
import type { Student } from "../data/students";

type AddStudentModalProps = {
  onClose: () => void;
  onAddStudent: (student: Student) => void;
  onUpdateStudent: (student: Student) => void;
  editingStudent: Student | null;
};

function AddStudentModal({
  onClose,
  onAddStudent,
  onUpdateStudent,
  editingStudent,
}: AddStudentModalProps) {
  const [name, setName] = useState(editingStudent?.name ?? "");
  const [email, setEmail] = useState(editingStudent?.email ?? "");
  const [course, setCourse] = useState(editingStudent?.course ?? "Mathematics");
  const [status, setStatus] = useState<"Active" | "Inactive">(
    editingStudent?.status ?? "Active",
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const student: Student = {
      id: editingStudent?.id ?? 0,
      name: name.trim(),
      email: email.trim(),
      course,
      status,
    };

    if (editingStudent) {
      onUpdateStudent(student);
    } else {
      onAddStudent(student);
    }
  };

  const inputClassName =
    "w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 hover:border-stone-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100 dark:placeholder:text-stone-500 dark:hover:border-stone-600";

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
        <div className="flex items-start justify-between border-b border-stone-100 px-6 py-5 dark:border-stone-800">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-stone-900 dark:text-stone-100">
              {editingStudent ? "Edit Student" : "Add Student"}
            </h2>

            <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
              {editingStudent
                ? "Update the student's information below."
                : "Add a new student to your class."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-lg text-stone-400 transition hover:bg-stone-100 hover:text-stone-700 dark:hover:bg-stone-800 dark:hover:text-stone-200">
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 px-6 py-6">
          {/* Name */}
          <div>
            <label
              htmlFor="student-name"
              className="mb-2 block text-sm font-medium text-stone-700 dark:text-stone-300">
              Name
            </label>

            <input
              id="student-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter student name"
              autoComplete="name"
              required
              className={inputClassName}
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="student-email"
              className="mb-2 block text-sm font-medium text-stone-700 dark:text-stone-300">
              Email
            </label>

            <input
              id="student-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter student email"
              autoComplete="email"
              required
              className={inputClassName}
            />
          </div>

          {/* Course */}
          <div>
            <label
              htmlFor="student-course"
              className="mb-2 block text-sm font-medium text-stone-700 dark:text-stone-300">
              Course
            </label>

            <select
              id="student-course"
              value={course}
              onChange={(event) => setCourse(event.target.value)}
              className={inputClassName}>
              <option value="Mathematics">Mathematics</option>
              <option value="Science">Science</option>
              <option value="Computer">Computer</option>
              <option value="Physics">Physics</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label
              htmlFor="student-status"
              className="mb-2 block text-sm font-medium text-stone-700 dark:text-stone-300">
              Status
            </label>

            <select
              id="student-status"
              value={status}
              onChange={(event) =>
                setStatus(event.target.value as "Active" | "Inactive")
              }
              className={inputClassName}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 border-t border-stone-100 pt-5 sm:flex-row sm:justify-end dark:border-stone-800">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-stone-200 px-4 py-2.5 text-sm font-medium text-stone-600 transition hover:bg-stone-50 hover:text-stone-900 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-stone-100">
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-600 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-emerald-500/20">
              {editingStudent ? "Save Changes" : "Add Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddStudentModal;
