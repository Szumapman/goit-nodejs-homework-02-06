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

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts[index] = { ...contacts[index], ...body };
  await fs.writeFile(contactsFilePath, JSON.stringify(contacts, null, 2));
  return contacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
