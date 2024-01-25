// src/controllers/eventController.js
const Event = require("../models/Event");
// const cloudinary = require("cloudinary").v2;

// cloudinary.config({
//   cloud_name: "dxizw3qvz",
//   api_key: "898793366379354",
//   api_secret: "ewjeVapcJ5I7pp66HKjOZ7iLLZw",
// });

const createEvent = async (req, res) => {
  try {
    const {
      aboutCompany,
      companyName,
      description,
      image,
      joiningLink,
      other,
      selectedFeatures,
      selectedFieldOfStudy,
      selectedSemesters,
      startDate,
      time,
      title,
      createdAt,
    } = req.body;
    // const file = req.files.image;
    const event = new Event({
      aboutCompany,
      companyName,
      description,
      image,
      joiningLink,
      other,
      selectedFeatures,
      selectedFieldOfStudy,
      selectedSemesters,
      startDate,
      time,
      title,
      createdAt,
    });
    await event.save();
    res
      .status(201)
      .json({ message: "Event created successfully", event: event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });

    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getEventById = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteEventById = async (req, res) => {
  try {
    const eventId = req.params.eventId;

    // Find the event by ID
    const event = await Event.findById(eventId);

    // Check if the event exists
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Delete the event from the database
    await event.deleteOne();

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { createEvent, getEvents, getEventById ,deleteEventById};
