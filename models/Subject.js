const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, 'Please provide subject code (e.g. IT8701)'],
    trim: true,
    uppercase: true
  },
  name: {
    type: String,
    required: [true, 'Please provide subject name'],
    trim: true
  },
  deptCode: {
    type: String,
    required: true,
    uppercase: true,
    index: true
  },
  regCode: {
    type: String,
    required: true,
    uppercase: true,
    index: true
  },
  semester: {
    type: Number,
    required: true,
    min: 1,
    max: 8,
    index: true
  },
  credits: {
    type: Number,
    default: 3
  },
  id: {
    type: String,
    index: true
  },
  category: {
    type: String
  },
  categoryName: {
    type: String
  },
  yearNumber: {
    type: Number
  },
  year: {
    type: String
  },
  academicYear: {
    type: String
  },
  ltp: {
    type: String
  },
  syllabusOutline: [{
    unitNumber: Number,
    unitTitle: String,
    topics: String
  }]
}, {
  timestamps: true
});

subjectSchema.index({ code: 1, regCode: 1, deptCode: 1 }, { unique: true });

module.exports = mongoose.model('Subject', subjectSchema);
