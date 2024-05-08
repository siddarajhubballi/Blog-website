import express from "express";
import { create } from "../controllers/comment.controller.js";
import {verifyToken} from "../utils/verifyUser.js";
const router = express.Router();

router.post("/create", verifyToken, create);

export default router;