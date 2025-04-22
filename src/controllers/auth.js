import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../db/models/user.js';
import Session from '../db/models/session.js';
import createError from 'http-errors';
import { registerUser } from '../db/services/auth.js';
import { loginUser } from '../db/services/auth.js';
import { ONE_DAY } from '../constants/index.js';
import { logoutUser } from '../db/services/auth.js';
import { refreshUsersSession } from '../db/services/auth.js';

export const registerUserController = async (req, res, next) => {
  const { name, email, password } = req.body;
  // const user = await registerUser(req.body);

    // Проверка на существование пользователя
    const userExists = await User.findOne({ email });
    if (userExists) {
      return next(createError(409, 'Email in use'));
    }

     // Хеширование пароля
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ name, email, password: hashedPassword });
  await newUser.save();

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: { name: newUser.name, email: newUser.email },
    // data: user,
  });
};

export const loginUserController = async (req, res, next) => {
  const { email, password } = req.body;
  // await loginUser(req.body);

  res.cookie('refreshToken', Session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });

  res.cookie('sessionId', Session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });

    // Находим пользователя по email
    const user = await User.findOne({ email });
    if (!user) {
      return next(createError(401, 'Invalid email or password'));
    }

     // Проверяем, совпадает ли введенный пароль с захешированным
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return next(createError(401, 'Invalid email or password'));
  }

   // Создаем accessToken и refreshToken
  const accessToken = jwt.sign({ userId: user._id }, 'secret', { expiresIn: '15m' });
  const refreshToken = jwt.sign({ userId: user._id }, 'secret', { expiresIn: '30d' });

   // Удаляем старую сессию (если она есть)
  await Session.findOneAndDelete({ userId: user._id });

    // Создаем новую сессию
    const newSession = new Session({
      userId: user._id,
      accessToken,
      refreshToken,
      accessTokenValidUntil: new Date(Date.now() + 15 * 60 * 1000), // 15 минут
      refreshTokenValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 дней
    });

    await newSession.save();

  // Устанавливаем куки с refresh токеном
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY), // Один день
  });

  // Устанавливаем куки с sessionId (ID сессии)
  res.cookie('sessionId', newSession._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY), // Один день
  });

  // Возвращаем ответ с access токеном
  res.status(200).json({
    status: 'success',
    message: 'Successfully logged in an user!',
    data: {
      accessToken,
    },
  });

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: Session.accessToken,
    },
  });
};

export const logoutUserController = async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return next(createError(401, 'No refresh token found'));
  }

  // Удаляем сессию с refreshToken
  await Session.findOneAndDelete({ refreshToken });

  // Очищаем куки
  res.clearCookie('refreshToken');
  res.clearCookie('sessionId');

  // Проверяем наличие sessionId в куки и выполняем выход пользователя
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }

  // Отправляем успешный ответ
  res.status(204).send();
};

const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
};

export const refreshUserSessionController = async (req, res) => {
  const session = await refreshUsersSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
    },
  });
};
