import db from "../db/repositories/registry";
import getExpiration from "../utils/expiration";
import { NewService } from "../utils/types";

const getAllServices = async () => {
  return await db.getAllServices();
};

const getServiceById = async (serviceId: string) => {
  const service = await db.getServiceById(serviceId);
  if (service.length == 0) return null;
  return service[0];
};

const createNewService = async (newService: NewService) => {
  const service = await db.createNewService(newService, getExpiration());

  if (service.length === 0) return null;

  return service[0];
};

const blockService = async (serviceId: string) => {
  const service = await db.invalidateApiKey(serviceId);
  if (service.length === 0) {
    return null;
  }
  return service[0];
};

const createServiceApiKey = async (serviceId: string) => {
  const service = await db.createApiKey(serviceId, getExpiration());
  if (service.length === 0) {
    return null;
  }
  return service[0];
};

const isValidApiKey = async (apiKey: string): Promise<boolean> => {
  const service = await db.getServiceByApiKey(apiKey);

  if (service.length == 0) return false;

  if (service[0].validUntil < new Date()) return false;

  return true;
};

export default {
  getAllServices,
  getServiceById,
  createNewService,
  blockService,
  createServiceApiKey,
  isValidApiKey,
};
