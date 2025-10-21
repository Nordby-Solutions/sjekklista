export interface SubscriptionPersistenceModel {
  id: string;
  owner_id: string;
  plan: string; // free | pro | enterprise
  status: "active" | "canceled" | "past_due";
  current_period_end?: string | null;
  created_at?: string;
  updated_at?: string;
}
