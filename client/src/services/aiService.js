import api from "./api";

export const generateWorkflowAI = async (prompt) => {
  const res = await api.post("/workflows/generate", {
    prompt,
  });

  return res.data.workflow;
};