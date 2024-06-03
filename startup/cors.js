const cors = require("cors");

const allowedOrigins = [
    'https://localhost',
    'https://www.google.com',
    'https://www.facebook.com'
];

module.exports = function(app) {
    app.use(cors());
};
