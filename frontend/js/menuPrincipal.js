document.addEventListener('DOMContentLoaded', () => {
  const tipo = sessionStorage.getItem('tipo');
  const nombre = sessionStorage.getItem('nombre');
  const correo = sessionStorage.getItem('correo') || 'No disponible';

  if (!tipo || !nombre) {
    alert("Debes iniciar sesión.");
    window.location.href = 'login.html';
    return;
  }

  // Mostrar datos en el menú
  document.getElementById('userNombre').textContent = nombre;
  document.getElementById('userCorreo').textContent = correo;

  // Agregar enlace admin si aplica
  if (tipo === 'admin') {
    const nav = document.querySelector('nav ul');
    if (nav) {
      const adminBtn = document.createElement('li');
      adminBtn.innerHTML = '<a href="panelAdmin.html">Panel de Admin</a>';
      nav.appendChild(adminBtn);
    }
  }

  // Menú desplegable funcional
  const dropdownBtn = document.getElementById('dropdownBtn');
  const userDropdown = document.getElementById('userDropdown');

  if (dropdownBtn && userDropdown) {
    dropdownBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      userDropdown.classList.toggle('show');
    });

    // Ocultar si se hace clic fuera del menú
    document.addEventListener('click', function (e) {
      if (!userDropdown.contains(e.target) && e.target !== dropdownBtn) {
        userDropdown.classList.remove('show');
      }
    });
  }

  // Cerrar sesión correctamente
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      sessionStorage.clear();
      window.location.href = 'login.html';
    });
  }
});

// ✅ Forzar recarga en navegación por historial (back/forward)
window.addEventListener('pageshow', (event) => {
  if (event.persisted || window.performance?.navigation.type === 2) {
    window.location.reload();
  }
});
