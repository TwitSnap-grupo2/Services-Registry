import { randomUUID } from "crypto";
import { NewService } from "../../utils/types";
import { SelectService, serviceTable } from "../schemas/serviceSchema";
import { db } from "../setup";
import { eq } from "drizzle-orm";

const getAllServices = async (): Promise<Array<SelectService>> => {
  return db.select().from(serviceTable);
};

const getServiceById = async (
  serviceId: string
): Promise<Array<SelectService>> => {
  return await db
    .select()
    .from(serviceTable)
    .where(eq(serviceTable.id, serviceId));
};

const createNewService = async (newService: NewService, validUntil: Date) => {
  return db
    .insert(serviceTable)
    .values({
      ...newService,
      id: randomUUID(),
      createdAt: new Date(),
      apiKey: randomUUID(),
      validUntil: validUntil,
    })
    .returning();
};

const invalidateApiKey = async (serviceId: string) => {
  return await db
    .update(serviceTable)
    .set({
      validUntil: new Date(),
    })
    .where(eq(serviceTable.id, serviceId))
    .returning();
};

const createApiKey = async (serviceId: string, validUntil: Date) => {
  return await db
    .update(serviceTable)
    .set({
      apiKey: randomUUID(),
      validUntil: validUntil,
    })
    .where(eq(serviceTable.id, serviceId))
    .returning();
};

const getServiceByApiKey = async (apiKey: string) => {
  return db.select().from(serviceTable).where(eq(serviceTable.apiKey, apiKey));
};

// for testing purposes
const deleteAllServices = async () => {
  await db.delete(serviceTable);
};

export default {
  getAllServices,
  getServiceById,
  createNewService,
  deleteAllServices,
  invalidateApiKey,
  createApiKey,
  getServiceByApiKey,
};
