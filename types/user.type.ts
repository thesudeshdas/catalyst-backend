import { Types } from 'mongoose';

export type IProfilePic = {
  src: string;
  alt: string;
};

export type ISocial = {
  platform: string;
  link: string;
};

export type IStack = { value: string; label: string };

export type IUser = {
  name: string;
  username: string;
  password: null;
  email: string;
  _id?: Types.ObjectId;
  title: string;
  company: string;
  profilePic: IProfilePic;
  image: string;
  tags: string[];
  bio: string;
  stack: IStack[];
  social: ISocial[];
  status: string;
  followers: Types.ObjectId[];
  following: Types.ObjectId[];
  starredPost: Types.ObjectId[];
};
