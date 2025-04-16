import { Router } from "express";
import { 
  getContactsController, 
  getContactByIdController,
  createContactController,
  patchContactController,
  putContactController,
  deleteByIdController 
} from "../controllers/contacts.js";
import { ctrWrapper } from "../utils/ctrWrapper.js";
import { isValidId } from "../middlewares/isValidId.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createContactValidationSchema } from "../validation/createContactValidationSchema.js";
import { updateContactValidationSchema } from "../validation/updateContactValidationSchema.js";

const contactsRouter = Router();

// contactsRouter.use("contactId", isValidId("contactId"));

contactsRouter.get("/", ctrWrapper(getContactsController));

contactsRouter.get(
  "/:contactId",
  isValidId,
  ctrWrapper(getContactByIdController)
);

contactsRouter.post(
  "/", 
  validateBody(createContactValidationSchema), 
  ctrWrapper(createContactController)
);

contactsRouter.patch(
  "/:contactId",
  validateBody(updateContactValidationSchema),
  ctrWrapper(patchContactController)
);

contactsRouter.put(
  "/:contactId",
  isValidId,
  validateBody(updateContactValidationSchema),
  ctrWrapper(putContactController)
);

contactsRouter.delete(
  "/:contactId",
  isValidId,
  ctrWrapper(deleteByIdController)
);

export default contactsRouter;
