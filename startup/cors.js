const cors = require("cors");

const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3900',
    'https://www.google.com',
    'https://www.facebook.com'
];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
};

module.exports = function(app) {
    app.use(cors(corsOptions));
};
