import type { Template } from "@pdfme/common";

export interface ReportTemplate {
  id: string;
  name: string;
  checklistTemplateId: string;
  reportObj: Template;
}
