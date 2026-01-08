// const cloudinary = require('cloudinary').v2;
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const multer = require('multer');

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
//   secure: true,
// });

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     // folder: 'academy_pdfs', // Folder name in Cloudinary
//     // allowed_formats: ['pdf'],
//     // resource_type: 'auto',

//     folder: 'academy_pdfs',
//     resource_type: 'raw', // 🔴 FIX: must be raw for PDFs
//     format: async (req, file) => 'pdf', // optional but safe
//     public_id: (req, file) => `${Date.now()}-${file.originalname}`,
    
//   },
// });

// const upload = multer({ storage: storage ,
//     limits: { fileSize: 10 * 1024 * 1024 }
// });
// module.exports = { upload };

// server/config/cloudinary.js
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

module.exports = cloudinary;