import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950">
        <Sidebar />

        <main className="ml-64 min-h-screen">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />

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