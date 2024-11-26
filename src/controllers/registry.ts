import { Router } from "express";
import servicesService from "../services/registryService";
const router = Router();
import { z } from "zod";

const newServiceSchema = z.object({
  name: z.string(),
  description: z.string(),
});

router.get("/", async (req, res) => {
  res.status(200).json(await servicesService.getAllServices());
});

router.post("/", async (req, res, next) => {
  try {
    const newService = newServiceSchema.parse(req.body);
    const result = await servicesService.createNewService(newService);
    res.status(201).json(result);
  } catch (err: unknown) {
    next(err);
  }
});

export default router;
