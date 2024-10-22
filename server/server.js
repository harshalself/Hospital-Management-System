const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

// Initialize app
const app = express();
app.use(cors());
app.use(bodyParser.json()); // To parse JSON bodies

// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/hospital-management")
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("Error connecting to MongoDB:", error));

// Define Schema
const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  contact: { type: String, required: true },
  medicalHistory: String,
  assignedDoctor: { type: String, required: true },
});

// Create Model
const Patient = mongoose.model("Patient", patientSchema);

// Handle patient registration
app.post("/api/patients", async (req, res) => {
  const { name, age, gender, contact, medicalHistory, assignedDoctor } =
    req.body;

  const newPatient = new Patient({
    name,
    age,
    gender,
    contact,
    medicalHistory,
    assignedDoctor,
  });

  try {
    await newPatient.save();
    res
      .status(200)
      .json({ message: "Patient information submitted successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to save patient information", error });
  }
});

// Handle fetching all patients
app.get("/api/patients", async (req, res) => {
  try {
    const patients = await Patient.find({});
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch patients", error });
  }
});

// Handle fetching patient details by name
app.get("/api/patients/:name", async (req, res) => {
  try {
    const patient = await Patient.findOne({ name: req.params.name });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch patient details", error });
  }
});

// Start server
app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
