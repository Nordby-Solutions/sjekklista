import { z } from "zod";

export interface WorkspaceMemberPersistenceModel {
  workspace_id: string;
  user_id: string;
  role: "owner" | "admin" | "standard";
  invited_at?: string;
  joined_at?: string | null;
}

export const workspaceMemberSchema = z.object({
  workspaceId: z.string().uuid(),
  userId: z.string().uuid(),
  role: z.enum(["owner", "admin", "standard"]),
  invitedAt: z.string().datetime().optional(),
  joinedAt: z.string().datetime().nullable().optional(),
});

export type WorkspaceMemberDto = z.infer<typeof workspaceMemberSchema>;

export const createWorkspaceMemberSchema = workspaceMemberSchema.pick({
  workspaceId: true,
  userId: true,
  role: true,
});
