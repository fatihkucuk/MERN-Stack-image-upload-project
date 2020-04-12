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
    path: `https://nodejs-image-upload.herokuapp.com/api/v1/${req.file.path}`,
  });
  try {
    const savedData = await data.save();
    return res.status(201).json(savedData);
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const data = await Upload.find().select('_id path').exec();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;
