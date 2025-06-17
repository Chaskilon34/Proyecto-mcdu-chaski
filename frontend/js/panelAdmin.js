document.addEventListener('DOMContentLoaded', async () => {
  const tabla = document.getElementById('tablaUsuarios');

  const res = await fetch('/api/usuarios', {
    headers: {
      'tipo': localStorage.getItem('tipo')
    }
  });

  const usuarios = await res.json();

  usuarios.forEach(user => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${user.ID_Usuario}</td>
      <td>${user.Correo}</td>
      <td>${user.Tipo_Usuario}</td>
      <td>
        <select>
          <option value="Aspirante">Aspirante</option>
          <option value="Piloto">Piloto</option>
          <option value="admin">Admin</option>
        </select>
      </td>
      <td><button onclick="actualizarRol(${user.ID_Usuario}, this)">Actualizar</button></td>
    `;
    tabla.appendChild(fila);
  });
});

async function actualizarRol(idUsuario, btn) {
  const nuevoRol = btn.closest('tr').querySelector('select').value;

  const res = await fetch(`/api/usuarios/rol/${idUsuario}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'tipo': localStorage.getItem('tipo')
    },
    body: JSON.stringify({ nuevoRol }),
  });

  const data = await res.json();
  alert(data.message);
  location.reload();
}
