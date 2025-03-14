import express from 'express';
import Contact from '../db/models/models.js';

const contacts = () => {
  const router = express.Router();

  
  router.get('/', async (req, res) => {
    try {
      const contacts = await Contact.find();
      res.json({ status: 200, message: 'Successfully found contacts!', data: contacts });
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving contacts', error: error.message });
    }
  });

  router.get('/:contactId', async (req, res) => {
    try {
      const contact = await Contact.findById(req.params.contactId);
      if (!contact) {
        return res.status(404).json({ message: 'Contact not found' });
      }
      res.json({ status: 200, message: `Successfully found contact with id ${req.params.contactId}!`, data: contact });
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving contact', error: error.message });
    }
  });

  return router;
};

export default contacts;
