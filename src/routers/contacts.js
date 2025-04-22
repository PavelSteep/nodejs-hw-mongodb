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

// contactsRouter.use("contactId", isValidId("contactId"));

contactsRouter.get('/', checkRoles(ROLES.TEACHER), ctrlWrapper(getContactsController));

contactsRouter.get(
  "/:contactId",
  checkRoles(ROLES.TEACHER, ROLES.PARENT),
  isValidId,
  ctrlWrapper(getContactByIdController)
);

contactsRouter.post(
  "/",
  checkRoles(ROLES.TEACHER),
  validateBody(createContactValidationSchema), 
  ctrlWrapper(createContactController)
);

contactsRouter.patch(
  "/:contactId",
  checkRoles(ROLES.TEACHER, ROLES.PARENT),
  isValidId,
  validateBody(updateContactValidationSchema),
  ctrlWrapper(patchContactController)
);

contactsRouter.put(
  "/:contactId",
  checkRoles(ROLES.TEACHER),
  isValidId,
  validateBody(updateContactValidationSchema),
  ctrlWrapper(putContactController)
);

contactsRouter.delete(
  "/:contactId",
  checkRoles(ROLES.TEACHER),
  isValidId,
  ctrlWrapper(deleteByIdController)
);

contactsRouter.use(authenticate);

contactsRouter.get('/', ctrlWrapper(getContactsController));

export default contactsRouter;
