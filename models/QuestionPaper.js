const mongoose = require('mongoose');

const questionPaperSchema = new mongoose.Schema({
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
  title: {
    type: String
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
  academicYear: {
    type: String,
    required: [true, 'Please provide academic year (e.g. Nov/Dec 2024)'],
    trim: true
  },
  examType: {
    type: String,
    default: 'End-Semester University Exam'
  },
  fileUrl: {
    type: String,
    required: true
  },
  fileName: {
    type: String,
    required: true
  },
  answerKeyUrl: {
    type: String
  },
  fileSize: {
    type: String,
    default: '1.2 MB'
  },
  downloads: {
    type: Number,
    default: 0
  },
  uploadedBy: {
    type: String,
    default: 'Examination Cell'
  }
}, {
  timestamps: true
});

questionPaperSchema.index({ deptCode: 1, regCode: 1, subjectCode: 1, academicYear: 1, title: 1 }, { unique: true });
questionPaperSchema.index({ subjectName: 'text', subjectCode: 'text' });

module.exports = mongoose.model('QuestionPaper', questionPaperSchema);
