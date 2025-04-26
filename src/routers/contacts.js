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

export const contactsRouter = Router();

contactsRouter.use(authenticate);

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
  isValidId,
  validateBody(updateContactValidationSchema),
  ctrlWrapper(putContactController)
);

contactsRouter.delete(
  "/:contactId",
  isValidId,
  ctrlWrapper(deleteByIdController)
);

export default contactsRouter;
