import { Router } from "express";
import { AuthenticatedRequest } from "../../middleware/auth";
import { createSubscription } from "./logic/createSubscription";
import { getSubscriptions } from "./logic/getSubscriptions";

const router = Router();

router.get("/workspaces", (_, res) => {
  res.status(200).json({ message: "List of workspaces" });
});

router.get("/subscription", async (req: AuthenticatedRequest, res) => {
  try {
    const subscriptions = await getSubscriptions(req.user!.id);
    res.status(200).json(subscriptions);
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.post("/subscription", async (req: AuthenticatedRequest, res) => {
  try {
    const createSubscriptionResponse = await createSubscription(
      req.user!.id,
      req.body
    );
    const statusCode = createSubscriptionResponse.success ? 201 : 400;
    res.status(statusCode).json(createSubscriptionResponse);
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

export default router;
