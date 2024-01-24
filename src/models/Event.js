// src/models/Event.js
const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  aboutCompany: { type: String, required: false },
  companyName: { type: String, required: false },
  description: { type: String, required: false },
  image: { type: String },
  joiningLink: { type: String },
  other: { type: String },
  selectedFeatures: [{ type: String }],
  selectedFieldOfStudy: [{ type: String }],
  selectedSemesters: [{ type: String }],
  startDate: { type: String, required: false },
  time: { type: String, required: false },
  title: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
