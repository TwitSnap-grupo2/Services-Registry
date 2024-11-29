import { Router } from "express";
import registryService from "../services/registryService";
const router = Router();
import { z } from "zod";

const newServiceSchema = z.object({
  name: z.string(),
  description: z.string(),
});

const validateSchema = z.object({
  apiKey: z.string(),
});

router.get("/", async (req, res) => {
  res.status(200).json(await registryService.getAllServices());
});

router.post("/", async (req, res, next) => {
  try {
    const newService = newServiceSchema.parse(req.body);
    const result = await registryService.createNewService(newService);
    res.status(201).json(result);
  } catch (err: unknown) {
    next(err);
  }
});

router.patch("/:id/block", async (req, res, next) => {
  try {
    const serviceId = req.params.id;
    const blockedService = await registryService.blockService(serviceId);

    if (!blockedService) {
      res.status(404);
    }
    res.status(200).json(blockedService);
  } catch (err: unknown) {
    next(err);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const serviceId = req.params.id;
    const service = await registryService.createServiceApiKey(serviceId);
    if (!service) {
      res.status(404);
    }
    res.status(200).json(service);
  } catch (err: unknown) {
    next(err);
  }
});

router.get("/validate", async (req, res, next) => {
  try {
    const params = validateSchema.parse(req.query);

    const isValid = await registryService.isValidApiKey(params.apiKey);

    if (isValid) {
      res.status(200).end();
      return;
    }
    // apiKey is not valid
    res.status(401).end();
  } catch (err: unknown) {
    next(err);
  }
});

router.post("/ping", async (req, res) => {
  res.status(200).json({ message: "pong" });
});

export default router;
