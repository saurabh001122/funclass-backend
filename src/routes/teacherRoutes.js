const multer = require("multer");

const Teacher = require("../models/teacherBasicSettingModel");
const express = require("express");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.post("/basicDetails/:id", upload.single("photo"), async (req, res) => {
  let { id } = req.params;

  console.log(id);
  const { gender, userId, subject, classes, about, profilePic, number } =
    req.body;

  try {
    const teacher = new Teacher({
      gender,
      subject,
      userId: id,
      classes,
      about,
      profilePic: `http://localhost:4000/${req?.file?.path}`,
      number,
    });
    const saveTeacher = await teacher.save();
    res.status(200).json({ saveTeacher });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});
router.get("/basicDetails/:id", async (req, res) => {
  let { id } = req.params;

  try {
    const user = await Teacher.findById(req.params.id).populate("userId");
    res.status(400).json({ msg: user });
  } catch (err) {
    res.status(400).json({ msg: "Internal server error" });
  }
});

module.exports = router;
