document.addEventListener('DOMContentLoaded', () => {
  // ✅ Validar que haya sesión activa (tipo y nombre)
  const tipo = sessionStorage.getItem('tipo');
  const nombre = sessionStorage.getItem('nombre');

  if (!tipo || !nombre) {
    alert("Debes iniciar sesión.");
    window.location.href = 'login.html';
    return;
  }

  console.log("Tipo detectado:", tipo); // Para depuración

  // ✅ Si el usuario es admin, agregar enlace al Panel Admin
  if (tipo === 'admin') {
    const nav = document.querySelector('nav ul');
    if (!nav) {
      console.warn("No se encontró <nav><ul>");
      return;
    }

    const adminBtn = document.createElement('li');
    adminBtn.innerHTML = '<a href="panelAdmin.html">Panel de Admin</a>';
    nav.appendChild(adminBtn);
  }
});
