// src/routes/eventRoutes.js
const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");

// Create a new event
router.post("/create", eventController.createEvent);

// Get all events
router.get("/", eventController.getEvents);

// Get event details by event ID
router.get("/:eventId", eventController.getEventById);

// Delete event by ID
router.delete("/:eventId", eventController.deleteEventById);

module.exports = router;
