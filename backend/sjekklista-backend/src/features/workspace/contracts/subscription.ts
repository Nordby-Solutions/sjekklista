import z from "zod";

export interface CreateSubscriptionResult {
  success: boolean;
  subscriptionId?: string;
  message?: string;
}

export const createSubscriptionRequestSchema = z.object({
  plan: z.enum(["free", "pro", "enterprise"]).default("free"), // adjust plan types if needed
  currentPeriodEnd: z.string().datetime().nullable().optional(),
});

export type CreateSubscriptionRequest = z.infer<
  typeof createSubscriptionRequestSchema
>;

// Backwards-compatibility alias: some code imports CreateSubscriptionParams
export type CreateSubscriptionParams = CreateSubscriptionRequest;

export const subscriptionSchema = z.object({
  id: z.string().uuid(),
  ownerId: z.string().uuid(),
  plan: z.enum(["free", "pro", "enterprise"]).default("free"), // adjust plan types if needed
  status: z.enum(["active", "canceled", "past_due"]).default("active"),
  currentPeriodEnd: z.string().datetime().nullable().optional(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
});
export type SubscriptionDto = z.infer<typeof subscriptionSchema>;

export const createSubscriptionSchema = subscriptionSchema.pick({
  plan: true,
  status: true,
  currentPeriodEnd: true,
  ownerId: true,
});
