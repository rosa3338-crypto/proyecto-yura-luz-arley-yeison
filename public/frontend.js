const formEspacio = document.getElementById('form-espacio');
const listaEspaciosDiv = document.getElementById('lista-espacios');
const selectEspacioReserva = document.getElementById('res-espacio');
const formReserva = document.getElementById('form-reserva');
const listaReservasDiv = document.getElementById('lista-reservas');

// ================= ESPACIOS =================
async function cargarEspacios() {
  const res = await fetch('/espacios');
  const espacios = await res.json();
  
  listaEspaciosDiv.innerHTML = '';
  selectEspacioReserva.innerHTML = '<option value="">Seleccione un espacio...</option>';

  espacios.forEach(esp => {
    listaEspaciosDiv.innerHTML += `
      <div class="item-lista">
        <strong>${esp.nombre}</strong> - ${esp.ubicacion} (Capacidad: ${esp.capacidad})
        <button class="btn-eliminar" onclick="eliminarEspacio(${esp.id})">Eliminar</button>
      </div>`;
    selectEspacioReserva.innerHTML += `<option value="${esp.id}">${esp.nombre}</option>`;
  });
}

formEspacio.addEventListener('submit', async (e) => {
  e.preventDefault();
  const res = await fetch('/espacios', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nombre: document.getElementById('esp-nombre').value,
      ubicacion: document.getElementById('esp-ubicacion').value,
      capacidad: parseInt(document.getElementById('esp-capacidad').value)
    })
  });
  if (res.ok) { formEspacio.reset(); cargarEspacios(); }
  else { alert('Error: ' + (await res.json()).error); }
});

async function eliminarEspacio(id) {
  const res = await fetch(`/espacios/${id}`, { method: 'DELETE' });
  if (res.ok || res.status === 204) cargarEspacios();
  else alert('Error: ' + (await res.json()).error);
}

// ================= RESERVAS =================
async function cargarReservas() {
  const res = await fetch('/reservas');
  const reservas = await res.json();
  listaReservasDiv.innerHTML = '';

  reservas.forEach(r => {
    const estadoColor = r.estado === 'activa' ? 'green' : 'red';
    listaReservasDiv.innerHTML += `
      <div class="item-lista">
        <strong>Día:</strong> ${r.fecha} (${r.horaInicio} a ${r.horaFin})<br>
        <strong>Solicitante:</strong> ${r.solicitante}<br>
        <strong>Estado:</strong> <span style="color:${estadoColor}">${r.estado}</span>
        ${r.estado === 'activa' ? `<button class="btn-eliminar" onclick="cancelarReserva(${r.id})">Cancelar</button>` : ''}
      </div>`;
  });
}

formReserva.addEventListener('submit', async (e) => {
  e.preventDefault();
  const res = await fetch('/reservas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      espacio: document.getElementById('res-espacio').value,
      solicitante: document.getElementById('res-solicitante').value,
      fecha: document.getElementById('res-fecha').value,
      horaInicio: document.getElementById('res-inicio').value,
      horaFin: document.getElementById('res-fin').value
    })
  });
  if (res.ok) { formReserva.reset(); cargarReservas(); }
  else { alert('Error: ' + (await res.json()).error); }
});

async function cancelarReserva(id) {
  const res = await fetch(`/reservas/${id}`, { method: 'DELETE' });
  if (res.ok) cargarReservas();
}

// Inicializar la carga de datos al abrir la página
cargarEspacios();
cargarReservas();
