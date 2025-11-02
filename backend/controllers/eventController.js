import fs from 'fs';
import imageKit from '../configs/imageKit.js';
import Event from '../models/Event.js';


export const addEvent = async (req, res) => {
    try {
        const {title, subTitle, description, category, date, location, comingCount, isPublished} = JSON.parse(req.body.event)
        const imageFile = req.file;

        if (!title || !subTitle || !description || !category || !imageFile){
            return res.json({success:false, message:"Missing required fields"})
        }

        const fileBuffer = fs.readFileSync(imageFile.path)


        // Upload image to ImageKit
        const response = await imageKit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/events"
        });

        // Optimize through ImageKit
        const optimizedImageUrl = imageKit.url({
           path: response.filePath,
           transformation: [{
               width: 1280,
               quality: "auto",
               format: "webp"
           }]
        }); 

        const image = optimizedImageUrl;

        await Event.create({
            title,
            subTitle,
            description,
            category,
            location,
            comingCount: 0,
            date:  new Date(date),
            image,
            isPublished
        });

        res.json({success: true, message: "Event added successfully"});


    } catch (error) {
        res.json({success: false, message: error.message});

    }
}

export const incrementComing = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    event.comingCount = (event.comingCount || 0) + 1;
    await event.save();

    res.json({ success: true, message: "Count updated successfully", comingCount: event.comingCount });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find({isPublished: true})
        res.json({success: true, events});
    }catch (error) {
        res.json({success: false, message: error.message});

    }
}

export const getEventById = async (req, res) => {
    try {
        const { eventId } = req.params;
        const event = await Event.findById(eventId);
        if(!event){
            return res.json({success: false, message: "Event not found"});
        }
        res.json({success: true, event});
    }catch (error) {
        res.json({success: false, message: error.message});
    }
}

export const deleteEventById = async (req, res) => {
    try {
        const {id} = req.body;
        await Event.findByIdAndDelete(id);



        res.json({success: true, message: "Event deleted successfully"});
    }catch (error) {
        res.json({success: false, message: error.message});
    }
}

export const togglePublished = async (req, res) => {
    try {
        const {id} = req.body;
        const event = await Event.findById(id);
        if (!event) {
            return res.json({success: false, message: "event not found"});
        }
        event.isPublished = !event.isPublished;
        await event.save();
        res.json({success: true, message: "Status updated successfully"});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}
