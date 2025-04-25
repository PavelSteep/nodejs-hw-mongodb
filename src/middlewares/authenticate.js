import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';

import { SessionsCollection } from '../db/models/session.js';
import { UsersCollection } from '../db/models/user.js';

export const authenticate = async (req, res, next) => {
  // Получаем token из Authorization заголовка
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    console.error('Authorization header missing');
    return next(createHttpError(401, 'Please provide Authorization header'));
  }

  const [bearer, token] = authHeader.split(' ');

  if (bearer !== 'Bearer' || !token) {
    console.error('Authorization header should be in Bearer format');
    return next(createHttpError(401, 'Auth header should be of type Bearer'));
  }

  // Проверка на корректность токена (должно быть три части)
  if (token.split('.').length !== 3) {
    console.error('Malformed token: incorrect number of parts');
    return next(createHttpError(401, 'Malformed token'));
  }

  try {
    // Проверяем сессию по токену
    const session = await SessionsCollection.findOne({ accessToken: token });

    if (!session) {
      console.error('Session not found for the provided token');
      return next(createHttpError(401, 'Session not found'));
    }

    const isAccessTokenExpired = new Date() > new Date(session.accessTokenValidUntil);

    if (isAccessTokenExpired) {
      console.error('Access token expired');
      return next(createHttpError(401, 'Access token expired'));
    }

    // Проверяем подпись токена и получаем данные
    const decoded = jwt.verify(token, 'secret'); // <-- Здесь происходит верификация токена
    console.log('Decoded token:', decoded);

    // Проверяем, существует ли пользователь с данным ID
    const user = await UsersCollection.findById(session.userId);

    if (!user) {
      console.error('User not found');
      return next(createHttpError(401, 'User not found'));
    }

    // Если всё в порядке, добавляем пользователя в запрос
    req.user = user;
    next();
  } catch (err) {
    console.error('Error during token verification:', err);
    return next(createHttpError(401, 'Invalid or expired access token'));
  }
};
