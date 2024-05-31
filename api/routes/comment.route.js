import express from "express";
import { create, getPostComments, likeComment } from "../controllers/comment.controller.js";
import {verifyToken} from "../utils/verifyUser.js";
const router = express.Router();

router.post("/create", verifyToken, create);
router.get("/getPostComments/:postId", getPostComments)
router.put("/likeComment/:commentId", verifyToken, likeComment);

export default router;