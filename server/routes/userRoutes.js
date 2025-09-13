const express = require('express');
const {syncUser, getUser, addAddress, updateUserAddress, deleteAddress} = require('../controllers/UserController');

const router = express.Router();

router.get('/user/:uid', getUser);
router.patch('/user/:uid', syncUser);

// user addresses
router.post('/user/:uid/address', addAddress);
router.patch('/user/:uid/address/:addressId', updateUserAddress);
router.delete('/user/:uid/address/:addressId', deleteAddress);

module.exports = router;