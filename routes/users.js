const authController = require('../middleware/auth');
const userController = require('../controllers/userController');
const express = require('express');
const router = express.Router();
const { log } = console;

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/verify', authController.verifyToken, async (req, res, next) => {
  try {
    log(req.user._id);
    res.send('Verified');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
