import { Router } from "express";
import contactsRouter from "./contacts.js";
import authRouter from "./auth.js";

export const router = Router();

// Регистрируем маршрут /contacts
router.use('/contacts', contactsRouter);
router.use('/auth', authRouter);

export default router;
