export type ChecklistTemplate = {
  id: string;
  name: string;
  description: string;
  items: ChecklistTemplateSection[];
};

export interface CreateChecklistTemplateArgs {
  name: string;
  description: string;
  items: ChecklistTemplateSection[];
}

export interface ChecklistTemplateSection {
  id: string;
  name: string;
  description: string | null; // Optional description for the section
  items: ChecklistTemplateItem[];
}

export interface ChecklistTemplateItem {
  id: string;
  label: string;
  info: string | null; // Optional additional info
  type: "textfield" | "textarea" | "checkbox" | "date" | "number";
  required: boolean;
}
