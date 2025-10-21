import { supabase } from "../../../lib/supabase";
import { SubscriptionPersistenceModel } from "./models/subscriptionPersistenceModel";

export const getSubscriptionsPersistence = async (userId: string) => {
  const res = await supabase
    .from("subscriptions")
    .select("*")
    .eq("owner_id", userId);

  if (res.error) {
    throw res.error;
  }

  return res.data as SubscriptionPersistenceModel[];
};
