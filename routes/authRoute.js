const express = require('express');
const router = express.Router();
const {createUser, loginUserCtrl, getAllUsers, getUser, deleteUser, updateUser} = require('../controllers/userController.js');
const {authMiddleware, isAdmin} = require('../middlewares/authMiddleware.js');

router.post('/register', createUser);
router.post('/login', loginUserCtrl);
router.get('/all-users', getAllUsers);
router.get('/:id', authMiddleware, isAdmin ,getUser);
router.delete('/:id', deleteUser);
router.put('/edit-user', authMiddleware, updateUser);
router.put('/block-user/:id', authMiddleware, isAdmin , updateUser);
router.put('/unblock-user/:id', authMiddleware, isAdmin, updateUser);

module.exports = router;