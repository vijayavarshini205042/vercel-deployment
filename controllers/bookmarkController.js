const Bookmark = require('../models/Bookmark');

exports.getBookmarks = async (req, res, next) => {
  try {
    const bookmarks = await Bookmark.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: bookmarks.length, data: bookmarks });
  } catch (err) {
    next(err);
  }
};

exports.toggleBookmark = async (req, res, next) => {
  try {
    const { resourceId, title, type, category, deptCode, regCode } = req.body;

    const existing = await Bookmark.findOne({ userId: req.user._id, resourceId });
    if (existing) {
      await Bookmark.findByIdAndDelete(existing._id);
      return res.status(200).json({ success: true, bookmarked: false, message: 'Bookmark removed' });
    }

    const bookmark = await Bookmark.create({
      userId: req.user._id,
      resourceId,
      title,
      type,
      category,
      deptCode,
      regCode
    });

    res.status(201).json({ success: true, bookmarked: true, data: bookmark });
  } catch (err) {
    next(err);
  }
};

exports.removeBookmark = async (req, res, next) => {
  try {
    await Bookmark.findOneAndDelete({ userId: req.user._id, resourceId: req.params.id });
    res.status(200).json({ success: true, message: 'Bookmark removed' });
  } catch (err) {
    next(err);
  }
};
