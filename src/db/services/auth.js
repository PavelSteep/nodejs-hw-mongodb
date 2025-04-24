import { randomBytes } from 'crypto';
import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { UsersCollection } from '../models/user.js';
import { SessionsCollection } from '../../db/models/session.js';
import { FIFTEEN_MINUTES, ONE_DAY } from '../../constants/index.js';

// Создание новой сессии
const createSession = (userId) => {
  const accessToken = randomBytes(30).toString('base64');
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
    console.error('Email already in use:', payload.email);
    throw createHttpError(409, 'Email in use');
  }

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  try {
    return await UsersCollection.create({
      ...payload,
      password: encryptedPassword,
    });
  } catch (err) {
    console.error('Error during user registration:', err);
    throw createHttpError(500, 'Internal server error');
  }
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

  // Создание и сохранение сессии
  const newSession = createSession(user._id);
  try {
    const createdSession = await SessionsCollection.create(newSession);

    console.log('Session created:', createdSession);

    return {
      accessToken: newSession.accessToken,
      refreshToken: newSession.refreshToken,
      sessionId: createdSession._id,
      userId: user._id,
    };
  } catch (err) {
    console.error('Error during session creation:', err);
    throw createHttpError(500, 'Internal server error');
  }
};

// Логаут
export const logoutUser = async (sessionId) => {
  await SessionsCollection.deleteOne({ _id: sessionId });
};

// Обновление сессии
export const refreshUsersSession = async ({ sessionId, refreshToken }) => {
  try {
    console.log('Searching for session with sessionId:', sessionId);
    const session = await SessionsCollection.findOne({ _id: sessionId, refreshToken });
    console.log('Session found:', session);

    if (!session) {
      console.error('Session not found for refresh token:', refreshToken);
      throw createHttpError(401, 'Session not found');
    }

    const isExpired = new Date() > new Date(session.refreshTokenValidUntil);
    if (isExpired) {
      console.error('Refresh token expired');
      throw createHttpError(401, 'Session token expired');
    }

    // Создание новой сессии
    const newSession = createSession(session.userId);
    await SessionsCollection.deleteOne({ _id: sessionId, refreshToken });

    const createdSession = await SessionsCollection.create(newSession);

    console.log('New session created:', createdSession);

    return {
      accessToken: newSession.accessToken,
      refreshToken: newSession.refreshToken,
      sessionId: createdSession._id,
      userId: session.userId,
    };
  } catch (err) {
    console.error('Error in refreshing session:', err);
    throw createHttpError(500, 'Internal server error');
  }
};
