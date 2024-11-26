import { beforeEach, describe, expect, test } from "@jest/globals";
import supertest from "supertest";
import app from "../app";
import { response } from "express";
import servicesRepository from "../db/repositories/registry";
import { testService } from "./testHelper";
import { InsertService } from "../db/schemas/serviceSchema";

const api = supertest(app);

describe("services", () => {
  beforeEach(async () => {
    await servicesRepository.deleteAllServices();
  });

  test("can be created", async () => {
    const res = await api.post("/api/registry").send(testService).expect(201);

    const data: InsertService = res.body[0];

    expect(data.id).toBeDefined();
    expect(data.createdAt).toBeDefined();
    expect(data.apiKey).toBeDefined();
    expect(data.name).toBe(testService.name);
    expect(data.description).toBe(testService.description);
  });

  test("must have a name", async () => {
    const service = { description: "a testing service" };
    await api.post("/api/registry/").send(service).expect(400);
  });

  test("can be obtained when there are no services", async () => {
    const res = await api.get("/api/registry").expect(200);
    expect(res.body).toHaveLength(0);
  });
});
