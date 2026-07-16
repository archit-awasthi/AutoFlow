import api from "./api";

export const runWorkflow = async (workflowId) => {
  const res = await api.post(
    `/workflows/${workflowId}/run`
  );

  return res.data;
};