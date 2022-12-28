const mongoose = require('mongoose');

import { Schema, model, Types, Model } from 'mongoose';
import { IPost } from '../types/user.type';

const PostSchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    type: String,
    required: true,
  },
  likes: [String],
  images: [
    {
      src: String,
      alt: String,
    },
  ],
  description: {
    type: String,
    required: true,
  },
  live: {
    type: String,
  },
  repo: {
    type: String,
  },
  stack: [
    {
      value: String,
      label: String,
    },
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      text: String,
    },
  ],
});

// export const Post = mongoose.model<IPost>('Post', PostSchema);

module.exports = mongoose.model('Post', PostSchema);
