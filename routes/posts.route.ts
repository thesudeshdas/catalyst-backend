import express from 'express';
const router = express.Router();

const post_controller = require('../controllers/post.controller');

router.get('/', post_controller.post_list_get);

router.post('/create', post_controller.post_create_post);

router.param('postId', post_controller.post_find_param);

router.get('/:postId', post_controller.post_details_get);

router.post('/:postId', post_controller.post_update_details_post);

router.post('/:postId/like', post_controller.post_like_post);

router.post('/:postId/unlike', post_controller.post_unlike_post);

router.post('/:postId/comment', post_controller.post_comment_post);

module.exports = router;
