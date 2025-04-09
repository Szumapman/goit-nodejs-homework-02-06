const { nanoid } = require('nanoid');
const contacts = require('../services/schemas/contacts');


const listContacts = async () => {
  return await contacts.find();
}

const getContactById = async (contactId) => {
  return await contacts.findById(contactId);
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
