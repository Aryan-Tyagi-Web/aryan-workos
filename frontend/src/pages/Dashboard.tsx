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
    </div>
  );
}

export default Dashboard;