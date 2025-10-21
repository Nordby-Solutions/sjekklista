import { AuthenticatedRequest } from "../middleware/authenticate";

declare global {
  namespace Express {
    interface Request extends AuthenticatedRequest {}
  }
}
