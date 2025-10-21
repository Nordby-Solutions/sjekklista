import { SubscriptionDto } from "../contracts/subscription";
import { getSubscriptionsPersistence } from "../persistence/getSubscriptionsPersistence";

export const getSubscriptions = async (
  userId: string
): Promise<SubscriptionDto[]> => {
  const subscriptionPersistence = await getSubscriptionsPersistence(userId);
  const subscriptionDtos = subscriptionPersistence.map(mapToDto);

  return subscriptionDtos;
};

export const mapToDto = (subscriptionPersistence: any): SubscriptionDto => {
  return {
    id: subscriptionPersistence.id,
    ownerId: subscriptionPersistence.owner_id,
    plan: subscriptionPersistence.plan,
    status: subscriptionPersistence.status,
    createdAt: subscriptionPersistence.created_at,
    currentPeriodEnd: subscriptionPersistence.current_period_end,
    updatedAt: subscriptionPersistence.updated_at,
  };
};
