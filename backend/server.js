import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connect } from 'mongoose';
import connectDB from './configs/db.js';
import adminRouter from './routes/adminRoutes.js';
import eventRouter from './routes/eventRoutes.js';

const app = express();

await connectDB()


// Middleware
app.use(cors())
app.use(express.json())


// Routes
app.get('/', (req, res)=> res.send('working'))
app.use('/api/admin', adminRouter)
app.use('/api/event', eventRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;