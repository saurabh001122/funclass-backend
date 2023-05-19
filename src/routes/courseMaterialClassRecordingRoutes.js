const express = require("express");
const router = express.Router();
const multer = require("multer");

UploadCourseMaterialRecording;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "classMaterials/");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },

  fileFilter: function (req, file, cb) {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PPT,PDF,WORLD files are allowed"));
    }
  },
});

const upload = multer({ storage: storage });

router.post(
  "/uploadMaterial",
  upload.single("material"),
  UploadCourseMaterialRecording
);

module.exports = router;
