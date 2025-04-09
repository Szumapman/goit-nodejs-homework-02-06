const mongoose = require('mongoose');
const app = require('./app');
require('dotenv').config();

mongoose.connect(process.env.DB_HOST).then((db) => {
  console.log("Database connection successful");
  app.listen(3000, () => {
    console.log("Server running. Use our API on port: 3000");
  })
}).catch(error => {
  console.error("Database connection error: ", error.message);
  process.exit(1);
})
