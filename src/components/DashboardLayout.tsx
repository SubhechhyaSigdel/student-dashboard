import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";

import { students as initialStudents } from "../data/students";
import type { Student } from "../data/students";

function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [students, setStudents] = useState<Student[]>(() => {
    const savedStudents = localStorage.getItem("students");

    return savedStudents ? JSON.parse(savedStudents) : initialStudents;
  });

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((current) => !current);
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      <div className="flex min-h-screen">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* Mobile Sidebar */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <button
              type="button"
              aria-label="Close sidebar"
              onClick={closeSidebar}
              className="absolute inset-0 bg-black/40"
            />

            <div className="relative z-10 h-full w-64">
              <Sidebar onNavigate={closeSidebar} />
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="min-w-0 flex-1">
          {/* Header */}
          <header className="sticky top-0 z-30 border-b border-stone-200 bg-stone-50/95 backdrop-blur dark:border-stone-800 dark:bg-stone-950/95">
            <div className="flex items-center gap-4 px-4 py-4 md:px-8">
              {/* Mobile Menu Button */}
              <div className="flex items-center px-4 py-4 md:px-8">
                <button
                  type="button"
                  onClick={() => setIsSidebarOpen((current) => !current)}
                  aria-label="Open sidebar"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-stone-200 bg-white text-stone-600 transition hover:bg-stone-100 hover:text-stone-900 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-stone-100 md:hidden">
                  ☰
                </button>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <div className="px-4 py-6 md:px-8 md:py-8">
            <Outlet
              context={{
                students,
                setStudents,
              }}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
