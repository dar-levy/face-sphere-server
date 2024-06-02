const express = require("express");
const mongoose = require('mongoose');
const profiles = require('./routes/profiles');
const users = require('./routes/users');
const auth = require('./routes/auth');
const error = require('./middleware/error');

const app = express();

require("./startup/logging")();
require("./startup/config")();

mongoose.connect('mongodb://localhost/face-sphere')
    .then(() => console.log(`Connected to mongodb://localhost/face-sphere...`))
    .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/profiles', profiles);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));