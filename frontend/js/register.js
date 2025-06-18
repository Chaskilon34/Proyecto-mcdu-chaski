document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value.trim();
  const correo = document.getElementById('correo').value.trim();
  const contraseña = document.getElementById('clave').value.trim();
  const confirmar = document.getElementById('confirmarClave').value.trim();
  const tipo = 'Entusiasta'; // Forzamos el tipo

  const mensajeError = document.getElementById('mensajeError');

  if (contraseña !== confirmar) {
    mensajeError.style.display = 'block';
    return;
  } else {
    mensajeError.style.display = 'none';
  }

  try {
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, correo, contraseña, tipo }),
    });

    const data = await res.json();

    if (res.status === 201) {
      alert(data.message);
      window.location.href = 'login.html';
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error('❌ Error en el registro:', error);
    alert('Error del servidor. Intenta más tarde.');
  }
});