import { z } from "zod";

export interface WorkspacePersistenceModel {
  id: string;
  subscription_id: string;
  name: string;
  description?: string | null;
  owner_id: string | null;
  created_at?: string;
}

export const workspaceSchema = z.object({
  id: z.string().uuid(),
  subscriptionId: z.string().uuid(),
  name: z.string().min(1),
  description: z.string().nullable().optional(),
  ownerId: z.string().uuid().nullable(), // since on delete set null
  createdAt: z.string().datetime().optional(),
});

export type WorkspaceDto = z.infer<typeof workspaceSchema>;

export const createWorkspaceSchema = workspaceSchema.pick({
  subscriptionId: true,
  name: true,
  description: true,
  ownerId: true,
});
