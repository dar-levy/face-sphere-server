const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Profiles API",
            version: "1.0.0",
            description: "A simple Express API to manage profiles",
        },
        servers: [
            {
                url: "http://localhost:3900/api",
            },
        ],
    },
    apis: ["./routes/*.js"], // Path to the API docs
};

const specs = swaggerJsDoc(options);

module.exports = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};
