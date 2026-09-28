const Certification = require('../models/Certification');

exports.getCertifications = async (req, res, next) => {
  try {
    const { category, level, deptCode } = req.query;
    const query = {};

    if (category && category !== 'All') query.category = category;
    if (level && level !== 'All') query.level = level;
    if (deptCode) query.targetDepts = deptCode.toUpperCase();

    const certs = await Certification.find(query);
    res.status(200).json({ success: true, count: certs.length, data: certs });
  } catch (err) {
    next(err);
  }
};

exports.createCertification = async (req, res, next) => {
  try {
    const cert = await Certification.create(req.body);
    res.status(201).json({ success: true, data: cert });
  } catch (err) {
    next(err);
  }
};

exports.deleteCertification = async (req, res, next) => {
  try {
    const cert = await Certification.findByIdAndDelete(req.params.id);
    if (!cert) return res.status(404).json({ success: false, message: 'Certification not found' });
    res.status(200).json({ success: true, message: 'Certification deleted' });
  } catch (err) {
    next(err);
  }
};
