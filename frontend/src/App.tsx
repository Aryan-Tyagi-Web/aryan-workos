



import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CurrentProjects from "./pages/CurrentProjects";
import UpcomingProjects from "./pages/UpcomingProjects";
import CompletedProjects from "./pages/CompletedProjects";
import Tasks from "./pages/Tasks";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950 text-white">
        <Sidebar />

        <main className="min-h-screen min-w-0 w-full pt-16 md:ml-64 md:w-[calc(100%-16rem)] md:pt-0">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Projects Routes */}
            <Route path="/projects/current" element={<CurrentProjects />} />
            <Route path="/projects/upcoming" element={<UpcomingProjects />} />
            <Route path="/projects/completed" element={<CompletedProjects />} />

            {/* Tasks Route */}
            <Route path="/tasks" element={<Tasks />} />

            <Route
              path="/"
              element={<Navigate to="/dashboard" replace />}
            />

            <Route
              path="*"
              element={<Navigate to="/dashboard" replace />}
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
