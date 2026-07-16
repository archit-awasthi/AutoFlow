import api from "./api";

export const getWorkflows = async () => {
  const res = await api.get("/workflows");
  return res.data.workflows;
};

export const getWorkflow = async (id) => {
  const res = await api.get(`/workflows/${id}`);
  return res.data.workflow;
};

export const createWorkflow = async (data) => {
  const res = await api.post("/workflows", data);
  return res.data.workflow;
};

export const saveFlow = async (id, nodes, edges) => {
  const res = await api.put(`/workflows/${id}/flow`, {
    nodes,
    edges,
  });

  return res.data.workflow;
};