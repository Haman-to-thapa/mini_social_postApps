import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import {
  createPost,
  getFeed,
  likePost,
 commentPost } from "../controllers/postController";
import upload from "../middleware/uploadMiddleware";

const router = Router();

router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  createPost
);
router.get("/", getFeed);
router.put("/:id/like", authMiddleware, likePost);
router.post("/:id/comment", authMiddleware, commentPost);

export default router;
