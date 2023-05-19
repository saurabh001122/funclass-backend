const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");

const assignment = require("../models/assignment");
const dotenv = require("dotenv");

dotenv.config();
// // Configure Cloudinary

// upload assignment

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads");
//   },
//   filename(req, file, cb) {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const upload = multer({ storage: storage });

// const uploadAssignment = async (req, res) => {
//   console.log(req.body.title, req.body.description);
//   const files = req.files.file;
//   const pName = `${req.params.id}${path.extname(files.name)}`;
//   files.mv(`uploads/${req.params.id}${path.extname(files.name)}`, (err) => {});
//   try {
//     let url = `${req.protocol}://${req.get("host")}/${pName}`;
//     console.log(url);
//     let doc = new assignment({
//       fileUrl: url,
//       title: req.body.title,
//       description: req.body.description,
//     });
//     let savedDoc = await doc.save();
//     res.status(200).json(savedDoc);
//   } catch (err) {
//     res.status(400).json({ status: "FAILURE", msg: err.message });
//   }
// };
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// get documents api

const getDocument = async (req, res) => {
  try {
    const Assignments = await assignment.findById(req.params.id);

    res.status(200).json({ msg: "SUCCESS", data: Assignments });
  } catch (err) {
    res.status(400).json({
      status: "FAILURE",
      msg: err?.meaasge || "internal server error",
    });
  }
};
const getDocuments = async (req, res) => {
  try {
    const Assignments = await assignment.find();

    res.status(200).json({ msg: "SUCCESS", Assignments });
  } catch (err) {
    res.status(400).json({
      status: "FAILURE",
      msg: err?.meaasge || "internal server error",
    });
  }
};

// delete api

const deleteAssignment = async (req, res) => {
  const { id } = req.params;
  try {
    let Assignment = await assignment.find({ _id: id });
    if (Assignment?.length == 0) {
      return res.json({ msg: "documents already deleted" });
    }
    assignment.findByIdAndDelete(id).then(() => {
      res.status(200).json({ msg: "Deleted successfully" });
    });
  } catch (err) {
    res.json({ msg: "No documents found" });
  }
};

router.post("/uploadAssignment", upload.single("file"), async (req, res) => {
  try {
    console.log(req.file);
    let doc = new assignment({
      fileUrl: `http://localhost:4000/${req.file.path}`,
      title: req.body.title,
      description: req.body.description,
    });
    let savedDoc = await doc.save();
    res.status(200).json(savedDoc);
  } catch (err) {
    res.status(400).json({ status: "FAILURE", msg: err.message });
  }
});
router.delete("/deleteAssignment/:id", deleteAssignment);
router.get("/getAssignment", getDocuments);
router.get("/getAssignment/:id", getDocument);

module.exports = router;
