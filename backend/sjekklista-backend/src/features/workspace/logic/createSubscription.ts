import { supabase } from "../../../lib/supabase";
import { ValidationError } from "../../shared/errors/ValidationError";
import {
  CreateSubscriptionRequest,
  createSubscriptionRequestSchema,
  CreateSubscriptionResult,
} from "../contracts/subscription";
import { SubscriptionPersistenceModel } from "../persistence/models/subscriptionPersistenceModel";

export const createSubscription = async (
  userId: string,
  request: CreateSubscriptionRequest
): Promise<CreateSubscriptionResult> => {
  const parseResult = createSubscriptionRequestSchema.safeParse(request);
  if (parseResult.error) {
    throw new ValidationError(parseResult.error.issues);
  }

  const persistenceModel: SubscriptionPersistenceModel = {
    id: crypto.randomUUID(),
    owner_id: userId,
    plan: request.plan,
    status: "active",
    created_at: new Date().toISOString(),
    current_period_end: new Date(
      Date.now() + 30 * 24 * 60 * 60 * 1000
    ).toISOString(), // 30 days from now
  };

  try {
    const { data, error } = await supabase
      .from("subscriptions")
      .insert([persistenceModel])
      .select("*");

    if (error) {
      return { success: false, message: error.message };
    }

    return { success: true, subscriptionId: persistenceModel.id };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return { success: false, message };
  }
};
