import { z } from "zod";

export const checklistTemplateSchema = z.object({
  id: z.string().uuid(),
  description: z.string().nullable().optional(),
  versionId: z.number().default(1),
  name: z.string().max(100),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime().nullable().optional(),
  definition: z.record(z.string(), z.any()),
  workspaceId: z.string().uuid(),
});

export interface ChecklistTemplatePersistenceModel {
  id: string; // uuid
  description?: string | null;
  version_id: number;
  name: string;
  created_at: string; // ISO timestamp
  updated_at?: string | null;
  definition: Record<string, any>;
  workspace_id: string; // uuid
}

export type ChecklistTemplateDto = z.infer<typeof checklistTemplateSchema>;
