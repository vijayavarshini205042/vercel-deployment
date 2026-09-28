const express = require('express');
const router = express.Router();
const {
  getJobRoles,
  createJobRole,
  deleteJobRole,
  getRoadmaps,
  getRoadmapById,
  createRoadmap
} = require('../controllers/careerController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/rbac');

// Job Roles
router.get('/roles', getJobRoles);
router.post('/roles', protect, authorize('admin'), createJobRole);
router.delete('/roles/:id', protect, authorize('admin'), deleteJobRole);

// Roadmaps
router.get('/roadmaps', getRoadmaps);
router.get('/roadmaps/:id', getRoadmapById);
router.post('/roadmaps', protect, authorize('admin'), createRoadmap);

module.exports = router;
