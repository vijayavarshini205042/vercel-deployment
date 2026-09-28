const mongoose = require('mongoose');

const regulationSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, 'Please provide regulation code (e.g. R2021)'],
    unique: true,
    trim: true,
    uppercase: true
  },
  name: {
    type: String,
    required: [true, 'Please provide regulation name'],
    trim: true
  },
  year: {
    type: Number,
    required: [true, 'Please provide curriculum introduction year']
  },
  status: {
    type: String,
    enum: ['Active', 'Upcoming', 'Archived'],
    default: 'Active'
  },
  isDefault: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Regulation', regulationSchema);
