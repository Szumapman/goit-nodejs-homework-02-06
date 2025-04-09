const mongoose = require('mongoose');
const app = require('./app');
require('dotenv').config();

const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT || 3000;

mongoose.connect(DB_HOST).then((db) => {
  console.log("Database connection successful");
  app.listen(DB_PORT, () => {
    console.log(`Server running. Use our API on port: ${DB_PORT}`);
  })
}).catch(error => {
  console.error("Database connection error: ", error.message);
  process.exit(1);
})
