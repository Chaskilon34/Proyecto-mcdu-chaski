
// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', async () => {
  // Obtiene el tipo y nombre de usuario desde sessionStorage
  const tipo = sessionStorage.getItem('tipo');
  const nombre = sessionStorage.getItem('nombre');

  // Solo permite acceso a administradores
  if (!tipo || tipo !== 'admin') {
    alert("Acceso denegado: Solo para administradores.");
    window.location.href = 'login.html';
    return;
  }

  // Referencia al cuerpo de la tabla donde se mostrarán los usuarios
  const tabla = document.getElementById('tablaUsuarios');

  try {
    // Solicita la lista de usuarios al backend (ruta protegida para admins)
    const res = await fetch('/api/admin/usuarios', {
      headers: {
        'tipo': tipo // Header para el middleware de autenticación
      }
    });

    if (!res.ok) {
      throw new Error('No se pudo obtener la lista de usuarios');
    }

    // Convierte la respuesta a JSON (array de usuarios)
    const usuarios = await res.json();

    // Por cada usuario, crea una fila en la tabla
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
        <td>
          <button onclick="actualizarRol(${user.ID_Usuario}, this)">Actualizar</button>
          <button onclick="eliminarUsuario(${user.ID_Usuario}, '${user.Correo}')">Eliminar</button>
        </td>
      `;
      tabla.appendChild(fila);
    });

  } catch (error) {
    console.error('❌ Error al cargar usuarios:', error);
    alert("Error al cargar usuarios.");
  }
});

/**
 * Actualiza el rol de un usuario.
 * @param {number} idUsuario - ID del usuario a actualizar.
 * @param {HTMLElement} btn - Botón que disparó la acción, para obtener el valor del select.
 */
async function actualizarRol(idUsuario, btn) {
  // Obtiene el nuevo rol seleccionado en el <select> de la misma fila
  const nuevoRol = btn.closest('tr').querySelector('select').value;

  try {
    // Realiza la petición al backend para actualizar el rol
    const res = await fetch(`/api/admin/usuarios/rol/${idUsuario}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'tipo': sessionStorage.getItem('tipo')
      },
      body: JSON.stringify({ nuevoRol }),
    });

    const data = await res.json();
    alert(data.message);
    location.reload(); // Recarga la página para actualizar la tabla
  } catch (error) {
    console.error('❌ Error al actualizar rol:', error);
    alert("Error al actualizar el rol.");
  }
}


async function eliminarUsuario(idUsuario, correo) {
  // Confirma la acción con el administrador
  if (!confirm(`¿Eliminar al usuario ${correo}? Esta acción es irreversible.`)) return;
  try {
    // Realiza la petición DELETE al backend
    const res = await fetch(`/api/admin/usuarios/${idUsuario}`, {
      method: 'DELETE',
      headers: {
        'tipo': sessionStorage.getItem('tipo')
      }
    });
    const data = await res.json();
    if (res.ok) {
      alert(data.message); // Muestra mensaje de éxito
      location.reload();   // Recarga la tabla
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    alert("Error al eliminar usuario: " + error.message);
  }
}

// Soluciona el problema de acceso usando el botón atrás/adelante del navegador
window.addEventListener('pageshow', () => {
  const tipo = sessionStorage.getItem('tipo');
  const nombre = sessionStorage.getItem('nombre');

  if (!tipo || tipo !== 'admin') {
    console.warn("🔒 Acceso inválido desde historial. Redirigiendo...");
    window.location.href = 'login.html';
  }
});

