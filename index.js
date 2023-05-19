// importing modules

// import mongoose from "mongoose";
const mongoose = require("mongoose");
// import dotenv from "dotenv";
const dotenv = require("dotenv");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
// import fileUpload from "express-fileupload";
const fileUpload = require("express-fileupload");
const express = require("express");

const mongoConnection = require("./src/utils/connection");

const zoomRouter = require("./src/routes/zoomRouter.js");
const userRoutes = require("./src/routes/userRoutes.js");

const teacherRoutes = require("./src/routes/teacherRoutes.js");
const courseMaterialRoutes = require("./src/routes/courseMaterialRoute");
const courseMaterialAudioRoutes = require("./src/routes/courseMaterialAudio");
const cookieParser = require("cookie-parser");
const assignment = require("./src/routes/assignments.js");
const app = express();

// const PORT = process.env.port || 5000;
// const PORT = 5000;

// middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.static("public"));
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use(express.json());
// in middleware;
app.listen(4000, () => {
  console.log("listening to port");
});

//body parser
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// for ejs
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use("/uploads", express.static(path.join(__dirname, "/courseMaterials")));

// routes
// app.use("/api/user/", userRoutes);
app.use("/zoomapi", zoomRouter);

app.use("/api/courseMaterials/audio", courseMaterialAudioRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/courseMaterials/files", courseMaterialRoutes);
app.use("/upload", assignment);
mongoConnection();
