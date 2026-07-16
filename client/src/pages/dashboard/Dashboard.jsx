import { useAuth } from "../../context/AuthContext";

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Navbar */}

      <nav className="h-16 border-b border-slate-800 flex items-center justify-between px-8">

        <h1 className="text-2xl font-bold text-cyan-400">
          AutoFlow
        </h1>

        <div className="flex items-center gap-5">

          <span className="text-slate-300">
            {user?.name}
          </span>

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
          >
            Logout
          </button>

        </div>

      </nav>

      {/* Hero */}

      <div className="p-10">

        <h2 className="text-4xl font-bold">
          Browser Automation Platform
        </h2>

        <p className="mt-3 text-slate-400">
          Build, execute and manage browser workflows.
        </p>

        <div className="mt-10 grid grid-cols-3 gap-6">

          <div className="bg-slate-900 rounded-xl p-6">
            <h3 className="text-cyan-400 text-lg font-semibold">
              Total Workflows
            </h3>

            <p className="text-4xl mt-3 font-bold">
              0
            </p>
          </div>

          <div className="bg-slate-900 rounded-xl p-6">
            <h3 className="text-cyan-400 text-lg font-semibold">
              Executions
            </h3>

            <p className="text-4xl mt-3 font-bold">
              0
            </p>
          </div>

          <div className="bg-slate-900 rounded-xl p-6">
            <h3 className="text-cyan-400 text-lg font-semibold">
              Success Rate
            </h3>

            <p className="text-4xl mt-3 font-bold">
              --
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}