import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

const User = require('../models/user.model');

exports.user_list_get = async (req: Request, res: Response) => {
  try {
    const users = await User.find();

    if (!users) {
      return res.status(404).json({
        success: false,
        message: 'Users could not be loaded',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Successfully fetched users',
      users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Some error while retrieving users',
      error,
    });
  }
};

exports.user_sign_up = async (req: Request, res: Response) => {
  try {
    const newUser = new User(req.body);
    const existingUser = await User.findOne({ email: newUser.email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'This user already exists in the database',
      });
    } else {
      const existingUsername = await User.findOne({
        username: newUser.username,
      });

      if (existingUsername) {
        return res.status(403).json({
          success: false,
          message: 'This username already exists in the database',
        });
      } else {
        const createdUser = await newUser.save();

        return res.status(200).json({
          success: true,
          message: 'This user was created',
          createdUser,
        });
      }
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'User could not be signed up', error });
  }
};

exports.user_sign_in = async (req: Request, res: Response) => {
  try {
    const attemptingUser = req.body;
    const foundUser = await User.findOne({ email: attemptingUser.email });

    if (!foundUser) {
      return res.status(404).json({
        success: false,
        message: 'No registered user with this email',
      });
    } else {
      if (attemptingUser.password !== foundUser.password) {
        return res.status(401).json({
          success: false,
          message: 'Password is incorrect',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Successfully signed in',
        signedUser: {
          ...foundUser._doc,
          password: 'hidden password by server',
        },
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'User could not be signed in', error });
  }
};

exports.user_find_param = async (
  req: Request,
  res: Response,
  next: NextFunction,
  id: string
) => {
  try {
    if (mongoose.Types.ObjectId.isValid(id)) {
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'user not found by this Id',
        });
      }

      req.user = user;
      return next();
    } else {
      return res.status(400).json({
        success: false,
        message: 'Id for user is wrong',
        wrongId: id,
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Error while finding user',
      err,
    });
  }
};

exports.user_details_get = async (req: Request, res: Response) => {
  const { user } = req;

  return res.status(200).json({
    success: true,
    message: 'User details found',
    user: {
      ...user?._doc,
      password: 'hidden password by server',
    },
  });
};

exports.user_update_details_post = async (req: Request, res: Response) => {
  try {
    const { user } = req;

    const toUpdate = req.body;

    await User.findByIdAndUpdate(user?._id, toUpdate, {
      new: true,
    }).then((updatedDoc) => {
      if (!updatedDoc) {
        return res.status(404).json({
          success: false,
          message: 'User by this id does not exist in the database.',
        });
      } else {
        return res.status(200).json({ success: true, updatedUser: updatedDoc });
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error while updating user',
      error,
    });
  }
};

exports.user_follow_post = async (req: Request, res: Response) => {
  try {
    const { user: followingUser } = req;
    const followerUserId = req.body.followerUserId;

    if (mongoose.Types.ObjectId.isValid(followerUserId)) {
      const updatedFollower = await User.findByIdAndUpdate(
        followerUserId,
        {
          $push: { following: followingUser?._id },
        },
        { new: true }
      );

      const updatedFollowing = await User.findByIdAndUpdate(
        followingUser?._id,
        {
          $push: { followers: followerUserId },
        },
        { new: true }
      );

      if (updatedFollowing && updatedFollower) {
        return res.status(200).json({
          success: true,
          message: 'successfully added user id to followers list',
          updatedFollowing,
          updatedFollower,
        });
      } else {
        return res.status(400).json({
          success: false,
          message: 'Could not update followers',
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: 'The follower id is wrong',
        followerUserId,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error while following user',
      error,
    });
  }
};

exports.user_unfollow_post = async (req: Request, res: Response) => {
  try {
    const { user: unfollowingUser } = req;
    const unfollowerUserId = req.body.unfollowerUserId;

    if (mongoose.Types.ObjectId.isValid(unfollowerUserId)) {
      const updatedUnfollower = await User.findByIdAndUpdate(
        unfollowerUserId,
        {
          $pull: { following: unfollowingUser?._id },
        },
        { new: true }
      );

      const updatedUnfollowing = await User.findByIdAndUpdate(
        unfollowingUser?._id,
        {
          $pull: { followers: unfollowerUserId },
        },
        { new: true }
      );

      if (updatedUnfollowing && updatedUnfollower) {
        return res.status(200).json({
          success: true,
          message: 'successfully added user id to followers list',
          updatedUnfollowing,
          updatedUnfollower,
        });
      } else {
        return res.status(400).json({
          success: false,
          message: 'Could not update followers',
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: 'The follower id is wrong',
        unfollowerUserId,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error while following user',
      error,
    });
  }
};
