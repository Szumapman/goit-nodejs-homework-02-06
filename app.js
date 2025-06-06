const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const contactsRouter = require('./routes/api/contacts');
const usersRouter = require('./routes/api/users');
const jwtStrategy = require('./config/jwt');
const { PUBLIC_PATH } = require('./constants/folders');

const app = express();

app.set("view engine", "ejs");
app.use(express.static(PUBLIC_PATH));

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

jwtStrategy();

app.use('/api/contacts', contactsRouter);
app.use('/api/users', usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message })
});

module.exports = app;
