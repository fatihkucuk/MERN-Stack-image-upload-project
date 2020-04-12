const router = require('express').Router();
const { Upload } = require('../models/Upload');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploaded-images/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now().toString()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

router.post('/', upload.single('image'), async (req, res, next) => {
  console.log(req.file);
  const data = new Upload({
    path: req.file.path,
  });
  try {
    const savedData = await data.save();
    res.status(201).json(savedData);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
