//****ImportingPackages******//
const express = require('express');
const { getUsers, createUser, deleteUser, getUserDetails } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();


//***GetUser*****//
router.get("/", authMiddleware, getUsers);

//***getUserDetails*****//
router.get("/:id", authMiddleware, getUserDetails);

//***createUser*****//
router.post("/create", authMiddleware, createUser);

//**DeleteUser****//
router.post("/delete/:id", authMiddleware, deleteUser);

module.exports = router;