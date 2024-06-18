const express = require('express');
const app = express();
const reservasRouter = require('./routes/reservas');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const dotenv = require('dotenv');

// Configuración de variables de entorno
dotenv.config();

// Middleware para parsear JSON
app.use(express.json());

// Ruta raíz
app.get('/', (req, res) => {
  res.send('Bienvenido a la API de Reservas de Hotel');
});

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Reservas de Hotel',
      version: '1.0.0',
      description: 'API para gestionar reservas de hotel',
      contact: {
        name: 'Tu Nombre',
        email: 'tuemail@ejemplo.com'
      }
    },
    servers: [
      {
        url: `${process.env.SERVER_URL}`
      }
    ]
  },
  apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rutas
app.use('/api/reservas', reservasRouter);

// Puerto
const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`El puerto ${PORT} está en uso. Intenta con un puerto diferente.`);
  } else {
    console.error(err);
  }
});
