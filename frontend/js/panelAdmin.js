document.addEventListener('DOMContentLoaded', async () => {
  const tipo = sessionStorage.getItem('tipo');
  const nombre = sessionStorage.getItem('nombre');

  if (!tipo || tipo !== 'admin') {
    alert("Acceso denegado: Solo para administradores.");
    window.location.href = 'login.html';
    return;
  }

  const tabla = document.getElementById('tablaUsuarios');

  try {
    const res = await fetch('/api/usuarios', {
      headers: {
        'tipo': tipo
      }
    });

    if (!res.ok) {
      throw new Error('No se pudo obtener la lista de usuarios');
    }

    const usuarios = await res.json();

    usuarios.forEach(user => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${user.ID_Usuario}</td>
        <td>${user.Correo}</td>
        <td>${user.Tipo_Usuario}</td>
        <td>
          <select>
            <option value="Aspirante" ${user.Tipo_Usuario === 'Aspirante' ? 'selected' : ''}>Aspirante</option>
            <option value="Piloto" ${user.Tipo_Usuario === 'Piloto' ? 'selected' : ''}>Piloto</option>
            <option value="admin" ${user.Tipo_Usuario === 'admin' ? 'selected' : ''}>Admin</option>
          </select>
        </td>
        <td><button onclick="actualizarRol(${user.ID_Usuario}, this)">Actualizar</button></td>
      `;
      tabla.appendChild(fila);
    });

  } catch (error) {
    console.error('❌ Error al cargar usuarios:', error);
    alert("Error al cargar usuarios.");
  }
});

async function actualizarRol(idUsuario, btn) {
  const nuevoRol = btn.closest('tr').querySelector('select').value;

  try {
    const res = await fetch(`/api/usuarios/rol/${idUsuario}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'tipo': sessionStorage.getItem('tipo')
      },
      body: JSON.stringify({ nuevoRol }),
    });

    const data = await res.json();
    alert(data.message);
    location.reload();
  } catch (error) {
    console.error('❌ Error al actualizar rol:', error);
    alert("Error al actualizar el rol.");
  }
}
