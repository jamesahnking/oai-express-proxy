const express = require('express');
const router = express.Router();
const { generateImage } = require('../controllers/openaiController');

// Ex. localhost:5001/openai/generateimage
router.post('/generateimage', generateImage);

module.exports = router;