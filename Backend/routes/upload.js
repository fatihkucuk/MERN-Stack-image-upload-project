const router = require('express').Router();
const { Upload } = require('../models/Upload');
const mongoose = require('mongoose');
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

router.post('/', upload.single('image'), (req, res, next) => {
  const data = new Upload({
    _id: new mongoose.Types.ObjectId(),
    name: 'test',
  });

  data
    .save()
    .then((result) => res.status(201).send('Created!'))
    .catch((err) => res.status(400).send(err));
});

module.exports = router;
