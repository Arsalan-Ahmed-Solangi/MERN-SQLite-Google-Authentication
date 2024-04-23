//****ImportingPackages******//
const express = require('express');
const { login, googleAuth, googleAuthCallback } = require('../controllers/authController');
const router = express.Router();


//***Login*****//
router.post("/login", login);


//*****GoogleAuthentication********//
router.get("/google", googleAuth)
router.get("/google/callback", googleAuthCallback)

module.exports = router;