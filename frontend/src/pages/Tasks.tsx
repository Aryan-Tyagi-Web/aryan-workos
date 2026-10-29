
import { useEffect, useState } from "react";

type Task = {
  id: number;
  title: string;
  description: string;
  deadline: string;
  priority: "Low" | "Medium" | "High";
  completed: boolean;
};

const STORAGE_KEY = "aryan-workos-tasks";

function Tasks() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState<Task["priority"]>("Medium");
  const [filter, setFilter] = useState<"All" | "Pending" | "Completed">("All");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error("Could not save tasks:", error);
    }
  }, [tasks]);

  const addTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim()) return;

    const newTask: Task = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      deadline,
      priority,
      completed: false,
    };

    setTasks((prev) => [newTask, ...prev]);

    setTitle("");
    setDescription("");
    setDeadline("");
    setPriority("Medium");
  };

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const deleteTask = (id: number) => {
    if (!window.confirm("Delete this task permanently?")) return;
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "Pending") return !task.completed;
    if (filter === "Completed") return task.completed;
    return true;
  });

  const pendingCount = tasks.filter((task) => !task.completed).length;
  const completedCount = tasks.filter((task) => task.completed).length;

  const priorityClass = (priority: Task["priority"]) => {
    if (priority === "High") {
      return "bg-red-500/10 text-red-400";
    }
    if (priority === "Medium") {
      return "bg-amber-500/10 text-amber-300";
    }
    return "bg-emerald-500/10 text-emerald-300";
  };

  return (
    <div className="min-h-screen min-w-0 bg-slate-950 p-4 text-white sm:p-6 md:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold sm:text-3xl">Tasks</h1>
          <p className="mt-2 text-sm text-slate-400 sm:text-base">
            Organize your work, deadlines and priorities.
          </p>
        </div>

        {/* Task Statistics */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Total Tasks</p>
            <p className="mt-2 text-3xl font-bold">{tasks.length}</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Pending Tasks</p>
            <p className="mt-2 text-3xl font-bold text-amber-300">
              {pendingCount}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Completed Tasks</p>
            <p className="mt-2 text-3xl font-bold text-emerald-300">
              {completedCount}
            </p>
          </div>
        </div>

        {/* Add Task Form */}
        <section className="mb-8 rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-6">
          <h2 className="mb-5 text-lg font-semibold">+ Add New Task</h2>

          <form onSubmit={addTask} className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm text-slate-400">
                Task Title *
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Complete client website"
                required
                className="w-full min-w-0 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-base outline-none focus:border-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm text-slate-400">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add task details..."
                rows={3}
                className="w-full min-w-0 resize-y rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-base outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-400">
                Deadline
              </label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full min-w-0 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-base outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-400">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) =>
                  setPriority(e.target.value as Task["priority"])
                }
                className="w-full min-w-0 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-base outline-none focus:border-blue-500"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold transition hover:bg-blue-500 sm:w-auto"
              >
                Add Task
              </button>
            </div>
          </form>
        </section>

        {/* Task List */}
        <section>
          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-semibold">Your Tasks</h2>

            <div className="grid grid-cols-3 gap-2 sm:flex">
              {(["All", "Pending", "Completed"] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setFilter(item)}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition sm:px-4 ${
                    filter === item
                      ? "bg-blue-600 text-white"
                      : "border border-slate-700 text-slate-400 hover:bg-slate-800"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {filteredTasks.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-700 p-8 text-center sm:p-12">
              <div className="mb-3 text-4xl">📝</div>
              <h3 className="font-semibold">No tasks found</h3>
              <p className="mt-2 text-sm text-slate-500">
                Add a new task or choose another filter.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTasks.map((task) => (
                <article
                  key={task.id}
                  className={`rounded-2xl border border-slate-800 bg-slate-900 p-4 sm:p-5 ${
                    task.completed ? "opacity-70" : ""
                  }`}
                >
                  <div className="flex min-w-0 items-start gap-3 sm:gap-4">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      aria-label={`Mark ${task.title} as ${
                        task.completed ? "pending" : "completed"
                      }`}
                      className="mt-1 h-5 w-5 shrink-0 cursor-pointer accent-blue-600"
                    />

                    <div className="min-w-0 flex-1">
                      <h3
                        className={`break-words font-semibold ${
                          task.completed
                            ? "text-slate-500 line-through"
                            : "text-white"
                        }`}
                      >
                        {task.title}
                      </h3>

                      {task.description && (
                        <p className="mt-2 whitespace-pre-wrap break-words text-sm text-slate-400">
                          {task.description}
                        </p>
                      )}

                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${priorityClass(
                            task.priority
                          )}`}
                        >
                          {task.priority} Priority
                        </span>

                        {task.deadline && (
                          <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                            Due: {task.deadline}
                          </span>
                        )}

                        <span
                          className={`rounded-full px-3 py-1 text-xs ${
                            task.completed
                              ? "bg-emerald-500/10 text-emerald-300"
                              : "bg-blue-500/10 text-blue-300"
                          }`}
                        >
                          {task.completed ? "Completed" : "Pending"}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => deleteTask(task.id)}
                      aria-label={`Delete ${task.title}`}
                      className="shrink-0 rounded-lg border border-red-900/70 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10"
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Tasks;
