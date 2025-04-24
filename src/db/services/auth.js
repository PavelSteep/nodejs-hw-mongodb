import { randomBytes } from 'crypto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import dotenv from 'dotenv';
import { UsersCollection } from '../models/user.js';
import { SessionsCollection } from '../../db/models/session.js';
import { FIFTEEN_MINUTES, ONE_DAY } from '../../constants/index.js';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_SECRET_REFRESH = process.env.JWT_SECRET_REFRESH;

// Проверка на наличие секретных ключей
if (!JWT_SECRET || !JWT_SECRET_REFRESH) {
  throw new Error('JWT_SECRET и/или JWT_SECRET_REFRESH не заданы в .env');
}

// Создание новой сессии
const createSession = (userId) => {
  const accessToken = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '15m' });
  const refreshToken = randomBytes(30).toString('base64');

  return {
    userId,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  };
};

// Регистрация
export const registerUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });

  if (user) {
    throw createHttpError(409, 'Email in use');
  }

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  return await UsersCollection.create({
    ...payload,
    password: encryptedPassword,
  });
};

// Логин
export const loginUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });

  if (!user) {
    console.error(`User not found: ${payload.email}`);
    throw createHttpError(401, 'Invalid email or password');
  }

  const isEqual = await bcrypt.compare(payload.password, user.password);
  if (!isEqual) {
    console.error(`Password mismatch: ${payload.email}`);
    throw createHttpError(401, 'Invalid email or password');
  }

  const accessToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
  const refreshToken = jwt.sign({ userId: user._id }, JWT_SECRET_REFRESH, { expiresIn: '7d' });

  return { accessToken, refreshToken, sessionId: user._id };
};

// Логаут
export const logoutUser = async (sessionId) => {
  await SessionsCollection.deleteOne({ _id: sessionId });
};

// Обновление сессии
export const refreshUsersSession = async ({ sessionId, refreshToken }) => {
  const session = await SessionsCollection.findOne({ _id: sessionId, refreshToken });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const isExpired = new Date() > new Date(session.refreshTokenValidUntil);
  if (isExpired) {
    throw createHttpError(401, 'Session token expired');
  }

  const newSession = createSession(session.userId);
  await SessionsCollection.deleteOne({ _id: sessionId, refreshToken });

  const createdSession = await SessionsCollection.create(newSession);

  return {
    accessToken: newSession.accessToken,
    refreshToken: newSession.refreshToken,
    sessionId: createdSession._id,
    userId: session.userId,
  };
};
