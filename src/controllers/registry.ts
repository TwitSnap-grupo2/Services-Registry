import { Router } from "express";
import servicesService from "../services/registryService";
const router = Router();

router.get("/", async (req, res) => {
  res.status(200).json(await servicesService.getAllServices());
});

router.post("/", async (req, res) => {});

export default router;
