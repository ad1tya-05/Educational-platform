// const express = require('express');
// const Document = require('../models/Document');
// const { upload } = require('../config/cloudinary');
// const auth = require('../middleware/auth');
// const checkCache = require('../middleware/cache');
// const client = require('../config/redis'); // Redis Client to save data

// const router = express.Router();

// // 1. Upload PDF (Academy Only)
// router.post('/upload', auth(['academy']), upload.single('file'), async (req, res) => {
//   try {
//     const { title, subject, classLevel, schoolName } = req.body;
    
//     // Cloudinary returns file path in req.file.path
//     const newDoc = new Document({
//       title, subject, classLevel, schoolName,
//       fileUrl: req.file.path,
//       uploadedBy: req.user.id
//     });

//     await newDoc.save();
    
//     // OPTIONAL: Invalidate Cache on new upload so students see fresh data
//     // await client.flushDb(); 
    
//     res.status(201).json(newDoc);
//   } catch (err) {
//     res.status(500).json({ message: 'Upload Failed', error: err.message });
//   }
// });

// // 2. Search PDF (Students Only) + Redis Caching
// // router.get('/documents', auth(['student']), checkCache, async (req, res) => {
// //   try {
// //     const { search } = req.query;
// //     let query = {};

// //     // Build Search Query (regex for partial match)
// //     if (search) {
// //       const regex = new RegExp(search, 'i');
// //       query = { 
// //         $or: [{ subject: regex }, { schoolName: regex }, { classLevel: regex }] 
// //       };
// //     }

// router.get('/documents', auth(['student']), checkCache, async (req, res) => {
//     try {
//       const { subject, classLevel, schoolName } = req.query;
//       let query = {};
  
//       // Exact or Partial match filters
//       if (subject) query.subject = { $regex: subject, $options: 'i' };
//       if (classLevel) query.classLevel = { $regex: classLevel, $options: 'i' };
//       if (schoolName) query.schoolName = { $regex: schoolName, $options: 'i' };
  
//       const docs = await Document.find(query);
  
//       // Update Redis Cache Key to include all filters
//       const key = `search:${JSON.stringify(req.query)}`;
//       await client.setEx(key, 3600, JSON.stringify(docs));
  
//       res.json(docs);
//     } catch (err) {
//       res.status(500).json({ message: 'Search Failed' });
//     }
//   });

   

// module.exports = router;


const express = require('express');
const router = express.Router();
const Document = require('../models/Document');
const auth = require('../middleware/auth');
const cloudinary = require('../config/cloudinary');
const multer = require('multer');

// --- 1. SETUP MEMORY UPLOAD ---
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'academy_pdfs', resource_type: 'raw', // ✅ FIX
        format: 'pdf' },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    uploadStream.end(buffer);
  });
};

// --- 2. UPLOAD ROUTE (Academy Only) ---
router.post('/upload', auth(['academy']), upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    // Upload to Cloudinary
    const result = await uploadToCloudinary(req.file.buffer);

    // Create DB Entry
    const newDoc = new Document({
      title: req.body.title,
      subject: req.body.subject,
      classLevel: req.body.classLevel,
      schoolName: req.body.schoolName,
      fileUrl: result.secure_url,
      uploadedBy: req.user.id
    });

    await newDoc.save();
    res.status(201).json(newDoc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Upload failed' });
  }
});

// --- 3. SEARCH ROUTE (Student Only) ---
// This acts as both "Get All" and "Filter"
router.get('/documents', auth(['student']), async (req, res) => {
  try {
    const { subject, classLevel, schoolName } = req.query;
    
    // Build the query object dynamically
    let query = {};

    // "i" option means case-insensitive (Math = math = MATH)
    if (subject) query.subject = { $regex: subject, $options: 'i' };
    if (classLevel) query.classLevel = { $regex: classLevel, $options: 'i' };
    if (schoolName) query.schoolName = { $regex: schoolName, $options: 'i' };

    console.log("Searching with filters:", query); // Debug log

    const docs = await Document.find(query).sort({ createdAt: -1 });
    res.json(docs);

  } catch (err) {
    console.error("Search Error:", err);
    res.status(500).json({ message: 'Search failed' });
  }
});

module.exports = router;