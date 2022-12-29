const mongoose = require('mongoose');

import { Schema, model, Model } from 'mongoose';

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [32, 'Name must be less than 32 characters long'],
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    minlength: [2, 'Username must be at least 2 characters long'],
    maxlength: [16, 'Username must be less than 16 characters long'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    // minlength: [8, 'Password must be at least 8 characters long'],
    // maxlength: [32, 'Password must be less than 32 characters long'],
  },
  title: {
    type: String,
  },
  company: {
    type: String,
  },
  profilePic: {
    src: String,
    alt: String,
  },
  tags: {
    type: [String],
  },
  bio: {
    type: String,
  },
  stack: {
    type: [
      {
        value: String,
        label: String,
      },
    ],
  },
  social: [
    {
      platform: String,
      link: String,
    },
  ],
  followers: [String],
  following: [String],
  starredPost: [String],
  status: {
    type: String,
    enum: ['Active', 'Deprecated'],
    default: 'Active',
  },
});

module.exports = mongoose.model('User', UserSchema);
