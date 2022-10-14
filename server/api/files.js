const express = require('express');
const multer = require('multer');
const crypto = require('crypto')
const path = require('path')

const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../files'))
    },
    filename: function (req, file, cb) {
      crypto.pseudoRandomBytes(16, function (err, raw) {
        cb(null, raw.toString('hex') + Date.now() + path.extname(file.originalname));
      });
    }
  });

const upload = multer({
  dest: './files',
  storage: storage
});

router.get("/:id", (req, res) => {
    console.log(path.resolve(__dirname, "../files") + '/' + req.params.id)
    res.sendFile(path.resolve(__dirname, "../files") + '/' + req.params.id, (err) => {
        if (err) res.status(404).end()
    })
})


router.post("/", upload.single("image"), (req, res, next) => {
    res.json({filename: '/api/files/' + req.file.filename})
});

module.exports = router