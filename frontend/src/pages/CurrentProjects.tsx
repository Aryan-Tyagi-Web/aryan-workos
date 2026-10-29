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

function CurrentProjects() {
  const [projects, setProjects] = useState<Project[]>(() => {
  try {
    const savedProjects = localStorage.getItem("aryan-workos-projects");
    return savedProjects ? JSON.parse(savedProjects) as Project[] : [];
  } catch {
    return [];
  }
});

useEffect(() => {
  localStorage.setItem(
    "aryan-workos-projects",
    JSON.stringify(projects)
  );
}, [projects]);

  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    client: "",
    type: "Website Development",
    technology: "WordPress",
    progress: 0,
    deadline: "",
    revenue: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "progress" ? Number(value) : value,
    }));
  };

  const addProject = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.client.trim()) {
      return;
    }

    const newProject: Project = {
      id: Date.now(),
      ...form,
    };

    setProjects((prev) => [...prev, newProject]);

    setForm({
      name: "",
      client: "",
      type: "Website Development",
      technology: "WordPress",
      progress: 0,
      deadline: "",
      revenue: "",
    });

    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 p-8 text-white">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold">Current Projects</h1>

          <p className="mt-2 text-slate-400">
            Manage your active projects and ongoing work
          </p>
        </div>

        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold transition hover:bg-blue-500"
        >
          {showForm ? "Cancel" : "+ Add Project"}
        </button>
      </div>

      {/* Add Project Form */}
      {showForm && (
        <section className="mb-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="mb-6 text-lg font-semibold">Add Current Project</h2>

          <form
            onSubmit={addProject}
            className="grid grid-cols-1 gap-5 md:grid-cols-2"
          >
            {/* Project Name */}
            <div>
              <label className="mb-2 block text-sm text-slate-400">
                Project Name
              </label>

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Hotel Website"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-blue-500"
              />
            </div>

            {/* Client */}
            <div>
              <label className="mb-2 block text-sm text-slate-400">
                Client
              </label>

              <input
                name="client"
                value={form.client}
                onChange={handleChange}
                placeholder="Client name"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-blue-500"
              />
            </div>

            {/* Type */}
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

            {/* Technology */}
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

            {/* Progress */}
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

            {/* Deadline */}
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

            {/* Revenue */}
            <div>
              <label className="mb-2 block text-sm text-slate-400">
                Project Revenue
              </label>

              <input
                name="revenue"
                value={form.revenue}
                onChange={handleChange}
                placeholder="₹25,000"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-blue-500"
              />
            </div>

            {/* Submit */}
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold transition hover:bg-blue-500"
              >
                Create Project
              </button>
            </div>
          </form>
        </section>
      )}

      {/* Project Count */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Active Projects</h2>

          <p className="mt-1 text-sm text-slate-500">
            {projects.length} active project
            {projects.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Empty State */}
      {projects.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/50 p-12 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-2xl">
            📁
          </div>

          <h3 className="text-lg font-semibold">No current projects</h3>

          <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
            Add your first active project to start tracking your work,
            progress, deadline and revenue.
          </p>

          <button
            onClick={() => setShowForm(true)}
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
            <div
              key={project.id}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold">{project.name}</h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {project.client}
                  </p>
                </div>

                <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-400">
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
                  <p className="mt-1 text-sm">
                    {project.deadline || "Not set"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">Revenue</p>
                  <p className="mt-1 text-sm">
                    {project.revenue || "Not set"}
                  </p>
                </div>
              </div>

              {/* Progress */}
              <div className="mt-6">
                <div className="mb-2 flex justify-between text-xs">
                  <span className="text-slate-400">Progress</span>

                  <span className="text-slate-300">
                    {project.progress}%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-blue-600 transition-all"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CurrentProjects;