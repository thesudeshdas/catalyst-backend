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
      console.log({ existingUsername });

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
    console.log('Some server error ' + error);
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
    console.log('Some server error ' + error);
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
