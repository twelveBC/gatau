const express = require('express');
const passport = require('passport');
const router = express.Router();
const apiControllers = require('../controllers/apiControllers');
const restrict = require('../middlewares/restrict');


router.post('/signup')
router.post('/login')
router.post('/create-room')
router.post('/fight/room-id')


module.exports = router;
