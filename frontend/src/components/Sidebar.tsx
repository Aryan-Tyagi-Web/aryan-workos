import { NavLink } from "react-router-dom";

function Sidebar() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `block rounded-lg px-4 py-3 text-sm font-medium transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-slate-300 hover:bg-slate-800 hover:text-white"
    }`;

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-slate-800 bg-slate-950 p-5">
      {/* Logo */}
      <div className="mb-8">
        <h1 className="text-xl font-bold text-white">Aryan WorkOS</h1>
        <p className="mt-1 text-xs text-slate-500">
          Work & Portfolio System
        </p>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        <NavLink to="/dashboard" className={linkClass}>
          Dashboard
        </NavLink>

        <div className="pt-4">
          <p className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Work
          </p>

          <NavLink to="/projects/current" className={linkClass}>
            Current Projects
          </NavLink>

          <NavLink to="/projects/upcoming" className={linkClass}>
            Upcoming Projects
          </NavLink>

          <NavLink to="/projects/completed" className={linkClass}>
            Completed Projects
          </NavLink>

          <NavLink to="/tasks" className={linkClass}>
            Tasks
          </NavLink>

          <NavLink to="/todo" className={linkClass}>
            To-Do List
          </NavLink>

          <NavLink to="/clients" className={linkClass}>
            Clients
          </NavLink>
        </div>

        <div className="pt-4">
          <p className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Business
          </p>

          <NavLink to="/websites" className={linkClass}>
            Websites
          </NavLink>

          <NavLink to="/marketing" className={linkClass}>
            Digital Marketing
          </NavLink>

          <NavLink to="/revenue" className={linkClass}>
            Revenue
          </NavLink>
        </div>

        <div className="pt-4">
          <p className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Personal
          </p>

          <NavLink to="/notes" className={linkClass}>
            Notes
          </NavLink>

          <NavLink to="/notifications" className={linkClass}>
            Notifications
          </NavLink>

          <NavLink to="/settings" className={linkClass}>
            Settings
          </NavLink>
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;