const express = require('express');
const {
	userById,
	getUsers,
	getUser,
	updateUser,
	deleteUser,
	userPhoto,
	addFollowing,
	addFollower,
	removeFollowing,
	removeFollower,
	findPeople
} = require('../controllers/user');
const { requireLogin } = require('../controllers/auth');

const router = express.Router();

//following is used as middleware, follower is the actual method
router.put('/user/follow', requireLogin, addFollowing, addFollower);
router.put('/user/unfollow', requireLogin, removeFollowing, removeFollower);

router.get('/users', getUsers);
router.get('/user/:userId', requireLogin, getUser);
router.put('/user/:userId', requireLogin, updateUser);
router.delete('/user/:userId', requireLogin, deleteUser);
//photo
router.get('/user/photo/:userId', userPhoto);

//who to follow
router.get('/user/findpeople/:userId', requireLogin, findPeople)

//any route containing :userId, our app will first execute userById()
router.param('userId', userById);

module.exports = router;
