const express = require('express')
const fs = require('fs')
// const storage = require('../middleware/upload')
const File = require('../models/files')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'asserts/uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname)
    }
})
const photoController = require('../controllers/file.controller')
const upload = multer({ storage })
const router = express.Router()



router.post("/upload", upload.single("file"), photoController.upload);

router.get("/:filename", photoController.getFile);
  

// router.get('/all', photoController.getPhoto)

module.exports = router