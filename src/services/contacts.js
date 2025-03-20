import express from 'express';
import Contact from '../db/models/models.js';

const router = express.Router();

// Получение всех контактов с форматированным ответом
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json({
      status: 200,
      message: "Successfully found contacts!",
      data: contacts
    });
  } catch (e) {
    console.error('Error while fetching all contacts', e);
    res.status(500).json({
      status: 500,
      message: "Internal Server Error"
    });
  }
});

// Получение контакта по ID
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({
        status: 404,
        message: "Contact not found"
      });
    }
    res.status(200).json({
      status: 200,
      message: "Contact found",
      data: contact
    });
  } catch (e) {
    console.error('Error while fetching contact by ID', e);
    res.status(500).json({
      status: 500,
      message: "Internal Server Error"
    });
  }
});

export default router;
