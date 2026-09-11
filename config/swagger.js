const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Port de Plaisance Russell',
      version: '1.0.0',
      description:
        "API de gestion des catways et des réservations pour la capitainerie du port de plaisance Russell.",
    },
    servers: [
  { url: 'http://localhost:3000', description: 'Serveur local' },
  { url: 'https://port-plaisance-api-62wb.onrender.com', description: 'Serveur de production' },
],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: process.env.COOKIE_NAME || 'token',
        },
      },
    },
    security: [{ cookieAuth: [] }],
  },
  apis: ['./routes/*.js'],
};

module.exports = swaggerJsdoc(options);
