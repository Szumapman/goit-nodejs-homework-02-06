const express = require('express')

const contactValidator  = require('../../middlewares/contactValidator')
const { listContacts, getContactById, removeContact, addContact, updateContact, updateStatusContact } = require('../../repositories/contacts')
const favoriteValidator = require('../../middlewares/favoriteValidator')

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts()
    res.status(200).json(contacts)
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (!contact) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
})

router.post('/', contactValidator, async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const contact = await addContact({ name, email, phone });
    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await removeContact(contactId);
    if (!contact) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.status(200).json({ message: 'contact deleted' });
  } catch (error) {
    next(error);
  }
})

router.put('/:contactId', contactValidator, async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { name, email, phone } = req.body;
    const contact = await updateContact(contactId, { name, email, phone });
    if (!contact) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
})

router.patch('/:contactId/favorite', favoriteValidator, async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await updateStatusContact(contactId, req.body);
    if (!contact) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
})

module.exports = router
