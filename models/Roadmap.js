const mongoose = require('mongoose');

const stageSchema = new mongoose.Schema({
  stageNumber: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  skillLevel: {
    type: String,
    default: 'Beginner'
  },
  description: {
    type: String,
    required: true
  },
  keyTopics: [{
    type: String
  }],
  recommendedResources: [{
    type: String
  }],
  practiceProject: {
    type: String,
    default: ''
  },
  interviewTopics: [{
    type: String
  }]
}, { _id: false });

const roadmapSchema = new mongoose.Schema({
  roadmapId: {
    type: String,
    required: true,
    unique: true
  },
  id: {
    type: String
  },
  description: {
    type: String,
    default: ''
  },
  roleTitle: {
    type: String,
    required: true
  },
  deptCode: {
    type: String,
    required: true,
    uppercase: true,
    index: true
  },
  targetCareer: {
    type: String,
    required: true
  },
  estimatedDuration: {
    type: String,
    default: '6 to 9 Months'
  },
  stages: [stageSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Roadmap', roadmapSchema);
