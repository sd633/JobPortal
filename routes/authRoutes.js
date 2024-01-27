import express from "express";
import { loginController, registerController } from "../controllers/authController.js";
import userAuth from "../middlewares/authMiddleWare.js";
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Use an external store for consistency across multiple server instances.
})

const router = express.Router();


//REGISTER AND POST
router.post('/register',limiter, registerController)


//LOGIN AND POST
router.post('/login',limiter, loginController)

export default router;