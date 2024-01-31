const express = require('express');
const router = express.Router();
const {createPost, getPosts} = require('../controllers/postController');
const upload = require('../helpers/multer');
const Authorization = require('../middlewares/authorization')

router.post('/post', upload.single("image"), Authorization, createPost )
router.get('/posts', getPosts )

module.exports = router;