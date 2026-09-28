const mongoose = require('mongoose');

const jobRoleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide job role title'],
    trim: true
  },
  deptCode: {
    type: String,
    required: true,
    uppercase: true,
    index: true
  },
  domain: {
    type: String,
    required: true
  },
  avgSalaryRange: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  coreSkills: [{
    type: String,
    required: true
  }],
  secondarySkills: [{
    type: String
  }],
  roadmapId: {
    type: String,
    default: ''
  },
  id: {
    type: String,
    index: true
  },
  skills: [{
    type: String
  }],
  tools: [{
    type: String
  }],
  companies: [{
    type: String
  }],
  avgSalary: {
    type: String
  },
  demandLevel: {
    type: String,
    default: 'High'
  }
}, {
  timestamps: true
});

jobRoleSchema.index({ title: 1, deptCode: 1 }, { unique: true });
jobRoleSchema.index({ deptCode: 1, domain: 1 });
jobRoleSchema.index({ title: 'text', description: 'text', coreSkills: 'text' });

module.exports = mongoose.model('JobRole', jobRoleSchema);
