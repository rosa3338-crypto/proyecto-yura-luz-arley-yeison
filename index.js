const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// ESTO ES CLAVE: Sirve la página web desde la carpeta "public"
app.use(express.static('public'));

// Conectar tus rutas respetando tu estructura (src/routes)
const rutasEspacios = require('./src/routes/espacios');
const rutasReservas = require('./src/routes/reservas');

app.use('/espacios', rutasEspacios);
app.use('/reservas', rutasReservas);

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Servidor corriendo en el puerto ' + PORT);
});

