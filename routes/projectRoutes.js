const express = require('express');
const router = express.Router();
const {
  getProjects,
  getProjectById,
  createProject,
  deleteProject
} = require('../controllers/projectController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/rbac');

router.get('/', getProjects);
router.get('/:id', getProjectById);
router.post('/', protect, authorize('admin'), createProject);
router.delete('/:id', protect, authorize('admin'), deleteProject);

module.exports = router;
