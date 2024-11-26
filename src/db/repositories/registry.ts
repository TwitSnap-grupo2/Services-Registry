import { SelectService, serviceTable } from "../schemas/serviceSchema";
import { db } from "../setup";

const getAllServices = async (): Promise<Array<SelectService>> => {
  return db.select().from(serviceTable);
};

export default { getAllServices };
