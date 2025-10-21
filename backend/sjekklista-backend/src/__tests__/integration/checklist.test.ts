import request from "supertest";
import sjekklistaApp from "../../app";
import {
  createTestUser,
  deleteTestUser,
  TestUser,
} from "../../__tests/testuser";

describe("Checklist Registration API", () => {
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

  // it("should create checklist template", async () => {
  //   const res = await request(sjekklistaApp)
  //     .post("/api/checklist-template")
  //     .set("Authorization", `Bearer ${testUser.token}`)
  //     .send({
  //       name: "Test Template",
  //       description: "A template for testing",
  //     });
  // });

  // it("should fetch checklists", async () => {
  //   const res = await request(sjekklistaApp)
  //     .get("/api/checklist-registration")
  //     .set("Authorization", `Bearer ${testUser.token}`);
  //   expect(res.status).toBe(200);
  //   expect(res.body).toEqual(expect.arrayContaining([]));
  // });
});
