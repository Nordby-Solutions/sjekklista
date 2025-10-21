import { ZodIssue } from "zod";

export class ValidationError extends Error {
  public status = 400;
  public issues: ZodIssue[];
  constructor(issues: ZodIssue[]) {
    super("Validation failed");
    this.name = "ValidationError";
    this.issues = issues;
  }
}
