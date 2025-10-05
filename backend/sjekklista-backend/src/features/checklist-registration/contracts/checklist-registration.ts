import { z } from "zod";

export const checklistRegistrationItemSchema = z.object({
  id: z.uuid(),
  templateItemId: z.uuid(),
  templateSectionId: z.string().uuid(),
  value: z.union([z.string(), z.boolean(), z.null()]),
  completedAt: z.string().nullable(),
  completedBy: z.string().nullable(),
});

export const checklistRegistrationSchema = z.object({
  id: z.uuid(),
  templateId: z.uuid(),
  templateVersionId: z.string().uuid(),
  status: z.enum(["draft", "not_started", "in_progress", "completed"]),
  assignedTo: z.string().nullable(),
  dueDatetime: z.string().nullable(), // ← if you rename this, TypeScript will catch it
  createdAt: z.string(),
  updatedAt: z.string(),
  createdBy: z.string(),
  updatedBy: z.string(),
  items: z.array(checklistRegistrationItemSchema),
});

export type ChecklistRegistration = z.infer<typeof checklistRegistrationSchema>;
