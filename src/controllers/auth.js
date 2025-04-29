import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../db/models/user.js';
import Session from '../db/models/session.js';
import createError from 'http-errors';
import { 
  registerUser, 
  loginUser, 
  logoutUser, 
  refreshUsersSession 
} from '../db/services/auth.js';
import { ONE_DAY } from '../constants/index.js';
import { requestResetToken } from '../db/services/auth.js';
import { resetPassword } from '../db/services/auth.js';

// Регистрация пользователя
export const registerUserController = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    // Проверка на наличие пользователя с таким email
    const newUser = await registerUser({ name, email, password });

    res.status(201).json({
      status: 201,
      message: 'Successfully registered a user!',
      data: { name: newUser.name, email: newUser.email },
    });
  } catch (error) {
    next(error);
  }
};


// Логин пользователя
export const loginUserController = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const session = await loginUser({ email, password });

    res.cookie('refreshToken', session.refreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + ONE_DAY),
    });

    res.cookie('sessionId', session.sessionId, {
      httpOnly: true,
      expires: new Date(Date.now() + ONE_DAY),
    });

    res.status(200).json({
      status: 'success',
      message: 'Successfully logged in user!',
      data: { accessToken: session.accessToken },
    });
  } catch (error) {
    next(error);
  }
};


// Логаут пользователя
export const logoutUserController = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    const sessionId = req.cookies.sessionId;

    if (!refreshToken || !sessionId) {
      return next(createError(401, 'Missing session info'));
    }

    await logoutUser(sessionId);

    res.clearCookie('refreshToken');
    res.clearCookie('sessionId');

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};


// Хелпер для установки куки
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

// Обновление сессии
export const refreshUserSessionController = async (req, res, next) => {
  try {
    const session = await refreshUsersSession({
      sessionId: req.cookies.sessionId,
      refreshToken: req.cookies.refreshToken,
    });

    setupSession(res, session);

    res.cookie('refreshToken', session.refreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + ONE_DAY),
    });

    res.cookie('sessionId', session.sessionId, {
      httpOnly: true,
      expires: new Date(Date.now() + ONE_DAY),
    });

    res.status(200).json({
      status: 200,
      message: 'Successfully refreshed session!',
      data: { accessToken: session.accessToken },
    });
  } catch (error) {
    next(error);
  }
};

export const requestResetEmailController = async (req, res) => {
  await requestResetToken(req.body.email);
  res.json({
    message: 'Письмо для сброса пароля успешно отправлено!',
    status: 200,
    data: {},
  });
};

export const resetPasswordController = async (req, res) => {
  await resetPassword(req.body);
  res.json({
    message: 'Пароль был успешно сброшен!',
    status: 200,
    data: {},
  });
};

