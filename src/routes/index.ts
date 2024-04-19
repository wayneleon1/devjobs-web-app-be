import express, { Router } from "express";
const router: Router = express.Router();

import jobRouter from "../routes/job.route";
import userRouter from "../routes/user.route";

router.use("/job", jobRouter);
router.use("/user", userRouter);

export default router;
