const { nanoid } = require('nanoid');
const contacts = require('../services/schemas/contacts');


const listContacts = async (page = 1, limit = 20, filter) => {
  return await contacts.find(filter).skip((page - 1) * limit).limit(limit);
}

const getContactById = async (contactId) => {
  return await contacts.findById(contactId);
}

const removeContact = async (contactId) => {
  return await contacts.findByIdAndDelete(contactId);
}

const addContact = async ({ name, email, phone, owner }) => {
  return await contacts.create({ name, email, phone, owner });
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
