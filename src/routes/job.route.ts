import express from "express";
import {
  createJob,
  deleteJob,
  getAlljobs,
} from "../controllers/job.controller";

const router = express.Router();

router.post("/create", createJob);
router.get("/getall", getAlljobs);
router.delete("/delete/:id", deleteJob);

export default router;
