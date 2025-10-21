import { supabase } from "../../lib/supabase";
import {
  createTestUser,
  deleteTestUser,
  TestUser,
} from "../../__tests/testuser";
import { createSubscription } from "../../features/workspace/logic/createSubscription";
import { getSubscriptions } from "../../features/workspace/logic/getSubscriptions";

describe("Workspace API", () => {
  let testUser: TestUser;

  beforeAll(async () => {
    testUser = await createTestUser();
  });

  afterAll(async () => {
    await deleteTestUser(testUser.id);
  });

  test("can authenticate", async () => {
    expect(testUser.token).toBeDefined();
  });

  it("should validate subscriptions", async () => {
    await expect(
      createSubscription(testUser.id, {
        plan: "bogus-plan" as any,
        invald: "value",
        invalidProp: "value",
      } as any) // 'as any' just to bypass TS for the test
    ).rejects.toThrow();
  });

  it("should retrieve subscriptions", async () => {
    const createSubscriptionResult = await createSubscription(testUser.id, {
      plan: "free",
      currentPeriodEnd: null,
    });

    const getSubscriptionsResult = await getSubscriptions(testUser.id);

    expect(getSubscriptionsResult).toBeDefined();
    expect(getSubscriptionsResult.length).toBeGreaterThan(0);
  });

  it("should create subscriptions", async () => {
    const res = await createSubscription(testUser.id, {
      plan: "free",
      currentPeriodEnd: null,
    });
    expect(res.success).toBe(true);
    expect(res.subscriptionId).toBeDefined();
  });

  //   it("should create subcriptions", async () => {
  //     const res = await request(sjekklistaApp).post("/api/subscription").send({
  //       plan: "basic",
  //       status: "active",
  //       currentPeriodEnd: new Date().toISOString(),
  //       ownerId: "user-123",
  //     });
  //     expect(res.status).toBe(201);
  //     expect(res.body).toHaveProperty("id");
  //     expect(res.body.plan).toBe("basic");
  //   });
});
