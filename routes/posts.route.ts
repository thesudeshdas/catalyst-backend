import express from 'express';
const router = express.Router();

const post_controller = require('../controllers/post.controller');

router.get('/', post_controller.post_list_get);

module.exports = router;
