

import { useEffect, useState } from "react";

export type ProjectStatus = "current" | "upcoming" | "completed";

export type Project = {
  id: number;
  name: string;
  client: string;
  type: string;
  technology: string;
  progress: number;
  deadline: string;
  revenue: string;
  status: ProjectStatus;
};

type ProjectForm = Omit<Project, "id" | "status">;

const STORAGE_KEY = "aryan-workos-projects";

const initialForm: ProjectForm = {
  name: "",
  client: "",
  type: "Website Development",
  technology: "WordPress",
  progress: 0,
  deadline: "",
  revenue: "",
};

function loadProjects(): Project[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];

    const parsed: unknown = JSON.parse(saved);
    if (!Array.isArray(parsed)) return [];

    return parsed.map((item: Record<string, unknown>) => ({
      ...item,
      status:
        item.status === "upcoming" || item.status === "completed"
          ? item.status
          : "current",
    })) as Project[];
  } catch {
    return [];
  }
}

function CurrentProjects() {
  const [projects, setProjects] = useState<Project[]>(loadProjects);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<ProjectForm>({ ...initialForm });

  const currentProjects = projects.filter(
    (project) => project.status === "current"
  );

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch (error) {
      console.error("Could not save projects:", error);
    }
  }, [projects]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "progress"
          ? Math.min(100, Math.max(0, Number(value) || 0))
          : value,
    }));
  };

  const openAddForm = () => {
    setEditingId(null);
    setForm({ ...initialForm });
    setShowForm(true);
  };

  const openEditForm = (project: Project) => {
    setEditingId(project.id);
    setForm({
      name: project.name,
      client: project.client,
      type: project.type,
      technology: project.technology,
      progress: project.progress,
      deadline: project.deadline,
      revenue: project.revenue,
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm({ ...initialForm });
  };

  const saveProject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.name.trim() || !form.client.trim()) return;

    if (editingId !== null) {
      setProjects((prev) =>
        prev.map((project) =>
          project.id === editingId
            ? {
                ...project,
                ...form,
                name: form.name.trim(),
                client: form.client.trim(),
              }
            : project
        )
      );
    } else {
      setProjects((prev) => [
        ...prev,
        {
          id: Date.now(),
          ...form,
          name: form.name.trim(),
          client: form.client.trim(),
          status: "current",
        },
      ]);
    }

    closeForm();
  };

  const deleteProject = (id: number) => {
    if (!window.confirm("Delete this project permanently?")) return;

    setProjects((prev) => prev.filter((project) => project.id !== id));

    if (editingId === id) closeForm();
  };

  const updateProgress = (id: number, progress: number) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === id
          ? { ...project, progress: Math.min(100, Math.max(0, progress)) }
          : project
      )
    );
  };

  const changeStatus = (id: number, status: ProjectStatus) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === id ? { ...project, status } : project
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 p-5 text-white md:p-8">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold">Current Projects</h1>
          <p className="mt-2 text-slate-400">
            Manage active projects, progress and deadlines.
          </p>
        </div>

        <button
          onClick={showForm ? closeForm : openAddForm}
          className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold hover:bg-blue-500"
        >
          {showForm ? "Cancel" : "+ Add Project"}
        </button>
      </div>

      {showForm && (
        <section className="mb-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="mb-6 text-lg font-semibold">
            {editingId !== null ? "Edit Project" : "Add Current Project"}
          </h2>

          <form
            onSubmit={saveProject}
            className="grid grid-cols-1 gap-5 md:grid-cols-2"
          >
            <div>
              <label className="mb-2 block text-sm text-slate-400">
                Project Name *
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Hotel Website"
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-400">
                Client *
              </label>
              <input
                name="client"
                value={form.client}
                onChange={handleChange}
                placeholder="Client name"
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-400">
                Project Type
              </label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-blue-500"
              >
                <option>Website Development</option>
                <option>Digital Marketing</option>
                <option>SEO</option>
                <option>Social Media</option>
                <option>Custom Development</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-400">
                Technology
              </label>
              <select
                name="technology"
                value={form.technology}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-blue-500"
              >
                <option>WordPress</option>
                <option>Shopify</option>
                <option>React</option>
                <option>Custom Code</option>
                <option>Meta Ads</option>
                <option>Google Ads</option>
                <option>SEO</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-400">
                Progress (%)
              </label>
              <input
                type="number"
                name="progress"
                min="0"
                max="100"
                value={form.progress}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-400">
                Deadline
              </label>
              <input
                type="date"
                name="deadline"
                value={form.deadline}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-400">
                Project Revenue (₹)
              </label>
              <input
                name="revenue"
                value={form.revenue}
                onChange={handleChange}
                placeholder="25000"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex items-end gap-3">
              <button
                type="submit"
                className="flex-1 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold hover:bg-blue-500"
              >
                {editingId !== null ? "Save Changes" : "Create Project"}
              </button>
              <button
                type="button"
                onClick={closeForm}
                className="rounded-xl border border-slate-700 px-5 py-3 text-sm hover:bg-slate-800"
              >
                Cancel
              </button>
            </div>
          </form>
        </section>
      )}

      <div className="mb-5">
        <h2 className="text-lg font-semibold">Active Projects</h2>
        <p className="mt-1 text-sm text-slate-500">
          {currentProjects.length} active project
          {currentProjects.length !== 1 ? "s" : ""}
        </p>
      </div>

      {currentProjects.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/50 p-12 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-2xl">
            📁
          </div>
          <h3 className="text-lg font-semibold">No current projects</h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
            Add a project or move an upcoming project into active work.
          </p>
          <button
            onClick={openAddForm}
            className="mt-6 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold hover:bg-blue-500"
          >
            + Add Your First Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          {currentProjects.map((project) => (
            <article
              key={project.id}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="break-words text-lg font-semibold">
                    {project.name}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Client: {project.client}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-400">
                  Current
                </span>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-500">Type</p>
                  <p className="mt-1 text-sm">{project.type}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Technology</p>
                  <p className="mt-1 text-sm">{project.technology}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Deadline</p>
                  <p className="mt-1 text-sm">{project.deadline || "Not set"}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Revenue</p>
                  <p className="mt-1 text-sm">
                    {project.revenue
                      ? `₹${project.revenue.replace(/^₹/, "")}`
                      : "Not set"}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <div className="mb-2 flex justify-between text-sm">
                  <label htmlFor={`progress-${project.id}`}>Progress</label>
                  <span>{project.progress}%</span>
                </div>
                <input
                  id={`progress-${project.id}`}
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={project.progress}
                  onChange={(e) =>
                    updateProgress(project.id, Number(e.target.value))
                  }
                  className="w-full cursor-pointer accent-blue-600"
                />
                <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-blue-600 transition-all"
                    style={{
                      width: `${Math.min(100, Math.max(0, project.progress))}%`,
                    }}
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3 border-t border-slate-800 pt-4">
                <button
                  onClick={() => openEditForm(project)}
                  className="rounded-lg border border-slate-700 px-4 py-2 text-sm hover:border-blue-500"
                >
                  Edit
                </button>

                <button
                  onClick={() => changeStatus(project.id, "upcoming")}
                  className="rounded-lg border border-amber-800 px-4 py-2 text-sm text-amber-300 hover:bg-amber-500/10"
                >
                  Move to Upcoming
                </button>

                <button
                  onClick={() => changeStatus(project.id, "completed")}
                  className="rounded-lg border border-emerald-800 px-4 py-2 text-sm text-emerald-300 hover:bg-emerald-500/10"
                >
                  Mark Completed
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

export default CurrentProjects;
