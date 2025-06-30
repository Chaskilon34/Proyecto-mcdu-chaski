document.addEventListener('DOMContentLoaded', () => {
  // Obtiene los datos del usuario desde sessionStorage
  const tipo = sessionStorage.getItem('tipo');
  const nombre = sessionStorage.getItem('nombre');
  const correo = sessionStorage.getItem('correo') || 'No disponible';

  // Si no hay sesión, redirige a login
  if (!tipo || !nombre) {
    alert("Debes iniciar sesión.");
    window.location.href = 'login.html';
    return;
  }

  // Muestra el nombre y correo en el menú desplegable
  const userNombre = document.getElementById('userNombre');
  const userCorreo = document.getElementById('userCorreo');
  if (userNombre) userNombre.textContent = nombre;
  if (userCorreo) userCorreo.textContent = correo;

  // Si el usuario es admin, agrega el botón de Panel de Admin al menú principal
  if (tipo === 'admin') {
    const nav = document.querySelector('nav ul');
    if (nav) {
      const adminBtn = document.createElement('li');
      adminBtn.innerHTML = '<a href="panelAdmin.html">Panel de Admin</a>';
      nav.appendChild(adminBtn);
    }
  }

  // --- MENÚ DESPLEGABLE DE USUARIO ---
  // Obtiene el botón de usuario y el menú desplegable
  const toggleBtn = document.getElementById('userToggle');
  const dropdown = document.getElementById('userDropdown');
  if (toggleBtn && dropdown) {
    // Al hacer clic en el botón de usuario, muestra/oculta el menú
    toggleBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      dropdown.classList.toggle('show');
    });

    // Si se hace clic fuera del menú, lo oculta
    document.addEventListener('click', function (e) {
      if (!dropdown.contains(e.target) && e.target !== toggleBtn) {
        dropdown.classList.remove('show');
      }
    });
  }

  // --- CERRAR SESIÓN ---
  // Al hacer clic en "Cerrar sesión", borra la sesión y redirige a login
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      sessionStorage.clear();
      window.location.href = 'login.html';
    });
  }
});

// Refresca la página si el usuario navega con el botón atrás/adelante
window.addEventListener('pageshow', (event) => {
  if (event.persisted || window.performance?.navigation.type === 2) {
    window.location.reload();
  }
});



