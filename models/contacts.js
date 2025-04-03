const fs = require('fs/promises');
const path = require('path');

const contactsFilePath = path.join(__dirname, '../models/contacts.json');

const listContacts = async () => {
  const contacts = await fs.readFile(contactsFilePath);
  return JSON.parse(contacts);
}

const getContactById = async (contactId) => {}

const removeContact = async (contactId) => {}

const addContact = async (body) => {}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
