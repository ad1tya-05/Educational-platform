const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
  title: String,
  subject: String,
  classLevel: String,
  schoolName: String,
  fileUrl: String, // Cloudinary URL
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

// Create a text index for efficient searching
DocumentSchema.index({ subject: 'text', schoolName: 'text', title: 'text' });

module.exports = mongoose.model('Document', DocumentSchema);