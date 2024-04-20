import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  loginUser,
  updateUser,
} from "../controllers/user.controller";
import fileUpload from "../helper/multer";
const router = express.Router();

router.post("/", fileUpload.single("file"), createUser);
router.post("/login", fileUpload.single("file"), loginUser);
router.get("/", getAllUsers);
router.get("/:id", getUser);
router.put("/:id", fileUpload.single("file"), updateUser);
router.delete("/:id", deleteUser);

export default router;
