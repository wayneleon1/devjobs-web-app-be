import express from "express";
import { createJob, getAlljobs } from "../controllers/job.controller";

const router = express.Router();

router.post("/create", createJob);
router.get("/getall", getAlljobs);

export default router;
