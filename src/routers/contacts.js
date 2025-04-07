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

const contactsRouter = Router();

contactsRouter.get("/", ctrWrapper(getContactsController));

contactsRouter.get("/:contactId", ctrWrapper(getContactByIdController));

contactsRouter.post("/", ctrWrapper(createContactController));

contactsRouter.patch("/:contactId", ctrWrapper(patchContactController));

contactsRouter.put("/:contactId", ctrWrapper(putContactController));

contactsRouter.delete("/:contactId", ctrWrapper(deleteByIdController));

export default contactsRouter;
