import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title: {type: String, required: true},
    subTitle: {type: String, required: true},
    description: {type: String, required: true},
    category: {type: String, required: true},
    comingCount: {type: Number},
    date: { type: Date, required: true },
    location: {type: String, required: true},
    image: {type: String, required: true},
    isPublished: {type: Boolean, required: true, default: false},
},{timestamps: true});

const Event = mongoose.model('event', eventSchema);

export default Event;