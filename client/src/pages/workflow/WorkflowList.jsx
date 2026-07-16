import { useEffect, useState } from "react";
import api from "../../services/api";
import CreateWorkflowModal from "../../components/CreateWorkflowModal";

export default function WorkflowList() {
  const [workflows, setWorkflows] = useState([]);

  const fetchWorkflows = async () => {
    try {
      const res = await api.get("/workflows");
      setWorkflows(res.data.workflows);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchWorkflows();
  }, []);

  return (
    <div className="mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          My Workflows
        </h2>

        <CreateWorkflowModal
          onCreated={fetchWorkflows}
        />
      </div>

      {workflows.length === 0 ? (
        <div className="bg-slate-900 rounded-xl p-8 text-center text-slate-400">
          No workflows created yet.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {workflows.map((workflow) => (
            <div
              key={workflow._id}
              className="bg-slate-900 border border-slate-800 rounded-xl p-5"
            >
              <h3 className="text-xl font-semibold text-cyan-400">
                {workflow.name}
              </h3>

              <p className="mt-2 text-slate-400">
                {workflow.description}
              </p>

              <div className="mt-4 text-sm text-slate-500">
                {workflow.status}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}