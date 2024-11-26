import express from "express";

import registryRouter from "./registry";

export const routes = express.Router();

routes.use("/api/registry", registryRouter);
