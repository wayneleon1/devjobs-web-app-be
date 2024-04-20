import express from "express";
import {
  createJob,
  deleteJob,
  getAlljobs,
  getJob,
  updatejob,
} from "../controllers/job.controller";
import fileUpload from "../helper/multer";

const router = express.Router();

router.post("/", fileUpload.single("logo"), createJob);
router.get("/", getAlljobs);
router.get("/:id", getJob);
router.put("/:id", fileUpload.single("logo"), updatejob);
router.delete("/:id", deleteJob);

export default router;
