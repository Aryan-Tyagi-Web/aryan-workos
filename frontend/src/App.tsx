
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CurrentProjects from "./pages/CurrentProjects";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950">
        <Sidebar />

        <main className="ml-64 min-h-screen">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Current Projects Route */}
            <Route
              path="/projects/current"
              element={<CurrentProjects />}
            />

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
