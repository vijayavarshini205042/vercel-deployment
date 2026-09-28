const express = require('express');
const router = express.Router();
const {
  getCertifications,
  createCertification,
  deleteCertification
} = require('../controllers/certificationController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/rbac');

router.get('/', getCertifications);
router.post('/', protect, authorize('admin'), createCertification);
router.delete('/:id', protect, authorize('admin'), deleteCertification);

module.exports = router;
