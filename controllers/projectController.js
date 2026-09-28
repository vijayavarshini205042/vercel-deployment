const Project = require('../models/Project');

exports.getProjects = async (req, res, next) => {
  try {
    const { deptCode, difficulty, projectType, categoryTag, search } = req.query;
    const query = {};

    if (deptCode) query.deptCode = deptCode.toUpperCase();
    if (difficulty && difficulty !== 'All') query.difficulty = difficulty;
    if (projectType && projectType !== 'All') query.projectType = projectType;
    if (categoryTag && categoryTag !== 'All') query.categoryTag = categoryTag;
    if (search) {
      query.$text = { $search: search };
    }

    const projects = await Project.find(query).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: projects.length, data: projects });
  } catch (err) {
    next(err);
  }
};

exports.getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    res.status(200).json({ success: true, data: project });
  } catch (err) {
    next(err);
  }
};

exports.createProject = async (req, res, next) => {
  try {
    const project = await Project.create({
      ...req.body,
      addedBy: req.user ? req.user.name : 'Faculty Project Committee'
    });
    res.status(201).json({ success: true, data: project });
  } catch (err) {
    next(err);
  }
};

exports.deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    res.status(200).json({ success: true, message: 'Project blueprint deleted' });
  } catch (err) {
    next(err);
  }
};
