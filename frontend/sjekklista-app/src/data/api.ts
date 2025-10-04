import axios from "axios";
import localforage from "localforage";
import type {
  Checklist,
  ChecklistTemplate,
  ChecklistTemplateLookup,
} from "./models/checklist-template";
import type { ReportTemplate } from "./models";

// Configure LocalForage
localforage.config({
  name: "sjekkListaStorage", // Name of the database
  storeName: "sjekkListaDataStore", // Name of the data store
  version: 1.0, // Database version
  description: "Local storage for sjekklista", // Description for the database
  size: 5 * 1024 * 1024, // Size of the database in bytes (5 MB in this example)
  driver: [localforage.WEBSQL, localforage.INDEXEDDB, localforage.LOCALSTORAGE], // Preferred storage drivers in order
});

const CHECKLIST_TEMPLATE = "checklist_templates";
const CHECKLIST = "checklists";
const REPORT_TEMPLATE = "report_template";

const getLatestChecklistTemplate = async () => {
  const data = await localforage.getItem<ChecklistTemplate>(
    "latestChecklistTemplate"
  );

  return data;
};

const getChecklistTemplates = async () => {
  const data = await localforage.getItem<ChecklistTemplate[]>(
    CHECKLIST_TEMPLATE
  );
  return data ?? [];
};

const findChecklistTemplate = async (id: string) => {
  const data = await localforage.getItem<ChecklistTemplate[]>(
    CHECKLIST_TEMPLATE
  );
  const checklist = data?.find((c) => c.id === id);

  return checklist || null;
};

const getChecklistTemplateLookup = async () => {
  const data =
    (await localforage.getItem<ChecklistTemplate[]>(CHECKLIST_TEMPLATE)) ?? [];

  const lookups = data.map(
    (x) =>
      ({
        id: x.id,
        name: x.name,
        description: x.description,
      } as ChecklistTemplateLookup)
  );

  return lookups;
};

const saveChecklistTemplate = async (template: ChecklistTemplate) => {
  const checklists =
    (await localforage.getItem<ChecklistTemplate[]>(CHECKLIST_TEMPLATE)) ?? [];

  if (checklists.find((c) => c.id === template.id)) {
    // Update existing
    const index = checklists.findIndex((c) => c.id === template.id);
    checklists[index] = template;
  } else {
    checklists.push(template);
  }

  await localforage.setItem(CHECKLIST_TEMPLATE, checklists);
};

const saveChecklist = async (checklist: Checklist) => {
  const checklists = (await getChecklists()) ?? [];

  if (checklists.find((c) => c.id === checklist.id)) {
    // Update existing
    const index = checklists.findIndex((c) => c.id === checklist.id);
    checklists[index] = checklist;
  } else {
    checklists.push(checklist);
  }

  await localforage.setItem(CHECKLIST, checklists);
};

const getChecklists = async () => {
  const data = await localforage.getItem<Checklist[]>(CHECKLIST);
  return data ?? [];
};

const getReportTemplates = async () => {
  const reportTemplates =
    (await localforage.getItem<ReportTemplate[]>(REPORT_TEMPLATE)) ?? [];

  return reportTemplates;
};

const saveReportTemplate = async (template: ReportTemplate) => {
  const reportTemplates = await getReportTemplates();

  if (reportTemplates.find((c) => c.id === template.id)) {
    // Update existing
    const index = reportTemplates.findIndex((c) => c.id === template.id);
    reportTemplates[index] = template;
  } else {
    reportTemplates.push(template);
  }

  await localforage.setItem(REPORT_TEMPLATE, reportTemplates);
};

export const API = {
  reportTemplates: {
    saveReportTemplate,
    getReportTemplates,
  },
  checklist: {
    getChecklists,
    saveChecklist,
  },
  checklistTempate: {
    getLatestChecklistTemplate,
    saveChecklistTemplate,
    getChecklistTemplates,
    getChecklistTemplateLookup,
    findChecklistTemplate,
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
