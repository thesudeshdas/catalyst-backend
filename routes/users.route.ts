import express from 'express';
const router = express.Router();

const user_controller = require('../controllers/user.controller');

router.get('/', user_controller.user_list_get);

router.post('/sign-up', user_controller.user_sign_up);

router.post('/sign-in', user_controller.user_sign_in);

router.param('userId', user_controller.user_find_param);

router.get('/:userId', user_controller.user_details_get);

router.post('/:userId', user_controller.user_update_details_post);

router.post('/:userId/follow', user_controller.user_follow_post);

router.post('/:userId/unfollow', user_controller.user_unfollow_post);

module.exports = router;
