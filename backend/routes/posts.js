const express = require('express');

const checkAuth = require('../middleware/check-auth');
const extractFile = require('../middleware/file');

const PostController = require('../controllers/post');

const router = express.Router();



router.post('', checkAuth, extractFile, PostController.createPost);

router.put('/:id', checkAuth, extractFile, PostController.editPost);

router.get('/:id', PostController.getPost);

router.get('', PostController.getPosts);

router.delete('/:id', checkAuth, PostController.removePost);

module.exports = router;