import { NewService } from "../utils/types";
import db from "../db/repositories/registry";
import getExpiration from "../utils/expiration";

export const testService: NewService = {
  name: "Test service",
  description: "a service for testing",
};

export const createNewService = async () => {
  return (await db.createNewService(testService, getExpiration()))[0];
};
