import axios from "axios";
import localforage from "localforage";
import type { ChecklistTemplate } from "./models/checklist-template";

// Configure LocalForage
localforage.config({
  name: "sjekkListaStorage", // Name of the database
  storeName: "sjekkListaDataStore", // Name of the data store
  version: 1.0, // Database version
  description: "Local storage for sjekklista", // Description for the database
  size: 5 * 1024 * 1024, // Size of the database in bytes (5 MB in this example)
  driver: [localforage.WEBSQL, localforage.INDEXEDDB, localforage.LOCALSTORAGE], // Preferred storage drivers in order
});

const getLatestChecklistTemplate = async () => {
  const data = await localforage.getItem<ChecklistTemplate>(
    "latestChecklistTemplate"
  );

  return data;
};

const getChecklistTemplates = async () => {
  const data = await localforage.getItem<ChecklistTemplate[]>("checklists");
  return data ?? [];
};

const getChecklistTemplateLookup = async () => {
  const data =
    (await localforage.getItem<ChecklistTemplate[]>("checklists")) ?? [];

  return data.map((x) => ({ id: x.id, name: x.name }));
};

const saveChecklistTemplate = async (template: ChecklistTemplate) => {
  const checklists =
    (await localforage.getItem<ChecklistTemplate[]>("checklists")) ?? [];

  if (checklists.find((c) => c.id === template.id)) {
    // Update existing
    const index = checklists.findIndex((c) => c.id === template.id);
    checklists[index] = template;
  } else {
    checklists.push(template);
  }

  await localforage.setItem("checklists", checklists);
};

// const createChecklistTemplate = async (template: ChecklistTemplate) => {
//   await localforage.setItem("latestChecklistTemplate", template);
// };

export const API = {
  checklistTempate: {
    getLatestChecklistTemplate,
    saveChecklistTemplate,
    getChecklistTemplates,
    getChecklistTemplateLookup,
  },
};

// Axios instance
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://your-api.com",
  headers: { "Content-Type": "application/json" },
});

// Wrapper POST request
export async function post(endpoint: string, data: any) {
  try {
    const res = await api.post(endpoint, data);
    return res.data;
  } catch (err: any) {
    throw err; // Server returned 4xx/5xx
  }
}
