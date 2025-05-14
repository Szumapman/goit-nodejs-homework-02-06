const mongoose = require('mongoose');
const { PUBLIC_PATH, PUBLIC_AVATARS_PATH, TEMP_AVATARS_PATH } = require('./constants/folders');
const { setupFolder } = require('./utils/folders');
const app = require('./app');
require('dotenv').config();

const setupFolders = async () => {
  await setupFolder(PUBLIC_PATH);
  await setupFolder(PUBLIC_AVATARS_PATH);
  await setupFolder(TEMP_AVATARS_PATH);
  console.log('Folders for app setup successfully');
};
setupFolders();

const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT || 3000;

mongoose.connect(DB_HOST).then((db) => {
  console.log("Database connection successfully");
  app.listen(DB_PORT, () => {
    console.log(`Server running. Use our API on port: ${DB_PORT}`);
  })
}).catch(error => {
  console.error("Database connection error: ", error.message);
  process.exit(1);
})
