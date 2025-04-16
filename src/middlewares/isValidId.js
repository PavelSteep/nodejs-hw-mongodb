import mongoose from 'mongoose';

export const isValidId = (req, res, next) => {
  const contactId = req.params?.contactId;

  if (!contactId || !mongoose.Types.ObjectId.isValid(contactId)) {
    return res.status(400).json({ message: 'Invalid or missing contact ID' });
  }

  next();
};
