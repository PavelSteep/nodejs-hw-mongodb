import createHttpError from 'http-errors';
import { SessionsCollection } from '../db/models/session.js';
import { UsersCollection } from '../db/models/user.js';

export const authenticate = async (req, res, next) => {
  // Получаем token из Authorization заголовка
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    return next(createHttpError(401, 'Please provide Authorization header'));
  }

  const [bearer, token] = authHeader.split(' ');

  if (bearer !== 'Bearer' || !token) {
    return next(createHttpError(401, 'Auth header should be of type Bearer'));
  }

  // Проверка на корректность токена (должно быть три части)
  const session = await SessionsCollection.findOne({ accessToken: token });

  if (!session) {
    return next(createHttpError(401, 'Session not found'));
  }

  try {
    const isAccessTokenExpired =
      new Date() > new Date(session.accessTokenValidUntil);

    if (isAccessTokenExpired) {
      return next(createHttpError(401, 'Access token expired'));
    }

    // Проверяем, существует ли пользователь с данным ID
    const user = await UsersCollection.findById(session.userId);

    if (!user) {
      return next(createHttpError(401, 'User not found'));
    }

    // Если всё в порядке, добавляем пользователя в запрос
    req.user = user;
    next();
  } catch (err) {
    return next(createHttpError(401, 'Invalid or expired access token'));
  }
};
