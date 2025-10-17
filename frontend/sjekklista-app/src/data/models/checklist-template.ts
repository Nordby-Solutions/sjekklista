export interface Checklist {
  id: string;
  templateId: string;
  templateVersionId: number;
  status: "draft" | "not_started" | "in_progress" | "completed";
  assignedTo: string | null; // User ID or name
  dueDate: string | null; // ISO date string
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  createdBy: string; // User ID or name
  updatedBy: string; // User ID or name

  items: ChecklistItem[];
}

export interface ChecklistItem {
  id: string;
  templateItemId: string;
  templateSectionId: string;
  value: string | boolean | null; // Value can be text, boolean (for checkbox), or null if not filled
  completedAt: string | null; // ISO date string when the item was completed
  completedBy: string | null; // User ID or name who completed the item
}

export type ChecklistTemplate = {
  id: string; // uuid
  name: string;
  created_at: string; // ISO date string
  updated_at: string | null; // ISO date string or null
  definition: any; // JSON object, type as needed
  workspaceId: string; // uuid
  description: string;
  versionId: number;

  items: ChecklistTemplateSection[];
};

export interface ChecklistTemplateSection {
  id: string;
  name: string;
  description: string | null; // Optional description for the section
  items: ChecklistTemplateItem[];
}

export type ChecklistTemplateLookup = {
  id: string;
  name: string;
  description: string;
};

export interface CreateChecklistTemplateArgs {
  name: string;
  description: string;
  items: ChecklistTemplateSection[];
}

export interface ChecklistTemplateItem {
  id: string;
  label: string;
  info: string | null; // Optional additional info
  type: "textfield" | "textarea" | "checkbox" | "date" | "number" | "signature";
  required: boolean;
}
