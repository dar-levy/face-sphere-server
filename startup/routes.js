const express = require("express");
const profiles = require("../routes/profiles");
const users = require("../routes/users");
const auth = require("../routes/auth");
const error = require("../middleware/error");
const swaggerSetup = require("./swagger");

module.exports = function(app) {
    app.use(express.json());
    app.use('/api/profiles', profiles);
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use(error);
    swaggerSetup(app);
}