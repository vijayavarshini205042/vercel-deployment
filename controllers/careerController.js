const JobRole = require('../models/JobRole');
const Roadmap = require('../models/Roadmap');

// --- JOB ROLES ---

exports.getJobRoles = async (req, res, next) => {
  try {
    const { deptCode, domain } = req.query;
    const query = {};
    if (deptCode) query.deptCode = deptCode.toUpperCase();
    if (domain) query.domain = domain;

    const roles = await JobRole.find(query);
    res.status(200).json({ success: true, count: roles.length, data: roles });
  } catch (err) {
    next(err);
  }
};

exports.createJobRole = async (req, res, next) => {
  try {
    const role = await JobRole.create(req.body);
    res.status(201).json({ success: true, data: role });
  } catch (err) {
    next(err);
  }
};

exports.deleteJobRole = async (req, res, next) => {
  try {
    const role = await JobRole.findByIdAndDelete(req.params.id);
    if (!role) return res.status(404).json({ success: false, message: 'Role not found' });
    res.status(200).json({ success: true, message: 'Job role removed' });
  } catch (err) {
    next(err);
  }
};

// --- ROADMAPS ---

exports.getRoadmaps = async (req, res, next) => {
  try {
    const { deptCode } = req.query;
    const query = {};
    if (deptCode) query.deptCode = deptCode.toUpperCase();

    const roadmaps = await Roadmap.find(query);
    res.status(200).json({ success: true, count: roadmaps.length, data: roadmaps });
  } catch (err) {
    next(err);
  }
};

exports.getRoadmapById = async (req, res, next) => {
  try {
    const roadmap = await Roadmap.findOne({ roadmapId: req.params.id });
    if (!roadmap) {
      return res.status(404).json({ success: false, message: 'Roadmap not found' });
    }
    res.status(200).json({ success: true, data: roadmap });
  } catch (err) {
    next(err);
  }
};

exports.createRoadmap = async (req, res, next) => {
  try {
    const roadmap = await Roadmap.create(req.body);
    res.status(201).json({ success: true, data: roadmap });
  } catch (err) {
    next(err);
  }
};
