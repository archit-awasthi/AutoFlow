import { useState } from "react";

import { useAuth } from "../../context/AuthContext";
import WorkflowList from "../workflow/WorkflowList";
import WorkflowBuilder from "../workflow/WorkflowBuilder";

export default function Dashboard() {
  const { user, logout } = useAuth();

  const [showBuilder, setShowBuilder] = useState(false);
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navbar */}
      <nav className="h-16 border-b border-slate-800 flex items-center justify-between px-8">
        <h1 className="text-2xl font-bold text-cyan-400">
          AutoFlow
        </h1>

        <div className="flex items-center gap-5">
          <span>{user?.name}</span>

          <button
            onClick={() => setShowBuilder(!showBuilder)}
            className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded"
          >
            {showBuilder ? "Dashboard" : "Workflow Builder"}
          </button>

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Content */}
      <div className="p-10">
        {!showBuilder ? (
          <>
            <h2 className="text-4xl font-bold">
              Browser Automation Platform
            </h2>

            <p className="mt-3 text-slate-400">
              Build, execute and manage browser workflows.
            </p>

            <WorkflowList
              onOpenWorkflow={(workflow) => {
                setSelectedWorkflow(workflow);
                setShowBuilder(true);
              }}
            />
          </>
        ) : (
          <>
            <h2 className="text-4xl font-bold mb-2">
              Workflow Builder
            </h2>

            <p className="text-slate-400 mb-6">
              Design your browser automation visually.
            </p>

            <WorkflowBuilder
              workflowId={selectedWorkflow?._id}
              nodesData={selectedWorkflow?.nodes}
              edgesData={selectedWorkflow?.edges}
            />
          </>
        )}
      </div>
    </div>
  );
}