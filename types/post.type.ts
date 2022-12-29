import { Types } from 'mongoose';

export type IPostPic = {
  src: string;
  alt: string;
};

export type IComment = {
  _id: string;
  user: Types.ObjectId;
  text: string;
};

export type IPost = {
  user: Types.ObjectId;
  name: string;
  likes: string[];
  images: IPostPic[];
  description: string;
  live: string;
  repo: string;
  stack: string[];
  comments: IComment[];
};
