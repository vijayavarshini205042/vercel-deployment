const express = require('express');
const router = express.Router();
const {
  getRegulations,
  createRegulation,
  updateRegulation,
  deleteRegulation
} = require('../controllers/regulationController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/rbac');

router.get('/', getRegulations);
router.post('/', protect, authorize('admin'), createRegulation);
router.put('/:id', protect, authorize('admin'), updateRegulation);
router.delete('/:id', protect, authorize('admin'), deleteRegulation);

module.exports = router;
