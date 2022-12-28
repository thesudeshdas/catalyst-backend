const Post = require('../models/post.model');

exports.post_list_get = async (req: any, res: any) => {
  try {
    const posts = await Post.find();

    return res.status(200).json({
      success: true,
      message: 'Successfully fetched posts',
      posts,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: 'Some error while retrieving posts',
      error,
    });
  }
};