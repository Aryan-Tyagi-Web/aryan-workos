
import { useState } from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `block rounded-lg px-4 py-3 text-sm font-medium transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-slate-300 hover:bg-slate-800 hover:text-white"
    }`;

  const handleNavigation = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Header */}
      <header className="fixed left-0 right-0 top-0 z-40 flex h-16 items-center justify-between border-b border-slate-800 bg-slate-950 px-4 md:hidden">
        <div>
          <h1 className="text-lg font-bold text-white">Aryan WorkOS</h1>
          <p className="text-[10px] text-slate-500">
            Work & Portfolio System
          </p>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 text-white hover:bg-slate-800"
        >
          {mobileMenuOpen ? (
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </header>

      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={handleNavigation}
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed bottom-0 left-0 top-16 z-50 w-72 overflow-y-auto border-r border-slate-800 bg-slate-950 p-5 transition-transform duration-300 md:top-0 md:z-40 md:w-64 md:translate-x-0 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Desktop Logo */}
        <div className="mb-8 hidden md:block">
          <h1 className="text-xl font-bold text-white">Aryan WorkOS</h1>
          <p className="mt-1 text-xs text-slate-500">
            Work & Portfolio System
          </p>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          <NavLink
            to="/dashboard"
            className={linkClass}
            onClick={handleNavigation}
          >
            Dashboard
          </NavLink>

          <div className="pt-4">
            <p className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Work
            </p>

            <NavLink to="/projects/current" className={linkClass} onClick={handleNavigation}>
              Current Projects
            </NavLink>

            <NavLink to="/projects/upcoming" className={linkClass} onClick={handleNavigation}>
              Upcoming Projects
            </NavLink>

            <NavLink to="/projects/completed" className={linkClass} onClick={handleNavigation}>
              Completed Projects
            </NavLink>

            <NavLink to="/tasks" className={linkClass} onClick={handleNavigation}>
              Tasks
            </NavLink>

            <NavLink to="/todo" className={linkClass} onClick={handleNavigation}>
              To-Do List
            </NavLink>

            <NavLink to="/clients" className={linkClass} onClick={handleNavigation}>
              Clients
            </NavLink>
          </div>

          <div className="pt-4">
            <p className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Business
            </p>

            <NavLink to="/websites" className={linkClass} onClick={handleNavigation}>
              Websites
            </NavLink>

            <NavLink to="/marketing" className={linkClass} onClick={handleNavigation}>
              Digital Marketing
            </NavLink>

            <NavLink to="/revenue" className={linkClass} onClick={handleNavigation}>
              Revenue
            </NavLink>
          </div>

          <div className="pt-4">
            <p className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Personal
            </p>

            <NavLink to="/notes" className={linkClass} onClick={handleNavigation}>
              Notes
            </NavLink>

            <NavLink to="/notifications" className={linkClass} onClick={handleNavigation}>
              Notifications
            </NavLink>

            <NavLink to="/settings" className={linkClass} onClick={handleNavigation}>
              Settings
            </NavLink>
          </div>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
