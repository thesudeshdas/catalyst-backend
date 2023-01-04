import express from 'express';

declare global {
  namespace Express {
    interface Request {
      post?: Record<string, any>;
      user?: Record<string, any>;
    }
  }
}
