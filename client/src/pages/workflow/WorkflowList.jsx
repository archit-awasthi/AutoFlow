import { useEffect, useState } from "react";
import api from "../../services/api";

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
      <h2 className="text-2xl font-bold mb-6">My Workflows</h2>

      {workflows.length === 0 ? (
        <div className="bg-slate-900 p-8 rounded-xl text-center text-slate-400">
          No workflows created yet.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {workflows.map((workflow) => (
            <div
              key={workflow._id}
              className="bg-slate-900 rounded-xl p-5 border border-slate-800"
            >
              <h3 className="text-xl font-semibold text-cyan-400">
                {workflow.name}
              </h3>

              <p className="text-slate-400 mt-2">
                {workflow.description || "No description"}
              </p>

              <div className="mt-5 text-sm text-slate-500">
                Status: {workflow.status}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}