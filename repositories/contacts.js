const { nanoid } = require('nanoid');
const contacts = require('../services/schemas/contacts');


const listContacts = async () => {
  return await contacts.find();
}

const getContactById = async (contactId) => {
  return await contacts.findById(contactId);
}

const removeContact = async (contactId) => {
  return await contacts.findByIdAndDelete(contactId);
}

const addContact = async ({ name, email, phone }) => {
  return await contacts.create({ name, email, phone });
}

const updateContact = async (contactId, { name, email, phone }) => {
  return await contacts.findByIdAndUpdate(contactId, { name, email, phone }, { new: true });
}

const updateStatusContact = async (contactId, { favorite }) => {
  return await contacts.findByIdAndUpdate(contactId, { favorite }, { new: true });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
}
