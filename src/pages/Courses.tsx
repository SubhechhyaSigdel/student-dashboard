
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import type { Student } from "../data/students";

type DashboardContext = {
  students: Student[];
};

function Courses() {
  const { students } = useOutletContext<DashboardContext>();

  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const courses = ["Mathematics", "Science", "Computer", "Physics"];

  const selectedCourseStudents = students.filter(
    (student) => student.course === selectedCourse,
  );

  return (
    <div className="mx-auto max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
          Courses
        </h1>

        <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
          Overview of available courses and enrollment.
        </p>
      </div>

      {/* Course Cards */}
      <div className="grid gap-5 sm:grid-cols-2">
        {courses.map((course) => {
          const courseStudents = students.filter(
            (student) => student.course === course,
          );

          const activeStudents = courseStudents.filter(
            (student) => student.status === "Active",
          ).length;

          return (
            <div
              key={course}
              className="rounded-2xl border border-stone-200 bg-white p-6 transition hover:border-stone-300 dark:border-stone-800 dark:bg-stone-900 dark:hover:border-stone-700"
            >
              {/* Course header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                    {course}
                  </h2>

                  <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                    Course
                  </p>
                </div>

                <span className="rounded-lg bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                  {courseStudents.length}
                </span>
              </div>

              {/* Enrollment */}
              <div className="mt-6 border-t border-stone-100 pt-5 dark:border-stone-800">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-stone-500 dark:text-stone-400">
                    Students enrolled
                  </span>

                  <span className="text-sm font-medium text-stone-800 dark:text-stone-200">
                    {courseStudents.length}
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm text-stone-500 dark:text-stone-400">
                    Active students
                  </span>

                  <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                    {activeStudents}
                  </span>
                </div>
              </div>

              {/* View Students */}
              <button
                type="button"
                onClick={() => setSelectedCourse(course)}
                className="mt-6 w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm font-medium text-stone-700 transition hover:bg-stone-50 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800"
              >
                View Students
              </button>
            </div>
          );
        })}
      </div>

      {/* Students Modal */}
      {selectedCourse && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setSelectedCourse(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl border border-stone-200 bg-white shadow-xl dark:border-stone-800 dark:bg-stone-900"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-stone-200 px-5 py-4 dark:border-stone-800">
              <div>
                <h2 className="font-semibold text-stone-900 dark:text-stone-100">
                  {selectedCourse}
                </h2>

                <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                  {selectedCourseStudents.length}{" "}
                  {selectedCourseStudents.length === 1
                    ? "student"
                    : "students"}{" "}
                  enrolled
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCourse(null)}
                aria-label="Close"
                className="rounded-lg px-2 py-1 text-lg text-stone-400 transition hover:bg-stone-100 hover:text-stone-700 dark:hover:bg-stone-800 dark:hover:text-stone-200"
              >
                ×
              </button>
            </div>

            {/* Student List */}
            <div className="max-h-[60vh] overflow-y-auto p-5">
              {selectedCourseStudents.length === 0 ? (
                <p className="py-8 text-center text-sm text-stone-500 dark:text-stone-400">
                  No students enrolled in this course.
                </p>
              ) : (
                <div className="space-y-2">
                  {selectedCourseStudents.map((student) => (
                    <div
                      key={student.id}
                      className="flex items-center justify-between rounded-xl border border-stone-200 px-4 py-3 dark:border-stone-800"
                    >
                      <div className="min-w-0">
                        <p className="truncate font-medium text-stone-900 dark:text-stone-100">
                          {student.name}
                        </p>

                        <p className="mt-0.5 text-xs text-stone-500 dark:text-stone-400">
                          STU-{String(student.id).padStart(3, "0")}
                        </p>
                      </div>

                      <span
                        className={`ml-4 shrink-0 text-xs font-medium ${
                          student.status === "Active"
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-stone-400 dark:text-stone-500"
                        }`}
                      >
                        {student.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end border-t border-stone-200 px-5 py-4 dark:border-stone-800">
              <button
                type="button"
                onClick={() => setSelectedCourse(null)}
                className="rounded-xl border border-stone-200 px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Courses;

