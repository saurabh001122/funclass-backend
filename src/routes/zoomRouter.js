const express = require("express");
const router = express.Router();
const requestPromise = require("request-promise");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Class = require("../models/class");

var bodyParser = require("body-parser");

var app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
const payload = {
  iss: process.env.API_KEY, //your API KEY
  exp: new Date().getTime() + 5000,
};

console.log(process.env.API_SECRET);
const token = jwt.sign(payload, process.env.API_SECRET); //your API SECRET HERE

// Update a Class identified by the ClassId in the request
router.put("/updateClass/:classId", (req, res) => {
  // Validate Request
  if (!req.body.content) {
    return res.status(400).send({
      message: "Class content can not be empty",
    });
  }
  // Find Class and update it with the request body
  Class.findByIdAndUpdate(
    req.params.classId,
    {
      className: req.body.className || "Untitled class",
      startTime: req.body.startTime,
      endTime: req.body.endTime,
    },
    { new: true }
  )
    .then((classDetail) => {
      if (!classDetail) {
        return res.status(404).send({
          message: "Class not found with id " + req.params.classId,
        });
      }
      res.send(classDetail);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Class not found with id " + req.params.classId,
        });
      }
      return res.status(500).send({
        message: "Error updating Class with id " + req.params.classId,
      });
    });
});

// Delete a class with the specified uuid in the reques
router.delete("/delete/:classId", (req, res) => {
  Class.findByIdAndRemove(req.params.classId)
    .then((classDetail) => {
      if (!classDetail) {
        return res.status(404).send({
          message: "Class not found with id " + req.params.classId,
        });
      }
      res.send({ message: "Class deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Class not found with id defined here" + req.params.classId,
        });
      }
      return res.status(500).send({
        message: "Could not delete Class with id " + req.params.classId,
      });
    });
});

//zoom getting
router.get("/api", (req, res) => {
  return res.render("createMeeting");
});

// Retrieve and return all class from the database.
router.get("/findAll", (req, res) => {
  Class.find()
    .then((classDetail) => {
      res.send(classDetail);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving class.",
      });
    });
});

//zoom posting

router.post("/postMeeting", (req, res) => {
  if (!req.body.className || !req.body.startTime || !req.body.endTime) {
    return res.status(400).json({ msg: "All fields are requiredd" });
  }
  email = "meghasahu2023@gmail.com"; // your zoom developer email account
  var options = {
    method: "POST",
    uri: "https://api.zoom.us/v2/users/" + email + "/meetings",
    body: {
      topic: "Zoom Meeting Using Node JS", //meeting title
      type: 1,
      settings: {
        host_video: "true",
        participant_video: "true",
      },
    },
    auth: {
      bearer: token,
    },
    headers: {
      "User-Agent": "Zoom-api-Jwt-Request",
      "content-type": "application/json",
    },
    json: true, //Parse the JSON string in the response
  };

  requestPromise(options)
    .then(function (response) {
      console.log("response is: ", response);
      var obj = {
        className: req.body.className,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        uuid: response["uuid"],
        host_id: response["host_id"],
        url: response["join_url"],
        host_email: response["host_email"],
        password: response["password"],
      };
      console.log(obj["className"]);
      const classDetail = Class.create({
        className: obj["className"],
        startTime: obj["startTime"],
        endTime: obj["endTime"],
        uuid: obj["uuid"],
        url: obj["url"],
        host_email: obj["host_email"],
        host_id: obj["host_id"],
        password: obj["password"],
      });
      if (classDetail) {
        console.log("data saved");
      } else {
        console.log("error in saving data");
      }
      res.send(JSON.stringify(obj));
      // res.send(JSON.stringify(respnse));
    })
    .catch(function (err) {
      // API call failed...
      console.log("API call failed, reason ", err);
    });
});

router.get("/createMeeting", (req, res) => {
  email = "meghasahu2023@gmail.com"; // your zoom developer email account
  var options = {
    method: "POST",
    uri: "https://api.zoom.us/v2/users/" + email + "/meetings",
    body: {
      topic: "Zoom Meeting Using Node JS", //meeting title
      type: 1,
      settings: {
        host_video: "true",
        participant_video: "true",
      },
    },
    auth: {
      bearer: token,
    },
    headers: {
      "User-Agent": "Zoom-api-Jwt-Request",
      "content-type": "application/json",
    },
    json: true, //Parse the JSON string in the response
  };

  requestPromise(options)
    .then(function (response) {
      console.log("response is: ", response);
      res.send(JSON.stringify(response));
    })
    .catch(function (err) {
      // API call failed...
      console.log("API call failed, reason ", err);
    });
});

module.exports = router;
