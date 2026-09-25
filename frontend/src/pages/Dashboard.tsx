function Dashboard() {
  const stats = [
    {
      title: "Current Projects",
      value: "0",
      subtitle: "Active work",
    },
    {
      title: "Upcoming Projects",
      value: "0",
      subtitle: "Planned work",
    },
    {
      title: "Completed Projects",
      value: "0",
      subtitle: "Finished work",
    },
    {
      title: "Pending Tasks",
      value: "0",
      subtitle: "Need attention",
    },
    {
      title: "Total Revenue",
      value: "₹0",
      subtitle: "All time",
    },
    {
      title: "This Month",
      value: "₹0",
      subtitle: "Revenue earned",
    },
  ];

  const currentWork = [
    {
      name: "No current projects",
      type: "Website / Marketing / Development",
      progress: 0,
    },
  ];

  const pendingWork = [
    {
      title: "No pending tasks",
      project: "You're all caught up",
      priority: "Low",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 p-8 text-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="mt-2 text-slate-400">
          Welcome back to Aryan WorkOS
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
          >
            <p className="text-sm text-slate-400">{stat.title}</p>

            <h2 className="mt-3 text-3xl font-bold">
              {stat.value}
            </h2>

            <p className="mt-2 text-xs text-slate-500">
              {stat.subtitle}
            </p>
          </div>
        ))}
      </div>

      {/* Work Overview */}
      <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Current Work */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Current Work</h2>
              <p className="mt-1 text-sm text-slate-500">
                Your active projects
              </p>
            </div>

            <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-400">
              0 Active
            </span>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
            {currentWork.map((work) => (
              <div key={work.name}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{work.name}</h3>
                    <p className="mt-1 text-xs text-slate-500">
                      {work.type}
                    </p>
                  </div>

                  <span className="text-sm text-slate-400">
                    {work.progress}%
                  </span>
                </div>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-blue-600"
                    style={{ width: `${work.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pending Work */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-5">
            <h2 className="text-lg font-semibold">Pending Work</h2>
            <p className="mt-1 text-sm text-slate-500">
              Tasks that need your attention
            </p>
          </div>

          <div className="space-y-3">
            {pendingWork.map((task) => (
              <div
                key={task.title}
                className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-4"
              >
                <div>
                  <h3 className="font-medium">{task.title}</h3>
                  <p className="mt-1 text-xs text-slate-500">
                    {task.project}
                  </p>
                </div>

                <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-400">
                  {task.priority}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;