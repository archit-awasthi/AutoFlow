import { useAuth } from "../../context/AuthContext";
import WorkflowList from "../workflow/WorkflowList";

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <nav className="h-16 border-b border-slate-800 flex items-center justify-between px-8">

        <h1 className="text-2xl font-bold text-cyan-400">
          AutoFlow
        </h1>

        <div className="flex items-center gap-5">

          <span>{user?.name}</span>

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
          >
            Logout
          </button>

        </div>

      </nav>

      <div className="p-10">

        <h2 className="text-4xl font-bold">
          Browser Automation Platform
        </h2>

        <p className="mt-3 text-slate-400">
          Build, execute and manage browser workflows.
        </p>

        <WorkflowList />

      </div>

    </div>
  );
}