import { useOutletContext } from "react-router-dom";
import type { Student } from "../data/students";
import { useTheme } from "../context/ThemeContext";

type DashboardContext = {
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
};

function Settings() {
  const { theme, toggleTheme } = useTheme();
  const { students, setStudents } = useOutletContext<DashboardContext>();

  const attendanceRecords = JSON.parse(
    localStorage.getItem("attendance") || "[]",
  );

  const handleExport = (data: unknown, filename: string) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();

    URL.revokeObjectURL(url);
  };

  const handleExportStudents = () => {
    handleExport(students, "students.json");
  };

  const handleExportAttendance = () => {
    handleExport(attendanceRecords, "attendance.json");
  };

  const handleClearStudents = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete all students?",
    );

    if (!confirmed) return;

    setStudents([]);
    localStorage.setItem("students", JSON.stringify([]));
  };

  const handleClearAttendance = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete all attendance records?",
    );

    if (!confirmed) return;

    localStorage.removeItem("attendance");
    window.location.reload();
  };

  const uniqueCourses = new Set(students.map((student) => student.course)).size;

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
          Settings
        </h1>

        <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
          Manage your StudentHub application and data.
        </p>
      </div>

      {/* System Information */}
      <section className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm dark:border-stone-800 dark:bg-stone-900">
        <div className="border-b border-stone-200 px-6 py-5 dark:border-stone-800">
          <h2 className="font-semibold text-stone-900 dark:text-stone-100">
            System Information
          </h2>

          <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
            Overview of your current application data.
          </p>
        </div>

        <div className="grid gap-4 p-6 sm:grid-cols-3">
          {/* Students */}
          <div className="rounded-xl bg-stone-50 p-4 dark:bg-stone-800/50">
            <p className="text-sm text-stone-500 dark:text-stone-400">
              Total Students
            </p>

            <p className="mt-2 text-2xl font-bold text-stone-900 dark:text-stone-100">
              {students.length}
            </p>
          </div>

          {/* Courses */}
          <div className="rounded-xl bg-stone-50 p-4 dark:bg-stone-800/50">
            <p className="text-sm text-stone-500 dark:text-stone-400">
              Total Courses
            </p>

            <p className="mt-2 text-2xl font-bold text-stone-900 dark:text-stone-100">
              {uniqueCourses}
            </p>
          </div>

          {/* Attendance */}
          <div className="rounded-xl bg-stone-50 p-4 dark:bg-stone-800/50">
            <p className="text-sm text-stone-500 dark:text-stone-400">
              Attendance Records
            </p>

            <p className="mt-2 text-2xl font-bold text-stone-900 dark:text-stone-100">
              {attendanceRecords.length}
            </p>
          </div>
        </div>
      </section>

      {/* Appearance */}
      <section className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm dark:border-stone-800 dark:bg-stone-900">
        <div className="border-b border-stone-200 px-6 py-5 dark:border-stone-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-lg dark:bg-emerald-500/10">
              {theme === "dark" ? "🌙" : "☀️"}
            </div>

            <div>
              <h2 className="font-semibold text-stone-900 dark:text-stone-100">
                Appearance
              </h2>

              <p className="text-sm text-stone-500 dark:text-stone-400">
                Customize how StudentHub looks.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-6 px-6 py-5">
          <div>
            <p className="font-medium text-stone-900 dark:text-stone-100">
              Dark mode
            </p>

            <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
              {theme === "dark"
                ? "Your dashboard is using dark mode."
                : "Your dashboard is using light mode."}
            </p>
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            aria-pressed={theme === "dark"}
            className={`relative h-7 w-12 shrink-0 rounded-full transition-colors duration-300 ${
              theme === "dark" ? "bg-emerald-500" : "bg-stone-300"
            }`}>
            <span
              className={`absolute top-1 left-1 h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-300 ${
                theme === "dark" ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </section>

      {/* Data Management */}
      <section className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm dark:border-stone-800 dark:bg-stone-900">
        <div className="border-b border-stone-200 px-6 py-5 dark:border-stone-800">
          <h2 className="font-semibold text-stone-900 dark:text-stone-100">
            Data Management
          </h2>

          <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
            Export or remove your application data.
          </p>
        </div>

        <div className="divide-y divide-stone-200 dark:divide-stone-800">
          {/* Export Students */}
          <div className="flex flex-col justify-between gap-4 px-6 py-5 sm:flex-row sm:items-center">
            <div>
              <h3 className="font-medium text-stone-900 dark:text-stone-100">
                Export Students
              </h3>

              <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                Download all student information as JSON.
              </p>
            </div>

            <button
              type="button"
              onClick={handleExportStudents}
              className="rounded-xl border border-stone-200 px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800">
              Export Students
            </button>
          </div>

          {/* Export Attendance */}
          <div className="flex flex-col justify-between gap-4 px-6 py-5 sm:flex-row sm:items-center">
            <div>
              <h3 className="font-medium text-stone-900 dark:text-stone-100">
                Export Attendance
              </h3>

              <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                Download attendance records as JSON.
              </p>
            </div>

            <button
              type="button"
              onClick={handleExportAttendance}
              className="rounded-xl border border-stone-200 px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800">
              Export Attendance
            </button>
          </div>

          {/* Clear Students */}
          <div className="flex flex-col justify-between gap-4 px-6 py-5 sm:flex-row sm:items-center">
            <div>
              <h3 className="font-medium text-stone-900 dark:text-stone-100">
                Clear Students
              </h3>

              <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                Permanently remove all students.
              </p>
            </div>

            <button
              type="button"
              onClick={handleClearStudents}
              className="rounded-xl border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 dark:border-red-500/20 dark:text-red-400 dark:hover:bg-red-500/10">
              Clear Students
            </button>
          </div>

          {/* Clear Attendance */}
          <div className="flex flex-col justify-between gap-4 px-6 py-5 sm:flex-row sm:items-center">
            <div>
              <h3 className="font-medium text-stone-900 dark:text-stone-100">
                Clear Attendance
              </h3>

              <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                Permanently remove all attendance records.
              </p>
            </div>

            <button
              type="button"
              onClick={handleClearAttendance}
              className="rounded-xl border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 dark:border-red-500/20 dark:text-red-400 dark:hover:bg-red-500/10">
              Clear Attendance
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Settings;
