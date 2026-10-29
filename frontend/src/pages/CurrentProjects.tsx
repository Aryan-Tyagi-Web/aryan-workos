
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
};

type ProjectForm = Omit<Project, "id">;

const initialForm: ProjectForm = {
  name: "",
  client: "",
  type: "Website Development",
  technology: "WordPress",
  progress: 0,
  deadline: "",
  revenue: "",
};

function CurrentProjects() {
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const savedProjects = localStorage.getItem("aryan-workos-projects");
      if (!savedProjects) return [];

      const parsed: unknown = JSON.parse(savedProjects);
      return Array.isArray(parsed) ? (parsed as Project[]) : [];
    } catch {
      return [];
    }
  });

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<ProjectForm>({ ...initialForm });

  useEffect(() => {
    try {
      localStorage.setItem(
        "aryan-workos-projects",
        JSON.stringify(projects)
      );
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

    if (!form.name.trim() || !form.client.trim()) {
      return;
    }

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
      const newProject: Project = {
        id: Date.now(),
        ...form,
        name: form.name.trim(),
        client: form.client.trim(),
      };

      setProjects((prev) => [...prev, newProject]);
    }

    closeForm();
  };

  const deleteProject = (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project? This action cannot be undone."
    );

    if (!confirmed) return;

    setProjects((prev) => prev.filter((project) => project.id !== id));

    if (editingId === id) {
      closeForm();
    }
  };

  const updateProgress = (id: number, progress: number) => {
    const safeProgress = Math.min(100, Math.max(0, progress));

    setProjects((prev) =>
      prev.map((project) =>
        project.id === id ? { ...project, progress: safeProgress } : project
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 p-5 text-white md:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold">Current Projects</h1>
          <p className="mt-2 text-slate-400">
            Manage your active projects and ongoing work
          </p>
        </div>

        <button
          onClick={showForm ? closeForm : openAddForm}
          className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold transition hover:bg-blue-500"
        >
          {showForm ? "Cancel" : "+ Add Project"}
        </button>
      </div>

      {/* Add / Edit Form */}
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
                placeholder="e.g. 25000"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex items-end gap-3">
              <button
                type="submit"
                className="flex-1 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold transition hover:bg-blue-500"
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

      {/* Project Count */}
      <div className="mb-5">
        <h2 className="text-lg font-semibold">Active Projects</h2>
        <p className="mt-1 text-sm text-slate-500">
          {projects.length} active project{projects.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Empty State */}
      {projects.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/50 p-12 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-2xl">
            📁
          </div>

          <h3 className="text-lg font-semibold">No current projects</h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
            Add your first active project to track progress, deadline and revenue.
          </p>

          <button
            onClick={openAddForm}
            className="mt-6 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold transition hover:bg-blue-500"
          >
            + Add Your First Project
          </button>
        </div>
      )}

      {/* Project Cards */}
      {projects.length > 0 && (
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          {projects.map((project) => (
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
                  Active
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
                    {project.revenue ? `₹${project.revenue.replace(/^₹/, "")}` : "Not set"}
                  </p>
                </div>
              </div>

              {/* Editable Progress */}
              <div className="mt-6">
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor={`progress-${project.id}`}
                    className="text-sm text-slate-400"
                  >
                    Progress
                  </label>
                  <span className="text-sm font-medium text-slate-300">
                    {project.progress}%
                  </span>
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
                  aria-label={`Update progress for ${project.name}`}
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

              {/* Actions */}
              <div className="mt-6 flex flex-wrap gap-3 border-t border-slate-800 pt-4">
                <button
                  onClick={() => openEditForm(project)}
                  className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium transition hover:border-blue-500 hover:bg-blue-500/10"
                >
                  Edit Project
                </button>

                <button
                  onClick={() => deleteProject(project.id)}
                  className="rounded-lg border border-red-900/70 px-4 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/10"
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
