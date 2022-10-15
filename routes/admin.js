const express = require('express');
const router = express.Router();
const admControllers = require('../controllers/admControllers')

router.get('/',admControllers.home)

router.get('/login',admControllers.login)
router.post('/login', admControllers.actionLogin)

router.get('/signup',admControllers.signup)
router.post('/signup',admControllers.actionSignUp)

router.get('/biodata',isLogin,admControllers.biodata)
router.get('/profile',isLogin,admControllers.profile)
router.get('/dashboard',isLogin,admControllers.dashboard)
router.get('/game',isLogin,admControllers.game)

router.post('/logout',admControllers.logout)

module.exports = router;
