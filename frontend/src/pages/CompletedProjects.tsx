
import { useEffect, useState } from "react";

type Project = {
  id: number;
  name: string;
  client: string;
  type: string;
  technology: string;
  progress: number;
  deadline: string;
  revenue: string;
  status?: "current" | "upcoming" | "completed";
};

const STORAGE_KEY = "aryan-workos-projects";

function CompletedProjects() {
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }, [projects]);

  const completed = projects.filter((p) => p.status === "completed");

  const changeStatus = (id: number, status: Project["status"]) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status } : p))
    );
  };

  const deleteProject = (id: number) => {
    if (!window.confirm("Delete this project permanently?")) return;
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-950 p-5 text-white md:p-8">
      <h1 className="text-3xl font-bold">Completed Projects</h1>
      <p className="mt-2 text-slate-400">
        Review finished projects and move them back if needed.
      </p>

      <p className="mb-6 mt-6 text-sm text-slate-400">
        {completed.length} completed project{completed.length !== 1 ? "s" : ""}
      </p>

      {completed.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-700 p-12 text-center">
          <div className="mb-3 text-4xl">✅</div>
          <h2 className="text-lg font-semibold">No completed projects</h2>
          <p className="mt-2 text-sm text-slate-500">
            Mark a project as completed from Current Projects.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          {completed.map((project) => (
            <article
              key={project.id}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold">{project.name}</h2>
                  <p className="mt-1 text-sm text-slate-400">
                    Client: {project.client}
                  </p>
                </div>
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
                  Completed
                </span>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-500">Project Type</p>
                  <p className="mt-1">{project.type}</p>
                </div>
                <div>
                  <p className="text-slate-500">Technology</p>
                  <p className="mt-1">{project.technology}</p>
                </div>
                <div>
                  <p className="text-slate-500">Deadline</p>
                  <p className="mt-1">{project.deadline || "Not set"}</p>
                </div>
                <div>
                  <p className="text-slate-500">Revenue</p>
                  <p className="mt-1">
                    {project.revenue
                      ? `₹${project.revenue.replace(/^₹/, "")}`
                      : "Not set"}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3 border-t border-slate-800 pt-4">
                <button
                  onClick={() => changeStatus(project.id, "current")}
                  className="rounded-lg border border-blue-800 px-4 py-2 text-sm text-blue-300 hover:bg-blue-500/10"
                >
                  Move to Current
                </button>
                <button
                  onClick={() => changeStatus(project.id, "upcoming")}
                  className="rounded-lg border border-amber-800 px-4 py-2 text-sm text-amber-300 hover:bg-amber-500/10"
                >
                  Move to Upcoming
                </button>
                <button
                  onClick={() => deleteProject(project.id)}
                  className="rounded-lg border border-red-900/70 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10"
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default CompletedProjects;
