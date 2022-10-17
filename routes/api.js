const express = require('express');
const router = express.Router();
const apiControllers = require('../controllers/apiControllers');
const restrictJWT = require('../middlewares/restrictJWT')

router.get('/',apiControllers.dashboard)

router.get('/signup',apiControllers.signup)
router.post('/signup',apiControllers.actionSignup)

router.get('/login',apiControllers.login)
router.post('/login',apiControllers.actionLogin)

router.get('/authorization',restrictJWT,apiControllers.isAuthorization)
router.post('/create-room',apiControllers.createRoom)
// router.get('/fight/room-id',apiControllers.roomId)
router.post('/fight/room-id',apiControllers.roomId)


module.exports = router;
