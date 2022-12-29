import express from 'express';
const router = express.Router();

const post_controller = require('../controllers/post.controller');

router.get('/', post_controller.post_list_get);

router.param('postId', post_controller.post_find_param);

router.get('/:postId', post_controller.post_details_get);

module.exports = router;
