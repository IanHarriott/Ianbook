const express = require('express');
const {
	getPosts,
	createPost,
	postsByUser,
	postById,
	isPoster,
	updatePost,
	deletePost,
	postPhoto,
	getPost,
	like,
	unlike,
	comment,
	uncomment
} = require('../controllers/post');
const { requireLogin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
const { createPostValidator } = require('../validator');

const router = express.Router();

router.get('/posts', getPosts);

//like unlike
router.put('/post/like', requireLogin, like);
router.put('/post/unlike', requireLogin, unlike);

//comment
router.put('/post/comment', requireLogin, comment);
router.put('/post/uncomment', requireLogin, uncomment);

router.post(
	'/post/new/:userId',
	requireLogin,
	createPost,
	createPostValidator
);
router.get('/posts/by/:userId', requireLogin, postsByUser);
router.get('/post/:postId', getPost);
router.put('/post/:postId', requireLogin, isPoster, updatePost);
router.delete('/post/:postId', requireLogin, isPoster, deletePost);
//photo
router.get('/post/photo/:postId', postPhoto);

//any route containing :userId, our app will first execute userById()
router.param('userId', userById);
//any route containing :userId, our app will first execute postById()
router.param('postId', postById);

module.exports = router;
