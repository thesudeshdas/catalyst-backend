import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { IPost } from '../types/post.type';

const Post = require('../models/post.model');
const User = require('../models/user.model');

exports.post_list_get = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find().populate({
      path: 'user',
      model: User,
    });

    if (!posts) {
      return res.status(404).json({
        success: false,
        message: 'Posts could not be loaded',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Successfully fetched posts',
      posts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Some error while retrieving posts',
      error,
    });
  }
};

exports.post_find_param = async (
  req: Request,
  res: Response,
  next: NextFunction,
  id: string
) => {
  try {
    if (mongoose.Types.ObjectId.isValid(id)) {
      const post = await Post.findById(id)
        .populate({
          path: 'user',
          model: User,
        })
        .populate({
          path: 'comments',
          populate: { path: 'user', model: User },
        });

      if (!post) {
        return res.status(404).json({
          success: false,
          message: 'post not found by this Id',
        });
      }

      req.post = post;
      return next();
    } else {
      return res.status(409).json({
        success: false,
        message: 'Id for post is wrong',
        wrongId: id,
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Error while finding post',
      err,
    });
  }
};

exports.post_details_get = async (req: Request, res: Response) => {
  const { post } = req;

  return res.status(200).json({
    success: true,
    message: 'Post details found',
    post,
  });
};

exports.post_like_post = async (req: Request, res: Response) => {
  try {
    const { post } = req;

    const userId = req.body.userId;

    if (mongoose.Types.ObjectId.isValid(userId)) {
      const likedPost = await Post.findByIdAndUpdate(
        post?._id,
        {
          $push: { likes: userId },
        },
        { new: true }
      );
      if (!likedPost) {
        return res.status(400).json({
          success: false,
          message: 'Could not like post',
        });
      } else {
      }
      return res.status(200).json({
        success: true,
        message: 'successfully liked the post',
        likedPost,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'The user id is wrong',
        userId,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'The post could not be liked, try again.',
      error,
    });
  }
};

exports.post_unlike_post = async (req: Request, res: Response) => {
  try {
    const { post } = req;

    const userId = req.body.userId;

    if (mongoose.Types.ObjectId.isValid(userId)) {
      const unlikedPost = await Post.findByIdAndUpdate(
        post?._id,
        {
          $pull: { likes: userId },
        },
        { new: true }
      );
      if (!unlikedPost) {
        return res.status(400).json({
          success: false,
          message: 'Could not unlike post',
        });
      } else {
      }
      return res.status(200).json({
        success: true,
        message: 'successfully unliked the post',
        unlikedPost,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'The user id is wrong',
        userId,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'The post could not be liked, try again.',
      error,
    });
  }
};
