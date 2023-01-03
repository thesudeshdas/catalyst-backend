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
