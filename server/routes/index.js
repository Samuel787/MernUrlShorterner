const express = require('express');
const router = express.Router();
const Url = require('../models/Url');
router.get('/:code', async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code });

    if (url) {
      if (url.numValid >= 1) {
        url.numValid = url.numValid - 1
        await url.save()
        return res.redirect(url.longUrl);
      } else {
        res.render("404page.ejs")
      }
    } else {
      res.render("404page.ejs")
    }
  } catch (err) {
    console.error(err);
    res.status(500).json('Server error');
  }
});

module.exports = router;