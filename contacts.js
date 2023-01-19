const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const contactsPath = path.join(__dirname, "./db/contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const parseData = JSON.parse(data);
    console.table(parseData);
  } catch (err) {
    console.log(err);
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath);
    const parseData = JSON.parse(data);
    const searchedContact = parseData.find(({ id }) => id === contactId);
    if (searchedContact === undefined) {
      throw new Error("No contact with this ID");
    }
    console.table(parseData.find(({ id }) => id === contactId));
  } catch (err) {
    console.log(err.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath);
    const parseData = JSON.parse(data);
    const filterData = parseData.filter(({ id }) => id !== contactId);
    if (filterData.length === parseData.length) {
      throw new Error("No contact with this ID");
    }
    await fs.writeFile(contactsPath, JSON.stringify(filterData));
    const updatedFile = await fs.readFile(contactsPath);
    const parseUpdatedFile = JSON.parse(updatedFile);
    console.table(parseUpdatedFile);
  } catch (err) {
    console.log(err.message);
  }
};

const addContact = async (name, email, phone) => {
  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };
  try {
    const data = await fs.readFile(contactsPath);
    const parseData = JSON.parse(data);
    const newData = [...parseData, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(newData));
    const updatedFile = await fs.readFile(contactsPath);
    const parseUpdatedFile = JSON.parse(updatedFile);
    console.table(parseUpdatedFile);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
