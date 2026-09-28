const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  resourceId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Lecture Notes', 'Question Paper', 'Project Idea', 'Project Blueprint', 'Career Role', 'Certification', 'resource'],
    default: 'resource'
  },
  category: {
    type: String,
    default: 'Notes'
  },
  deptCode: {
    type: String,
    default: 'IT'
  },
  regCode: {
    type: String,
    default: 'R2021'
  }
}, {
  timestamps: true
});

bookmarkSchema.index({ userId: 1, resourceId: 1 }, { unique: true });

module.exports = mongoose.model('Bookmark', bookmarkSchema);
