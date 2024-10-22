import express from "express";
const router = express.Router();

import { createUser } from "../controllers/user.js";

router.post("/createUser", createUser);
export default router;
