import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const isValidId = 
  (name = 'id') => 
  (req, res, next) => {
    if (!isValidObjectId(req.params[name])) {
      next(createHttpError(400, `${name} is not a valid id`));
    }
  // if (!mongoose.Types.ObjectId.isValid(contactId)) {
  //   return next(createHttpError(400, `${contactId} is not a valid id`));
  // }

  next();
};
