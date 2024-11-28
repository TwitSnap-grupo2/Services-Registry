import { beforeEach, describe, expect, test } from "@jest/globals";
import supertest from "supertest";
import app from "../app";
import servicesRepository from "../db/repositories/registry";
import { testService, createNewService } from "./testHelper";
import { InsertService } from "../db/schemas/serviceSchema";
import { Service } from "../utils/types";

const api = supertest(app);

describe("services", () => {
  beforeEach(async () => {
    await servicesRepository.deleteAllServices();
  });

  test("can be created", async () => {
    const res = await api.post("/api/registry").send(testService).expect(201);
    const data: InsertService = res.body;

    expect(data.id).toBeDefined();
    expect(data.createdAt).toBeDefined();
    expect(data.apiKey).toBeDefined();
    expect(data.name).toBe(testService.name);
    expect(data.description).toBe(testService.description);
    expect(data.validUntil).toBeDefined();
  });

  test("must have a name", async () => {
    const service = { description: "a testing service" };

    await api.post("/api/registry/").send(service).expect(400);
  });

  test("can be obtained when there are no services", async () => {
    const res = await api.get("/api/registry").expect(200);

    expect(res.body).toHaveLength(0);
  });

  describe("when registered", () => {
    let service: Service;
    beforeEach(async () => {
      service = await createNewService();
    });
    test("can be blocked", async () => {
      const res = await api
        .patch(`/api/registry/${service.id}/block`)
        .expect(200);
      const data = res.body;

      expect(data.id).toBe(service.id);
      expect(data.name).toBe(service.name);
      expect(data.validUntil).not.toBe(service.validUntil);
    });

    test("can get a new apiKey", async () => {
      const startApiKey = service.apiKey;

      const res = await api.patch(`/api/registry/${service.id}`).expect(200);
      const data = res.body;

      expect(service.id).toBe(data.id);
      expect(startApiKey).not.toBe(data.apiKey);
    });

    describe("can be validated", () => {
      test("returns ok if apiKey is valid", async () => {
        await api
          .get(`/api/registry/validate?apiKey=${service.apiKey}`)
          .expect(200);
      });
      test("returns unauthorized if apiKey is invalid", async () => {
        await api.patch(`/api/registry/${service.id}/block`).expect(200);
        await api
          .get(`/api/registry/validate?apiKey=${service.apiKey}`)
          .expect(401);
      });
    });
  });
});
