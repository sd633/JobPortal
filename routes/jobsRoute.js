import express from 'express';
import userAuth from '../middlewares/authMiddleWare.js';
import { createJobController, deleteJobController, getAllJobsController, jobStatsController, updateJobsController } from '../controllers/jobsController.js';

const router = express.Router();

//CREATE JOB || POST
router.post('/create-job', userAuth, createJobController)

//GET JOB || GET
router.get('/get-job', userAuth, getAllJobsController)

//UPDATE JOB || PUT || PATCH
router.patch('/update-job/:id',userAuth, updateJobsController)

//DELETE JOB || DELETE
router.delete('/delete-job/:id',userAuth, deleteJobController)

//JOB STATS 
router.get('/job-stats',userAuth, jobStatsController)

export default router;