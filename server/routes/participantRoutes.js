const express = require('express');
const router = express.Router();

const participantController = require('../controllers/participantController');

router.post('/', participantController.participant_create);

module.exports = router;
