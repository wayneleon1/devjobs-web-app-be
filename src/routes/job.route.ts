import express from "express";
import {
  createJob,
  deleteJob,
  getAlljobs,
  getJob,
  updatejob,
} from "../controllers/job.controller";
import fileUpload from "../helper/multer";
import validateToken from "../middlewares/validateToken";

const router = express.Router();

router.post("/", validateToken, fileUpload.single("logo"), createJob);
router.get("/", getAlljobs);
router.get("/:id", validateToken, getJob);
router.put("/:id", validateToken, fileUpload.single("logo"), updatejob);
router.delete("/:id", validateToken, deleteJob);

export default router;
