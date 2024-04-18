import express from "express";
import { createJob } from "../controllers/job.controller";

const router = express.Router();

router.post("/create", createJob);

export default router;
