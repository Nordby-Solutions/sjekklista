export type ChecklistField = {
  id: string;
  label: string;
  sectionName: string;
  type: "textfield" | "textarea" | "checkbox" | "date" | "number" | "signature";
};

export type TextBlockDescriptor = {
  type: "text";
  style: "h1" | "h2" | "h3" | "body";
  label: string;
};

export type FieldOrText = ChecklistField | TextBlockDescriptor;

export type ReportBlock = {
  id: string;
  type: "field" | "text";
  label: string;
  fieldKey?: string;
  style?: "h1" | "h2" | "h3" | "body";
  x: number;
  y: number;
  width: number;
  height: number;
};
