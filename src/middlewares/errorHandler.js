import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import Joi from 'joi';

const { MongooseError } = mongoose;

export const errorHandler = (err, req, res, next) => {
  // Проверка, что err — это объект и является экземпляром ошибки HttpError
  if (err && err instanceof createHttpError.HttpError) {
    return res.status(err.status).json({
      status: err.status,
      message: err.message,
      errors: err.details?.map((e) => ({
        message: e.message,
        path: e.path,
      })),
      name: 'HttpError',
    });
  }

  // Проверка, что err — это объект и является экземпляром ошибки MongooseError
  if (err && err instanceof mongoose.Error) {
    return res.status(500).json({
      status: 500,
      message: err.message,
      name: 'MongooseError',
    });
  }

  // Проверка, что err — это объект и является ошибкой Joi
  if (err && err.isJoi) {
    return res.status(400).json({
      status: 400,
      message: err.message,
      name: 'ValidationError',
    });
  }

  // Общая внутренняя ошибка сервера
  res.status(500).json({
    status: 500,
    message: err.message,
    name: 'InternalServerError',
  });
};
