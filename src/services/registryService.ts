import db from "../db/repositories/registry";

const getAllServices = async () => {
  return await db.getAllServices();
};

export default { getAllServices };
