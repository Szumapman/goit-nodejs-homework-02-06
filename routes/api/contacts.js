const express = require('express')

const contactValidator  = require('../../middlewares/validators/contactValidator')
const { listContacts, getContactById, removeContact, addContact, updateContact, updateStatusContact } = require('../../repositories/contacts')
const favoriteValidator = require('../../middlewares/validators/favoriteValidator')
const auth = require('../../middlewares/auth/auth')
const paramsValidator = require('../../middlewares/validators/paramsValidator')

const router = express.Router()

router.get('/', paramsValidator, auth, async (req, res, next) => {
  try {
    const { page = 1, limit = 20, favorite } = req.query;
    const filter = { owner: req.user._id }
    if (favorite) {
      filter.favorite = favorite;
    }
    const contacts = await listContacts(page, limit, filter);
    res.status(200).json(contacts)
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', auth, async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (!contact) {
      return res.status(404).json({ message: 'Not found' });
    }
    if (contact.owner?.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Operation forbidden' });
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
})

router.post('/', contactValidator, auth, async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const owner = req.user._id;
    const contact = await addContact({ name, email, phone, owner });
    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
})

router.delete('/:contactId', auth, async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await removeContact(contactId);
    if (!contact) {
      return res.status(404).json({ message: 'Not found' });
    }
    if (contact.owner?.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Operation forbidden' });
    }
    res.status(200).json({ message: 'contact deleted' });
  } catch (error) {
    next(error);
  }
})

router.put('/:contactId', contactValidator, auth, async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { name, email, phone } = req.body;
    const contact = await getContactById(contactId);
    if (!contact) {
      return res.status(404).json({ message: 'Not found' });
    }
    if (contact.owner?.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Operation forbidden' });
    }
    const updatedContact = await updateContact(contactId, { name, email, phone });
    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
})

router.patch('/:contactId/favorite', favoriteValidator, auth, async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (!contact) {
      return res.status(404).json({ message: 'Not found' });
    }
    if (contact.owner?.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Operation forbidden' });
    }
    const updatedContact = await updateStatusContact(contactId, req.body);
    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
})

module.exports = router
