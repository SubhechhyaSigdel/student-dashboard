import { NavLink } from "react-router-dom";

type SidebarProps = {
  onNavigate?: () => void;
};

type SidebarLink = {
  name: string;
  path: string;
  icon: string;
};

const sidebarLinks: SidebarLink[] = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: "⌂",
  },
  {
    name: "Students",
    path: "/students",
    icon: "◉",
  },
  {
    name: "Attendance",
    path: "/attendance",
    icon: "✓",
  },
  {
    name: "Courses",
    path: "/courses",
    icon: "▣",
  },
  {
    name: "Settings",
    path: "/settings",
    icon: "⚙",
  },
];

function Sidebar({ onNavigate }: SidebarProps) {
  return (
    <aside className="flex min-h-screen w-64 flex-col border-r border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-950">
      {/* Logo */}
      <div className="flex h-20 items-center border-b border-stone-200 px-6 dark:border-stone-800">
        <div className="flex items-center gap-3">
          <div
            aria-hidden="true"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-lg font-bold text-white shadow-sm">
            S
          </div>

          <div>
            <h1 className="font-bold text-stone-900 dark:text-stone-100">
              StudentHub
            </h1>

            <p className="text-xs text-stone-500 dark:text-stone-400">
              Management System
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav aria-label="Main navigation" className="flex-1 px-4 py-6">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-stone-400">
          Menu
        </p>

        <div className="space-y-1">
          {sidebarLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={onNavigate}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-emerald-50 text-emerald-700 shadow-sm dark:bg-emerald-500/10 dark:text-emerald-400"
                    : "text-stone-600 hover:bg-stone-50 hover:text-stone-900 dark:text-stone-400 dark:hover:bg-stone-900 dark:hover:text-stone-100"
                }`
              }>
              {({ isActive }) => (
                <>
                  <span
                    aria-hidden="true"
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm transition-colors ${
                      isActive
                        ? "bg-emerald-500 text-white"
                        : "bg-stone-100 text-stone-500 group-hover:bg-stone-200 dark:bg-stone-900 dark:text-stone-400 dark:group-hover:bg-stone-800"
                    }`}>
                    {link.icon}
                  </span>

                  <span>{link.name}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Profile */}
      <div className="border-t border-stone-200 p-4 dark:border-stone-800">
        <div className="flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-stone-50 dark:hover:bg-stone-900">
          <div
            aria-hidden="true"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
            S
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-stone-900 dark:text-stone-100">
              Admin
            </p>

            <p className="truncate text-xs text-stone-500 dark:text-stone-400">
              Administrator
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
