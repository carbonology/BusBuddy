const express = require('express');
const router = express.Router();
const passport = require('passport');

// Logout
router.get('/', (req, res) => {
  req.logout();
  res.redirect('/login');
});

module.exports = router;

