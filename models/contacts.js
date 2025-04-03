const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsFilePath = path.join(__dirname, '../models/contacts.json');

const listContacts = async () => {
  const contacts = await fs.readFile(contactsFilePath);
  return JSON.parse(contacts);
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === contactId);
}

const removeContact = async (contactId) => {
 const contacts = await listContacts();
 const index = contacts.findIndex((contact) => contact.id === contactId);
 if (index === -1) {
   return null;
 }
 const [removedContact] = contacts.splice(index, 1);
 await fs.writeFile(contactsFilePath, JSON.stringify(contacts, null, 2));
 return removedContact
}

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsFilePath, JSON.stringify(contacts, null, 2));
  return newContact;
}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
