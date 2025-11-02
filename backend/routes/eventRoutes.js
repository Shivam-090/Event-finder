import express from 'express';
import { addEvent, deleteEventById, getAllEvents, getEventById, incrementComing, togglePublished } from '../controllers/eventController.js';
import upload from '../middleware/multer.js';
import auth from '../middleware/auth.js';

const eventRouter = express.Router();

eventRouter.post('/add', upload.single('image'),auth, addEvent);
eventRouter.get('/all', getAllEvents);
eventRouter.get('/:eventId', getEventById);
eventRouter.post('/delete', auth, deleteEventById);
eventRouter.post('/toggle-publish', auth, togglePublished);
eventRouter.patch('/:id/coming', incrementComing)


export default eventRouter;