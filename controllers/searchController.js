const Note = require('../models/Note');
const QuestionPaper = require('../models/QuestionPaper');
const JobRole = require('../models/JobRole');
const Project = require('../models/Project');
const Certification = require('../models/Certification');

exports.globalSearch = async (req, res, next) => {
  try {
    const { q, deptCode } = req.query;
    if (!q || q.trim() === '') {
      return res.status(200).json({ success: true, count: 0, data: [] });
    }

    const regex = new RegExp(q, 'i');
    const deptFilter = deptCode ? { deptCode: deptCode.toUpperCase() } : {};

    const [notes, qps, roles, projects, certs] = await Promise.all([
      Note.find({ ...deptFilter, $or: [{ title: regex }, { subjectName: regex }, { description: regex }] }).limit(5),
      QuestionPaper.find({ ...deptFilter, $or: [{ subjectName: regex }, { academicYear: regex }] }).limit(5),
      JobRole.find({ ...deptFilter, $or: [{ title: regex }, { domain: regex }] }).limit(5),
      Project.find({ ...deptFilter, $or: [{ title: regex }, { domain: regex }, { suggestedTech: regex }] }).limit(5),
      Certification.find({ $or: [{ title: regex }, { provider: regex }, { category: regex }] }).limit(5)
    ]);

    const formatted = [
      ...notes.map(n => ({ id: n._id, title: n.title, subtitle: `${n.subjectName} • Sem ${n.semester}`, type: 'Notes', icon: '📚' })),
      ...qps.map(q => ({ id: q._id, title: `${q.subjectName} (${q.academicYear})`, subtitle: `Semester ${q.semester}`, type: 'Question Paper', icon: '📝' })),
      ...roles.map(r => ({ id: r._id, title: r.title, subtitle: r.domain, type: 'Job Role', icon: '💼' })),
      ...projects.map(p => ({ id: p._id, title: p.title, subtitle: `${p.domain} • ${p.difficulty}`, type: 'Project', icon: '💡' })),
      ...certs.map(c => ({ id: c._id, title: c.title, subtitle: c.provider, type: 'Certification', icon: '🏆' }))
    ];

    res.status(200).json({ success: true, count: formatted.length, data: formatted });
  } catch (err) {
    next(err);
  }
};
