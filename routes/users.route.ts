import express from 'express';
const router = express.Router();

const user_controller = require('../controllers/user.controller');

router.get('/', user_controller.user_list_get);

router.post('/sign-up', user_controller.user_sign_up);

// router.param('postId', user_controller.post_find_param);

// router.get('/:postId', user_controller.post_details_get);

module.exports = router;
