const express = require('express');
const { saveLayout, getLayout } = require('../controllers/layoutController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();
router.post('/save-layout', authenticate, saveLayout);
router.get('/get-layout', authenticate, getLayout);

module.exports = router;
