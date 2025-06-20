document.addEventListener('DOMContentLoaded', () => {
  const tipo = sessionStorage.getItem('tipo');
  const nombre = sessionStorage.getItem('nombre');
  const correo = sessionStorage.getItem('correo') || 'No disponible';

  if (!tipo || !nombre) {
    alert("Debes iniciar sesión.");
    window.location.href = 'login.html';
    return;
  }

  console.log("Tipo detectado:", tipo);

  if (tipo === 'admin') {
    const nav = document.querySelector('nav ul');
    if (nav) {
      const adminBtn = document.createElement('li');
      adminBtn.innerHTML = '<a href="panelAdmin.html">Panel de Admin</a>';
      nav.appendChild(adminBtn);
    }
  }

  // Llenar menú desplegable con datos
  document.getElementById('userNombre').textContent = nombre || 'Usuario';
  document.getElementById('userCorreo').textContent = correo;
});

// ✅ Manejo del historial y funcionalidad del menú desplegable

window.addEventListener('pageshow', (event) => {
  if (event.persisted || window.performance?.navigation.type === 2) {
    window.location.reload();
  }

  const dropdownBtn = document.getElementById('dropdownBtn');
  const userDropdown = document.getElementById('userDropdown');

  if (dropdownBtn && userDropdown) {
    dropdownBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      userDropdown.classList.toggle('show');
    });

    window.addEventListener('click', function () {
      userDropdown.classList.remove('show');
    });
  }

  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      sessionStorage.clear();
      window.location.href = 'login.html';
    });
  }
});
