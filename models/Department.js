const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, 'Please provide department short code'],
    unique: true,
    trim: true,
    uppercase: true
  },
  name: {
    type: String,
    required: [true, 'Please provide full department name'],
    trim: true
  },
  icon: {
    type: String,
    default: '🏛️'
  },
  category: {
    type: String,
    enum: [
      'Circuits & Computing',
      'Electrical & Energy',
      'Mechanical & Materials',
      'Infrastructure & Environment',
      'Aerospace & Automotive',
      'Robotics & Automation',
      'Bio & Chemical',
      'Specialized Engineering'
    ],
    default: 'Circuits & Computing'
  },
  description: {
    type: String,
    required: [true, 'Please provide department description']
  },
  coreSkills: [{
    type: String
  }],
  headOfDepartment: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Department', departmentSchema);
