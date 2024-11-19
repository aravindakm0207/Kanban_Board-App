
/*cloudinary

const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../../cloudinaryConfig');

// Set up Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', // Replace 'uploads' with your desired Cloudinary folder
    format: async (req, file) => 'jpg', // Specify format (optional)
    public_id: (req, file) => `${Date.now()}-${file.originalname.split('.')[0]}`, // Unique public ID
  },
});

// File filter to accept only images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images are allowed.'), false);
  }
};

// Set up Multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit size to 5MB
});

module.exports = upload;
*/

const path = require('path');
const multer = require('multer');

// Set up storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../uploads')); // Adjusted to point to root uploads folder
    },
    filename: function (req, file, cb) {
        cb(null, ${Date.now()}-${file.originalname});
    }
});

// File filter to accept only images
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only images are allowed.'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // Limit size to 5MB
});

module.exports = upload;