const express = require("express");
const mongoose = require('mongoose');
const profiles = require('./routes/profiles');

const app = express();

mongoose.connect('mongodb://localhost/face-sphere')
    .then(() => console.log(`Connected to mongodb://localhost/face-sphere...`))
    .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/profiles', profiles);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));