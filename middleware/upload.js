const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload destination directories exist
const notesDir = path.join(__dirname, '..', 'uploads', 'notes');
const qpDir = path.join(__dirname, '..', 'uploads', 'question-papers');

if (!fs.existsSync(notesDir)) {
  fs.mkdirSync(notesDir, { recursive: true });
}
if (!fs.existsSync(qpDir)) {
  fs.mkdirSync(qpDir, { recursive: true });
}

// Storage configuration with sanitized filenames and collision avoidance
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isQP = (req.originalUrl && req.originalUrl.includes('question-paper')) || 
                 (req.path && req.path.includes('question-paper')) || 
                 (req.baseUrl && req.baseUrl.includes('question-paper')) || 
                 (req.body && req.body.resourceType === 'qp');
    cb(null, isQP ? qpDir : notesDir);
  },
  filename: function (req, file, cb) {
    // Sanitize original file name: remove non-alphanumeric chars except dots and dashes
    const cleanName = path.basename(file.originalname, path.extname(file.originalname))
      .replace(/[^a-zA-Z0-9_-]/g, '_');
    const ext = path.extname(file.originalname).toLowerCase();
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    cb(null, `${cleanName}-${uniqueSuffix}${ext}`);
  }
});

// File validation filter: Only PDF, DOCX, and ZIP archives permitted
const fileFilter = (req, file, cb) => {
  const allowedExtensions = ['.pdf', '.docx', '.zip'];
  const allowedMimeTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/zip',
    'application/x-zip-compressed'
  ];

  const ext = path.extname(file.originalname).toLowerCase();
  const mime = file.mimetype;

  if (allowedExtensions.includes(ext) && allowedMimeTypes.includes(mime)) {
    cb(null, true);
  } else {
    cb(new Error(`Invalid file type (${ext}). Only secure PDF, DOCX, and ZIP documents are accepted.`), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB limit
  },
  fileFilter: fileFilter
});

module.exports = upload;
