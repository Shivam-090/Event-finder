import jwt from 'jsonwebtoken'
import Event from '../models/Event.js';

export const adminLogin = async (req, res) => {
    try{
        const { email, password } = req.body;

        if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
            return res.json({success: false, message: "Invalid Credentials"})
        }

        const token = jwt.sign({email}, process.env.JWT_SECRET)
        res.json({success: true, token})


    } catch(error) {
        res.json({success: false, message: error.message})

    }
}

export const getAllEventsAdmin = async (req, res) => {
    try {
        const event = await Event.find({}).sort({createdAt: -1});
        res.json({success: true, event});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}


export const getDasboard = async (req, res) => {
    try {
        const recentEvents = await Event.find({}).sort({createdAt: -1}).limit(5);
        const events = await Event.countDocuments();
        const drafts = await Event.countDocuments({isPublished: false});

        const dashboardData = {
            events,
            drafts,
            recentEvents
        };  
        res.json({success: true, dashboardData});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

