import { useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import type { Student } from "../data/students";
import StudentFilters from "./StudentFilters";
import StudentTable from "./StudentTable";
import AddStudentModal from "./AddStudentModal";
import StudentDetailsModal from "./StudentDetailsModal";

type StudentContext = {
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
};

function StudentList() {
  const { students, setStudents } = useOutletContext<StudentContext>();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [viewingStudent, setViewingStudent] = useState<Student | null>(null);

  /*
   * Get unique courses from the actual student data.
   */
  const courses = useMemo(() => {
    return Array.from(
      new Set(students.map((student) => student.course)),
    ).sort();
  }, [students]);

  /*
   * Filter students.
   */
  const filteredStudents = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return students.filter((student) => {
      const matchesSearch =
        search === "" ||
        student.name.toLowerCase().includes(search) ||
        student.email.toLowerCase().includes(search);

      const matchesCourse =
        selectedCourse === "All" || student.course === selectedCourse;

      const matchesStatus =
        selectedStatus === "All" || student.status === selectedStatus;

      return matchesSearch && matchesCourse && matchesStatus;
    });
  }, [students, searchTerm, selectedCourse, selectedStatus]);

  /*
   * Add student.
   *
   * The ID is generated here so the modal
   * does not need to know anything about IDs.
   */
  const handleAddStudent = (student: Student) => {
    setStudents((currentStudents) => {
      const nextId =
        currentStudents.length > 0
          ? Math.max(...currentStudents.map((item) => item.id)) + 1
          : 1;

      return [
        ...currentStudents,
        {
          ...student,
          id: nextId,
        },
      ];
    });

    setIsModalOpen(false);
  };

  /*
   * Update student while preserving the existing ID.
   */
  const handleUpdateStudent = (updatedStudent: Student) => {
    setStudents((currentStudents) =>
      currentStudents.map((student) =>
        student.id === updatedStudent.id ? updatedStudent : student,
      ),
    );

    setIsModalOpen(false);
    setEditingStudent(null);
  };

  /*
   * Delete student and their attendance records.
   */
  const handleDeleteStudent = (id: number) => {
    setStudents((currentStudents) =>
      currentStudents.filter((student) => student.id !== id),
    );

    const savedAttendance = localStorage.getItem("attendance");

    if (!savedAttendance) return;

    try {
      const attendanceRecords = JSON.parse(savedAttendance);

      const updatedRecords = attendanceRecords.filter(
        (record: { studentId: number }) => record.studentId !== id,
      );

      localStorage.setItem("attendance", JSON.stringify(updatedRecords));
    } catch (error) {
      console.error(
        "Failed to update attendance after deleting student:",
        error,
      );
    }
  };

  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
    setIsModalOpen(true);
  };

  const handleViewStudent = (student: Student) => {
    setViewingStudent(student);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCourse("All");
    setSelectedStatus("All");
  };

  const handleOpenAddModal = () => {
    setEditingStudent(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingStudent(null);
  };

  const hasFilters =
    searchTerm.trim() !== "" ||
    selectedCourse !== "All" ||
    selectedStatus !== "All";

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            Students
          </h1>

          <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
            Manage student information and enrollment.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAddModal}
          className="w-full rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 sm:w-auto">
          + Add Student
        </button>
      </div>

      {/* Filters */}
      <section className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm dark:border-stone-800 dark:bg-stone-900">
        <StudentFilters
          searchTerm={searchTerm}
          selectedCourse={selectedCourse}
          selectedStatus={selectedStatus}
          courses={courses}
          onSearchChange={setSearchTerm}
          onCourseChange={setSelectedCourse}
          onStatusChange={setSelectedStatus}
        />

        {hasFilters && (
          <button
            type="button"
            onClick={handleClearFilters}
            className="mt-4 text-sm font-medium text-emerald-600 transition hover:text-emerald-700 hover:underline dark:text-emerald-400 dark:hover:text-emerald-300">
            Clear filters
          </button>
        )}
      </section>

      {/* Result summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-stone-500 dark:text-stone-400">
          Showing{" "}
          <span className="font-semibold text-stone-700 dark:text-stone-200">
            {filteredStudents.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-stone-700 dark:text-stone-200">
            {students.length}
          </span>{" "}
          students
        </p>
      </div>

      {/* Student table / empty state */}
      {filteredStudents.length > 0 ? (
        <StudentTable
          students={filteredStudents}
          onDeleteStudent={handleDeleteStudent}
          onEditStudent={handleEditStudent}
          onViewStudent={handleViewStudent}
        />
      ) : (
        <div className="rounded-2xl border border-dashed border-stone-300 bg-white px-6 py-14 text-center dark:border-stone-700 dark:bg-stone-900">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-stone-100 text-stone-500 dark:bg-stone-800 dark:text-stone-400">
            ∅
          </div>

          <h3 className="mt-4 font-semibold text-stone-900 dark:text-stone-100">
            No students found
          </h3>

          <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
            Try changing your search or filters.
          </p>

          {hasFilters && (
            <button
              type="button"
              onClick={handleClearFilters}
              className="mt-4 text-sm font-medium text-emerald-600 hover:underline dark:text-emerald-400">
              Clear filters
            </button>
          )}
        </div>
      )}

      {/* Add / Edit modal */}
      {isModalOpen && (
        <AddStudentModal
          onClose={handleCloseModal}
          onAddStudent={handleAddStudent}
          onUpdateStudent={handleUpdateStudent}
          editingStudent={editingStudent}
        />
      )}

      {/* Student details */}
      {viewingStudent && (
        <StudentDetailsModal
          student={viewingStudent}
          onClose={() => setViewingStudent(null)}
        />
      )}
    </div>
  );
}

export default StudentList;
