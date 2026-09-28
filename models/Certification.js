const mongoose = require('mongoose');

const certificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide certification title'],
    trim: true
  },
  provider: {
    type: String,
    required: [true, 'Please provide issuing provider (e.g. AWS, Cisco)'],
    trim: true
  },
  id: {
    type: String,
    index: true
  },
  url: {
    type: String
  },
  details: {
    type: String
  },
  category: {
    type: String,
    default: 'Engineering-specific'
  },
  level: {
    type: String,
    default: 'Intermediate'
  },
  officialUrl: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    required: true
  },
  examFormat: {
    type: String,
    default: 'Multiple Choice / Performance Exam'
  },
  prepResources: [{
    type: String
  }],
  relatedRoles: [{
    type: String
  }],
  targetDepts: [{
    type: String
  }]
}, {
  timestamps: true
});

certificationSchema.index({ title: 1, provider: 1 }, { unique: true });
certificationSchema.index({ category: 1, level: 1 });
certificationSchema.index({ title: 'text', provider: 'text' });

module.exports = mongoose.model('Certification', certificationSchema);
