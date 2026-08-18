type StudentFiltersProps = {
  searchTerm: string;
  selectedCourse: string;
  selectedStatus: string;
  courses: string[];
  onSearchChange: (value: string) => void;
  onCourseChange: (value: string) => void;
  onStatusChange: (value: string) => void;
};

function StudentFilters({
  searchTerm,
  selectedCourse,
  selectedStatus,
  courses,
  onSearchChange,
  onCourseChange,
  onStatusChange,
}: StudentFiltersProps) {
  const selectClassName =
    "w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-700 outline-none transition hover:border-stone-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200 dark:hover:border-stone-600";

  return (
    <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_200px_180px]">
      {/* Search */}
      <div>
        <label
          htmlFor="student-search"
          className="mb-1.5 block text-xs font-medium text-stone-500 dark:text-stone-400">
          Search
        </label>

        <input
          id="student-search"
          type="text"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by name or email..."
          className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 hover:border-stone-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100 dark:placeholder:text-stone-500 dark:hover:border-stone-600"
        />
      </div>

      {/* Course */}
      <div>
        <label
          htmlFor="course-filter"
          className="mb-1.5 block text-xs font-medium text-stone-500 dark:text-stone-400">
          Course
        </label>
        <select
          id="course-filter"
          value={selectedCourse}
          onChange={(event) => onCourseChange(event.target.value)}
          className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-700 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200">
          <option value="All">All Courses</option>

          {courses.map((course) => (
            <option key={course} value={course}>
              {course}
            </option>
          ))}
        </select>
      </div>

      {/* Status */}
      <div>
        <label
          htmlFor="status-filter"
          className="mb-1.5 block text-xs font-medium text-stone-500 dark:text-stone-400">
          Status
        </label>

        <select
          id="status-filter"
          value={selectedStatus}
          onChange={(event) => onStatusChange(event.target.value)}
          className={selectClassName}>
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
    </div>
  );
}

export default StudentFilters;
