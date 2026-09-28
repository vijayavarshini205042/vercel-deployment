const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide note title'],
    trim: true
  },
  id: {
    type: String,
    index: true
  },
  subjectId: {
    type: String,
    index: true
  },
  subjectCode: {
    type: String,
    required: true,
    uppercase: true,
    index: true
  },
  subjectName: {
    type: String,
    required: true
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
  unit: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  fileUrl: {
    type: String,
    required: true
  },
  fileName: {
    type: String,
    required: true
  },
  fileSize: {
    type: String,
    default: '2.5 MB'
  },
  uploadedBy: {
    type: String,
    default: 'Faculty Member'
  },
  uploadedById: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  downloads: {
    type: Number,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

noteSchema.index({ deptCode: 1, regCode: 1, subjectCode: 1, unit: 1 }, { unique: true });
noteSchema.index({ title: 'text', description: 'text', subjectName: 'text' });

module.exports = mongoose.model('Note', noteSchema);
