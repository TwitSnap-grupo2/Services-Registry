import { randomUUID } from "crypto";
import { NewService } from "../../utils/types";
import { SelectService, serviceTable } from "../schemas/serviceSchema";
import { db } from "../setup";

const getAllServices = async (): Promise<Array<SelectService>> => {
  return db.select().from(serviceTable);
};

const createNewService = async (newService: NewService) => {
  return db
    .insert(serviceTable)
    .values({
      ...newService,
      id: randomUUID(),
      createdAt: new Date(),
      apiKey: randomUUID(),
    })
    .returning();
};

const deleteAllServices = async () => {
  await db.delete(serviceTable);
};
export default { getAllServices, createNewService, deleteAllServices };
