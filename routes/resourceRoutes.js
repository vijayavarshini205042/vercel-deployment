const express = require('express');
const router = express.Router();
const {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  downloadNote,
  getQuestionPapers,
  createQuestionPaper,
  updateQuestionPaper,
  deleteQuestionPaper
} = require('../controllers/resourceController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/rbac');
const upload = require('../middleware/upload');

// Lecture Notes routes
router.get('/notes', getNotes);
router.post('/notes', protect, authorize('faculty', 'admin'), upload.single('file'), createNote);
router.put('/notes/:id', protect, authorize('faculty', 'admin'), updateNote);
router.delete('/notes/:id', protect, authorize('faculty', 'admin'), deleteNote);
router.get('/notes/:id/download', downloadNote);

// Question Papers routes
router.get('/question-papers', getQuestionPapers);
router.post('/question-papers', protect, authorize('faculty', 'admin'), upload.single('file'), createQuestionPaper);
router.put('/question-papers/:id', protect, authorize('faculty', 'admin'), upload.single('file'), updateQuestionPaper);
router.delete('/question-papers/:id', protect, authorize('faculty', 'admin'), deleteQuestionPaper);

module.exports = router;
