import express from 'express';
import userAuth from '../middlewares/authMiddleWare.js';
import { getAllUsers, updateController } from '../controllers/userController.js';

const router = express.Router();

//GET USER
router.get('/all-users', userAuth, getAllUsers)

//UPDATE
router.put('/update-user', userAuth, updateController)

export default router;