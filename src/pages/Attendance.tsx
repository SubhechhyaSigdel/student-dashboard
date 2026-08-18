import { useEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";

import type { Student } from "../data/students";
import {
  attendanceRecords as initialAttendanceRecords,
  type AttendanceStatus,
  type AttendanceRecord,
} from "../data/attendance";

type DashboardContext = {
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
};

function Attendance() {
  const { students } = useOutletContext<DashboardContext>();

  const [records, setRecords] = useState<AttendanceRecord[]>(() => {
    const savedRecords = localStorage.getItem("attendance");

    return savedRecords ? JSON.parse(savedRecords) : initialAttendanceRecords;
  });

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );

  const [currentPage, setCurrentPage] = useState(1);

  const studentsPerPage = 5;

  useEffect(() => {
    localStorage.setItem("attendance", JSON.stringify(records));
  }, [records]);

  /*
   * Remove attendance records belonging to deleted students.
   */
  useEffect(() => {
    const validStudentIds = new Set(students.map((student) => student.id));

    setRecords((currentRecords) => {
      const cleanedRecords = currentRecords.filter((record) =>
        validStudentIds.has(record.studentId),
      );

      return cleanedRecords.length === currentRecords.length
        ? currentRecords
        : cleanedRecords;
    });
  }, [students]);

  const formatStudentId = (id: number) => `STU-${String(id).padStart(3, "0")}`;

  /*
   * Records for selected date.
   */
  const selectedDateRecords = useMemo(() => {
    return records.filter((record) => record.date === selectedDate);
  }, [records, selectedDate]);

  /*
   * Get attendance status for a student.
   */
  const getStatus = (studentId: number) => {
    return selectedDateRecords.find((record) => record.studentId === studentId)
      ?.status;
  };

  /*
   * Change attendance status.
   */
  const handleStatusChange = (studentId: number, status: AttendanceStatus) => {
    setRecords((currentRecords) => {
      const existingRecord = currentRecords.find(
        (record) =>
          record.studentId === studentId && record.date === selectedDate,
      );

      if (existingRecord) {
        return currentRecords.map((record) =>
          record.id === existingRecord.id ? { ...record, status } : record,
        );
      }

      return [
        ...currentRecords,
        {
          id: Date.now(),
          studentId,
          date: selectedDate,
          status,
        },
      ];
    });
  };

  /*
   * Statistics.
   */
  const presentCount = selectedDateRecords.filter(
    (record) => record.status === "Present",
  ).length;

  const absentCount = selectedDateRecords.filter(
    (record) => record.status === "Absent",
  ).length;

  const lateCount = selectedDateRecords.filter(
    (record) => record.status === "Late",
  ).length;

  const totalMarked = presentCount + absentCount + lateCount;

  /*
   * Pagination.
   */
  const totalPages = Math.max(1, Math.ceil(students.length / studentsPerPage));

  const paginatedStudents = useMemo(() => {
    const startIndex = (currentPage - 1) * studentsPerPage;

    return students.slice(startIndex, startIndex + studentsPerPage);
  }, [currentPage, students]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
    setCurrentPage(1);
  };

  const getStatusClasses = (status?: AttendanceStatus) => {
    switch (status) {
      case "Present":
        return "border-emerald-200 bg-emerald-50 text-emerald-700 focus:ring-emerald-500/20 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400";

      case "Absent":
        return "border-red-200 bg-red-50 text-red-700 focus:ring-red-500/20 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400";

      case "Late":
        return "border-amber-200 bg-amber-50 text-amber-700 focus:ring-amber-500/20 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-400";

      default:
        return "border-stone-200 bg-stone-50 text-stone-600 focus:ring-emerald-500/20 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-400";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
          Attendance
        </h1>

        <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
          Track and manage daily student attendance.
        </p>
      </div>

      {/* Date Selector */}
      <div className="flex flex-col gap-4 rounded-2xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-stone-900 dark:text-stone-100">
            Attendance date
          </p>

          <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
            Select a date to view or update attendance.
          </p>
        </div>

        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm text-stone-900 outline-none transition hover:border-stone-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100 dark:hover:border-stone-600"
        />
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Present */}
        <div className="rounded-2xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900">
          <div className="flex items-center justify-between">
            <p className="text-sm text-stone-500 dark:text-stone-400">
              Present
            </p>

            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-sm text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
              ✓
            </span>
          </div>

          <p className="mt-3 text-3xl font-bold text-emerald-600 dark:text-emerald-400">
            {presentCount}
          </p>
        </div>

        {/* Absent */}
        <div className="rounded-2xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900">
          <div className="flex items-center justify-between">
            <p className="text-sm text-stone-500 dark:text-stone-400">Absent</p>

            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-sm text-red-600 dark:bg-red-500/10 dark:text-red-400">
              ×
            </span>
          </div>

          <p className="mt-3 text-3xl font-bold text-red-600 dark:text-red-400">
            {absentCount}
          </p>
        </div>

        {/* Late */}
        <div className="rounded-2xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900">
          <div className="flex items-center justify-between">
            <p className="text-sm text-stone-500 dark:text-stone-400">Late</p>

            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-sm text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
              !
            </span>
          </div>

          <p className="mt-3 text-3xl font-bold text-amber-600 dark:text-amber-400">
            {lateCount}
          </p>
        </div>

        {/* Total */}
        <div className="rounded-2xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900">
          <div className="flex items-center justify-between">
            <p className="text-sm text-stone-500 dark:text-stone-400">Marked</p>

            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-stone-100 text-sm text-stone-600 dark:bg-stone-800 dark:text-stone-300">
              #
            </span>
          </div>

          <p className="mt-3 text-3xl font-bold text-stone-900 dark:text-stone-100">
            {totalMarked}
          </p>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900">
        <div className="border-b border-stone-200 px-5 py-4 dark:border-stone-800">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-semibold text-stone-900 dark:text-stone-100">
                Student Attendance
              </h2>

              <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                Mark attendance for each student.
              </p>
            </div>

            <p className="text-xs text-stone-400 dark:text-stone-500">
              {totalMarked} of {students.length} marked
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px]">
            <thead>
              <tr className="border-b border-stone-200 dark:border-stone-800">
                <th className="px-6 py-4 text-left text-xs font-medium text-stone-500 dark:text-stone-400">
                  Student
                </th>

                <th className="px-6 py-4 text-left text-xs font-medium text-stone-500 dark:text-stone-400">
                  Email
                </th>

                <th className="px-6 py-4 text-left text-xs font-medium text-stone-500 dark:text-stone-400">
                  Course
                </th>

                <th className="px-6 py-4 text-left text-xs font-medium text-stone-500 dark:text-stone-400">
                  Attendance
                </th>
              </tr>
            </thead>

            <tbody>
              {paginatedStudents.map((student) => {
                const status = getStatus(student.id);

                return (
                  <tr
                    key={student.id}
                    className="border-b border-stone-100 last:border-0 dark:border-stone-800">
                    {/* Student */}
                    <td className="px-6 py-5">
                      <div>
                        <p className="font-medium text-stone-900 dark:text-stone-100">
                          {student.name}
                        </p>

                        <p className="mt-1 text-xs text-stone-400 dark:text-stone-500">
                          {formatStudentId(student.id)}
                        </p>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-6 py-5 text-sm text-stone-600 dark:text-stone-300">
                      {student.email}
                    </td>

                    {/* Course */}
                    <td className="px-6 py-5 text-sm text-stone-600 dark:text-stone-300">
                      {student.course}
                    </td>

                    {/* Attendance */}
                    <td className="px-6 py-5">
                      <select
                        value={status ?? ""}
                        onChange={(event) =>
                          handleStatusChange(
                            student.id,
                            event.target.value as AttendanceStatus,
                          )
                        }
                        className={`rounded-xl border px-3 py-2 text-sm font-medium outline-none transition focus:ring-2 ${getStatusClasses(
                          status,
                        )}`}>
                        <option value="" disabled>
                          Mark attendance
                        </option>

                        <option value="Present">Present</option>
                        <option value="Absent">Absent</option>
                        <option value="Late">Late</option>
                      </select>
                    </td>
                  </tr>
                );
              })}

              {paginatedStudents.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-14 text-center">
                    <p className="font-medium text-stone-900 dark:text-stone-100">
                      No students available
                    </p>

                    <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                      Add students to start tracking attendance.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col gap-3 border-t border-stone-200 px-5 py-4 dark:border-stone-800 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-stone-500 dark:text-stone-400">
            Page{" "}
            <span className="font-medium text-stone-700 dark:text-stone-200">
              {currentPage}
            </span>{" "}
            of{" "}
            <span className="font-medium text-stone-700 dark:text-stone-200">
              {totalPages}
            </span>
          </p>

          <div className="flex gap-2">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              className="rounded-xl border border-stone-200 px-4 py-2 text-sm font-medium text-stone-600 transition hover:bg-stone-50 hover:text-stone-900 disabled:cursor-not-allowed disabled:opacity-40 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-stone-100">
              Previous
            </button>

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((page) => Math.min(totalPages, page + 1))
              }
              className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-40">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Attendance;
