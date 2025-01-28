import express from 'express';
import { loginUser, logout, registerUser, userProfile } from '../controllers/user.controller';
import { isAuthenticated } from '../middlewares/isAuthenticated';

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", isAuthenticated, userProfile);
router.get("/logout", isAuthenticated, logout);

export default router;