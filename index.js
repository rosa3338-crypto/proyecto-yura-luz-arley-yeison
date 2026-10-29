const express = require('express');
const app = express();
HOLA
app.use(express.json());

const rutasReservas = require('./src/routes/reservas');

app.use('/reservas', rutasReservas);

const PUERTO = process.env.PORT || 3000;

app.listen(PUERTO, () => {
  console.log(`Servidor activo en el puerto ${PUERTO}`);
});

