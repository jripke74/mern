const multer = require('multer');
const { v1: uuid } = require('uuid');

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpeg': 'jpg',
};

const fileUpload = multer({
  limit: 5000000,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cd(null, 'uploads/images');
    },
    filename: (req, file, cb) => {
      const ext = MIME_TYPE_MAP[file.mimetype];
      cd(null, uuid() + '.' + ext);
    },
    fileFilter: (req, file, cb) => {
      const isValid = !!MIME_TYPE_MAP[file.mimetype];
      let error = isValid ? null : new Error('Invalid mime type!');
      cb(error, isValid);
    },
  }),
});

module.exports = fileUpload;
