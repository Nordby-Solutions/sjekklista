import request from "supertest";
import sjekklistaApp from "../../app";

type HTTPMethod = "get" | "post" | "put" | "patch" | "delete";

const protectedEndpoints: { method: HTTPMethod; path: string }[] = [
  { method: "get", path: "/api/workspaces" },
  { method: "post", path: "/api/workspaces" },
  { method: "get", path: "/api/checklist-registration" },
  { method: "post", path: "/api/checklist-registration" },
];

describe("Auth protection for all endpoints", () => {
  protectedEndpoints.forEach(({ method, path }) => {
    test(`${method.toUpperCase()} ${path} returns 401 if no token`, async () => {
      let res;
      switch (method) {
        case "get":
          res = await request(sjekklistaApp).get(path);
          break;
        case "post":
          res = await request(sjekklistaApp).post(path).send({});
          break;
        case "put":
          res = await request(sjekklistaApp).put(path).send({});
          break;
        case "patch":
          res = await request(sjekklistaApp).patch(path).send({});
          break;
        case "delete":
          res = await request(sjekklistaApp).delete(path);
          break;
        default:
          throw new Error(`Unsupported method: ${method}`);
      }

      expect(res.status).toBe(401);
    });
  });
});
