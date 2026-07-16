import { useState } from "react";
import { createWorkflow } from "../services/workflowService";

export default function CreateWorkflowModal({ onCreated }) {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createWorkflow({
        ...form,
        steps: [],
      });

      setForm({
        name: "",
        description: "",
      });

      setOpen(false);

      onCreated();
    } catch (err) {
      alert(err.response?.data?.message || "Failed");
    }
  };

  if (!open)
    return (
      <button
        onClick={() => setOpen(true)}
        className="bg-cyan-500 hover:bg-cyan-600 px-5 py-3 rounded-lg font-semibold"
      >
        + New Workflow
      </button>
    );

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center">

      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 w-[500px] rounded-xl p-8 space-y-5"
      >
        <h2 className="text-2xl font-bold">
          Create Workflow
        </h2>

        <input
          placeholder="Workflow Name"
          className="w-full p-3 rounded bg-slate-800"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
        />

        <textarea
          placeholder="Description"
          className="w-full p-3 rounded bg-slate-800"
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
        />

        <div className="flex justify-end gap-3">

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="px-4 py-2 rounded bg-slate-700"
          >
            Cancel
          </button>

          <button
            className="px-5 py-2 rounded bg-cyan-500"
          >
            Create
          </button>

        </div>

      </form>

    </div>
  );
}