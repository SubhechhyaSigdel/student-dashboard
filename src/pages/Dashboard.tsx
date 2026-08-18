
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

import type { Student } from "../data/students";
import type { AttendanceRecord } from "../data/attendance";

type DashboardContext = {
  students: Student[];
};

function Dashboard() {
  const { students } = useOutletContext<DashboardContext>();

  const [attendanceRecords, setAttendanceRecords] = useState<
    AttendanceRecord[]
  >([]);

  const courses = ["Mathematics", "Science", "Computer", "Physics"];

  useEffect(() => {
    const loadAttendance = () => {
      const savedAttendance = localStorage.getItem("attendance");

      setAttendanceRecords(
        savedAttendance ? JSON.parse(savedAttendance) : [],
      );
    };

    loadAttendance();

    window.addEventListener("storage", loadAttendance);

    return () => {
      window.removeEventListener("storage", loadAttendance);
    };
  }, []);

  const today = new Date().toISOString().split("T")[0];

  const todayRecords = attendanceRecords.filter(
    (record) => record.date === today,
  );

  const presentCount = todayRecords.filter(
    (record) => record.status === "Present",
  ).length;

  const absentCount = todayRecords.filter(
    (record) => record.status === "Absent",
  ).length;

  const lateCount = todayRecords.filter(
    (record) => record.status === "Late",
  ).length;

  const attendancePercentage =
    students.length > 0
      ? Math.round((presentCount / students.length) * 100)
      : 0;

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
          Overview of students and today's attendance.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Students */}
        <div className="rounded-xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900">
          <p className="text-sm text-stone-500 dark:text-stone-400">
            Students
          </p>

          <p className="mt-2 text-3xl font-semibold text-stone-900 dark:text-stone-100">
            {students.length}
          </p>
        </div>

        {/* Courses */}
        <div className="rounded-xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900">
          <p className="text-sm text-stone-500 dark:text-stone-400">
            Courses
          </p>

          <p className="mt-2 text-3xl font-semibold text-stone-900 dark:text-stone-100">
            {courses.length}
          </p>
        </div>

        {/* Present */}
        <div className="rounded-xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900">
          <p className="text-sm text-stone-500 dark:text-stone-400">
            Present Today
          </p>

          <p className="mt-2 text-3xl font-semibold text-emerald-600 dark:text-emerald-400">
            {presentCount}
          </p>
        </div>

        {/* Attendance */}
        <div className="rounded-xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900">
          <p className="text-sm text-stone-500 dark:text-stone-400">
            Attendance
          </p>

          <p className="mt-2 text-3xl font-semibold text-stone-900 dark:text-stone-100">
            {attendancePercentage}%
          </p>
        </div>
      </div>

      {/* Today's summary */}
      <section className="rounded-xl border border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900">
        <div className="border-b border-stone-200 px-5 py-4 dark:border-stone-800">
          <h2 className="font-semibold text-stone-900 dark:text-stone-100">
            Today's Attendance
          </h2>
        </div>

        <div className="grid grid-cols-3 divide-x divide-stone-200 dark:divide-stone-800">
          <div className="p-5">
            <p className="text-sm text-stone-500 dark:text-stone-400">
              Present
            </p>

            <p className="mt-2 text-xl font-semibold text-emerald-600 dark:text-emerald-400">
              {presentCount}
            </p>
          </div>

          <div className="p-5">
            <p className="text-sm text-stone-500 dark:text-stone-400">
              Absent
            </p>

            <p className="mt-2 text-xl font-semibold text-red-600 dark:text-red-400">
              {absentCount}
            </p>
          </div>

          <div className="p-5">
            <p className="text-sm text-stone-500 dark:text-stone-400">
              Late
            </p>

            <p className="mt-2 text-xl font-semibold text-amber-600 dark:text-amber-400">
              {lateCount}
            </p>
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="rounded-xl border border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900">
        <div className="border-b border-stone-200 px-5 py-4 dark:border-stone-800">
          <h2 className="font-semibold text-stone-900 dark:text-stone-100">
            Courses
          </h2>

          <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
            Student enrollment by course.
          </p>
        </div>

        <div className="grid sm:grid-cols-2">
          {courses.map((course, index) => {
            const count = students.filter(
              (student) => student.course === course,
            ).length;

            return (
              <div
                key={course}
                className={`flex items-center justify-between px-5 py-4 ${
                  index < 2 ? "border-b" : ""
                } ${
                  index % 2 === 0 ? "sm:border-r" : ""
                } border-stone-200 dark:border-stone-800`}
              >
                <div>
                  <p className="font-medium text-stone-800 dark:text-stone-200">
                    {course}
                  </p>

                  <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                    {count} {count === 1 ? "student" : "students"}
                  </p>
                </div>

                <span className="text-sm font-semibold text-stone-700 dark:text-stone-300">
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;

