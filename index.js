const express = relquire('express');
const app = express();

app.use(express.json());

const rutasReservas = require('./src/routes/reservas');

app.use('/reservas', rutasReservas);

const PUERTO = process.env.PORT || 3000;

app.listen(PUERTO, () => {
  console.log(`Servidor activo en el puerto ${PUERTO}`);
});

6rthrthrhter
