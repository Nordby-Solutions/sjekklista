import request from "supertest";
import sjekklistaApp from "../../app";

describe("Checklist Registration API", () => {
  // beforeAll(async () => {
  //   // Optional: seed test data
  //   await supabase.from("users").insert({ name: "Test User" });
  // });

  // afterAll(async () => {
  //   // Cleanup
  //   await supabase.from("users").delete().eq("name", "Test User");
  // });

  it("should fetch checklists", async () => {
    const res = await request(sjekklistaApp).get("/api/checklist-registration");
    expect(res.status).toBe(200);
    expect(res.body).toEqual(expect.arrayContaining([]));
  });
});
