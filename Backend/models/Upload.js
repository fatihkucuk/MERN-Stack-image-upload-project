const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports.Upload = mongoose.model('Upload', uploadSchema);
