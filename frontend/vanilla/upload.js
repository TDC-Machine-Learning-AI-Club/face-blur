const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, '../api/images/input/');
    },
    filename: (req, file, cb) => {
        let file_name = Date.now() + '-' + file.originalname
      cb(null, file_name);
      //ProcessImage(file_name);
    }
    
  });
  
  // Create the multer instance
  const upload = multer({ storage: storage });
  
  module.exports = upload;