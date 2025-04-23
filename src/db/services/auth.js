import { randomBytes } from 'crypto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import dotenv from 'dotenv';
import { UsersCollection } from '../models/user.js';  // модель пользователя
import { SessionsCollection } from '../../db/models/session.js';  // модель сессии
import { FIFTEEN_MINUTES, ONE_DAY } from '../../constants/index.js';

dotenv.config(); // Загружаем переменные окружения

const JWT_SECRET = process.env.JWT_SECRET; // Секрет для accessToken
const JWT_SECRET_REFRESH = process.env.JWT_SECRET_REFRESH; // Секрет для refreshToken

// Создание сессии
const createSession = (userId) => {
  const accessToken = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '15m' });
  const refreshToken = randomBytes(30).toString('base64');

  return {
    userId,
    accessToken,  // accessToken для использования в API
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  };
};

// Регистрация пользователя
export const registerUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });

  if (user) throw createHttpError(409, 'Email in use'); // Проверка, занят ли email

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  return await UsersCollection.create({
    ...payload,
    password: encryptedPassword,
  });
};

// Логин пользователя
export const loginUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });

  if (!user) {
    console.error(`User with email ${payload.email} not found`);
    throw createHttpError(401, 'Invalid email or password');
  }

  const isEqual = await bcrypt.compare(payload.password, user.password);
  if (!isEqual) {
    console.error(`Password mismatch for user ${payload.email}`);
    throw createHttpError(401, 'Invalid email or password');
  }

  // Создаем и возвращаем сессионные данные (accessToken и refreshToken)
  const accessToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
  const refreshToken = jwt.sign({ userId: user._id }, JWT_SECRET_REFRESH, { expiresIn: '7d' });

  return { accessToken, refreshToken, sessionId: user._id };
};

// Логаут пользователя
export const logoutUser = async (sessionId) => {
  await SessionsCollection.deleteOne({ _id: sessionId });
};

// Обновление сессии
export const refreshUsersSession = async ({ sessionId, refreshToken }) => {
  const session = await SessionsCollection.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const isSessionTokenExpired = new Date() > new Date(session.refreshTokenValidUntil);
  if (isSessionTokenExpired) {
    throw createHttpError(401, 'Session token expired');
  }

  const newSession = createSession(session.userId);

  // Удаляем старую сессию
  await SessionsCollection.deleteOne({ _id: sessionId, refreshToken });

  const createdSession = await SessionsCollection.create(newSession);

  return {
    accessToken: newSession.accessToken,
    refreshToken: newSession.refreshToken,
    sessionId: createdSession._id,
    userId: session.userId,
  };
};
