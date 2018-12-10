const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'tmp/',
limits:{ fileSize: 2400000 },
fileFilter: (req, file, cb) => {
  if (file.mimetype !== 'image/png') {
   return cb(null, false, null);
  }
  cb(null, true);
 }
});



const fs = require('fs');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/monupload', upload.single('monfichier'), function (req, res, next) {
  fs.rename(req.file.path, 'public/images/' + req.file.originalname, function (error) {
    if(req.fileValidationError) 
      res.status(500).json(req.fileValidationError);
    else 
      res.status(200).json({ answer: "ajouté avec succès !" });
  });
})

module.exports = router;
