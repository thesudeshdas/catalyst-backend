import express from 'express';
const router = express.Router();

const post_controller = require('../controllers/post.controller');

const middlewares = require('../middlewares/auth.middleware');

router.get('/', post_controller.post_list_get);

router.post(
  '/create',
  middlewares.auth_verification,
  post_controller.post_create_post
);

router.param('postId', post_controller.post_find_param);

router.get('/:postId', post_controller.post_details_get);

router.post(
  '/:postId',
  middlewares.auth_verification,
  post_controller.post_update_details_post
);

router.post(
  '/:postId/like',
  middlewares.auth_verification,
  post_controller.post_like_post
);

router.post(
  '/:postId/unlike',
  middlewares.auth_verification,
  post_controller.post_unlike_post
);

router.post(
  '/:postId/comment',
  middlewares.auth_verification,
  post_controller.post_comment_post
);

module.exports = router;
