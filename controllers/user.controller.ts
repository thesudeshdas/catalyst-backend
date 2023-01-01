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
