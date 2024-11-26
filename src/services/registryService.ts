import db from "../db/repositories/registry";
import { NewService } from "../utils/types";

const getAllServices = async () => {
  return await db.getAllServices();
};

const createNewService = async (newService: NewService) => {
  return await db.createNewService(newService);
};

export default { getAllServices, createNewService };
