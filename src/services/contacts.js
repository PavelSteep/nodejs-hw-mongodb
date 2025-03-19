import express from 'express';
import { getContacts, getContactById, createContact, updateContact, deleteContact } from './contactService.js';
const router = express.Router();

// Получение всех контактов
router.get('/', async (req, res) => {
  try {
    const contacts = await getContacts();
    const cleanContacts = contacts.map(contact => {
      const { age, gender, avgMark, onDuty, ...cleanContact } = contact.toObject();
      return cleanContact;
    });
    res.status(200).json({
      status: 200,
      message: "Successfully found contacts!",
      data: cleanContacts
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
    const contact = await getContactById(req.params.id);
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

// Создание нового контакта
router.post('/', async (req, res) => {
  try {
    const contactData = req.body;
    const newContact = await createContact(contactData);
    res.status(201).json({
      status: 201,
      message: "Contact created successfully",
      data: newContact
    });
  } catch (e) {
    console.error('Error while creating contact', e);
    res.status(500).json({
      status: 500,
      message: "Internal Server Error"
    });
  }
});

// Обновление контакта по ID
router.put('/:id', async (req, res) => {
  try {
    const contactData = req.body;
    const updatedContact = await updateContact(req.params.id, contactData);
    if (!updatedContact) {
      return res.status(404).json({
        status: 404,
        message: "Contact not found"
      });
    }
    res.status(200).json({
      status: 200,
      message: "Contact updated successfully",
      data: updatedContact
    });
  } catch (e) {
    console.error('Error while updating contact', e);
    res.status(500).json({
      status: 500,
      message: "Internal Server Error"
    });
  }
});

// Удаление контакта по ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedContact = await deleteContact(req.params.id);
    if (!deletedContact) {
      return res.status(404).json({
        status: 404,
        message: "Contact not found"
      });
    }
    res.status(200).json({
      status: 200,
      message: "Contact deleted successfully",
      data: deletedContact
    });
  } catch (e) {
    console.error('Error while deleting contact', e);
    res.status(500).json({
      status: 500,
      message: "Internal Server Error"
    });
  }
});

export default router;









// import express from 'express';
// import Contact from '../db/models/models.js';

// const router = express.Router();

// // Получение всех контактов с форматированным ответом
// router.get('/', async (req, res) => {
//   try {
//     const contacts = await Contact.find();
//     res.status(200).json({
//       status: 200,
//       message: "Successfully found contacts!",
//       data: contacts
//     });
//   } catch (e) {
//     console.error('Error while fetching all contacts', e);
//     res.status(500).json({
//       status: 500,
//       message: "Internal Server Error"
//     });
//   }
// });

// // Получение контакта по ID
// router.get('/:id', async (req, res) => {
//   try {
//     const contact = await Contact.findById(req.params.id);
//     if (!contact) {
//       return res.status(404).json({
//         status: 404,
//         message: "Contact not found"
//       });
//     }
//     res.status(200).json({
//       status: 200,
//       message: "Contact found",
//       data: contact
//     });
//   } catch (e) {
//     console.error('Error while fetching contact by ID', e);
//     res.status(500).json({
//       status: 500,
//       message: "Internal Server Error"
//     });
//   }
// });

// export default router;
