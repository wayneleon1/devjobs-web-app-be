import express from "express";
import {
  createJob,
  deleteJob,
  getAlljobs,
  getJob,
} from "../controllers/job.controller";

const router = express.Router();

router.post("/", createJob);
router.get("/", getAlljobs);
router.get("/:id", getJob);
router.delete("/:id", deleteJob);

export default router;
