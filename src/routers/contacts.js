import { Router } from "express";
import { 
  getContactsController, 
  getContactByIdController,
  createContactController,
  patchContactController,
  putContactController,
  deleteByIdController 
} from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { isValidId } from "../middlewares/isValidId.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createContactValidationSchema } from "../validation/createContactValidationSchema.js";
import { updateContactValidationSchema } from "../validation/updateContactValidationSchema.js";
import { authenticate } from '../middlewares/authenticate.js';
import { checkRoles } from '../middlewares/checkRoles.js';
import { ROLES } from '../constants/index.js';

export const contactsRouter = Router();

// ✅ Применяем мидлвар для всех маршрутов ниже
contactsRouter.use(authenticate);

// ✅ Все маршруты защищены (нужен токен)
contactsRouter.get('/', ctrlWrapper(getContactsController));

contactsRouter.get(
  "/:contactId",
  isValidId,
  ctrlWrapper(getContactByIdController)
);

contactsRouter.post(
  "/",
  validateBody(createContactValidationSchema), 
  ctrlWrapper(createContactController)
);

contactsRouter.patch(
  "/:contactId",
  isValidId,
  validateBody(updateContactValidationSchema),
  ctrlWrapper(patchContactController)
);

contactsRouter.put(
  "/:contactId",
  // checkRoles(ROLES.TEACHER),
  isValidId,
  validateBody(updateContactValidationSchema),
  ctrlWrapper(putContactController)
);

contactsRouter.delete(
  "/:contactId",
  // checkRoles(ROLES.TEACHER),
  isValidId,
  ctrlWrapper(deleteByIdController)
);

export default contactsRouter;
