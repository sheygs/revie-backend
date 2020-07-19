const User = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { log } = console;

router.post('/register', async (req, res, next) => {
  const { name, email, password, phone } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ status: 'error', error: 'All fields are required' });
  }
  try {
    let user = await User.findOne({ email });
    if (user)
      return res
        .status(400)
        .json({ status: 'error', error: 'User already exists' });
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    user = new User({
      name,
      email,
      password: hashed,
    });
    await user.save();
    const token = user.generateAuthToken();
    res.status(201).json({ status: 'success', token });
  } catch ({ message }) {
    log(message);
  }
});

module.exports = router;
