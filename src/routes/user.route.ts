import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
} from "../controllers/user.controller";
const router = express.Router();

router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/:id", getUser);
router.delete("/:id", deleteUser);

export default router;
