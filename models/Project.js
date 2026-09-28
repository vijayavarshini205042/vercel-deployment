const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide project title'],
    trim: true
  },
  id: {
    type: String,
    index: true
  },
  deptCode: {
    type: String,
    required: true,
    uppercase: true,
    index: true
  },
  domain: {
    type: String,
    default: 'Engineering'
  },
  categoryTag: {
    type: String,
    default: 'Industry-inspired'
  },
  difficulty: {
    type: String,
    default: 'Intermediate'
  },
  projectType: {
    type: String,
    default: 'Mini Project'
  },
  description: {
    type: String,
    default: ''
  },
  architecture: {
    type: String,
    default: ''
  },
  instructions: {
    type: String,
    default: ''
  },
  problemStatement: {
    type: String,
    default: ''
  },
  objective: {
    type: String,
    default: ''
  },
  features: [{
    type: String
  }],
  suggestedTech: [{
    type: String
  }],
  technologies: [{
    type: String
  }],
  expectedOutcome: {
    type: String,
    default: ''
  },
  skillsLearned: [{
    type: String
  }],
  futureEnhancement: {
    type: String
  },
  relatedJobRoles: [{
    type: String
  }],
  relatedCertifications: [{
    type: String
  }],
  addedBy: {
    type: String,
    default: 'Faculty Project Committee'
  }
}, {
  timestamps: true
});

projectSchema.index({ title: 1, deptCode: 1 }, { unique: true });
projectSchema.index({ deptCode: 1, difficulty: 1, projectType: 1 });
projectSchema.index({ title: 'text', problemStatement: 'text', suggestedTech: 'text' });

module.exports = mongoose.model('Project', projectSchema);
