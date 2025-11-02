import express from 'express';
import { adminLogin, getAllEventsAdmin, getDasboard } from '../controllers/adminController.js';
import auth from '../middleware/auth.js'
const adminRouter = express.Router();

adminRouter.post('/login',adminLogin)
adminRouter.get('/events', auth, getAllEventsAdmin)
adminRouter.get('/dashboard', auth, getDasboard)


export default adminRouter;