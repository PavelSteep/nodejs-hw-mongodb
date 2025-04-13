import { HttpError } from 'http-errors';
import mongoose from 'mongoose';
import Joi from 'joi';

const { MongooseError } = mongoose;

export const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    return res.status(err.status).json({
      status: err.status,
      message: err.message,
      errors: err.details?.map((err) => ({
        message: err.message,
        path: err.path,
      })),
      name: 'HttpError',
    });
  }

  if (err instanceof MongooseError) {
    return res.status(500).json({
      status: 500,
      message: err.message,
      name: 'MongooseError',
    });
  }

  if (err.isJoi) {
    return res.status(400).json({
      status: 400,
      message: err.message,
      name: 'ValidationError',
    });
  }

  res.status(500).json({
    status: 500,
    message: err.message,
    name: 'InternalServerError',
  });
};
