document.addEventListener('DOMContentLoaded', () => {
  const tipo = sessionStorage.getItem('tipo');
  const nombre = sessionStorage.getItem('nombre');
  const correo = sessionStorage.getItem('correo') || 'No disponible';

  if (!tipo || !nombre) {
    alert("Debes iniciar sesión.");
    window.location.href = 'login.html';
    return;
  }

  document.getElementById('userNombre').textContent = nombre;
  document.getElementById('userCorreo').textContent = correo;

  if (tipo === 'admin') {
    const nav = document.querySelector('nav ul');
    const adminBtn = document.createElement('li');
    adminBtn.innerHTML = '<a href="panelAdmin.html">Panel de Admin</a>';
    nav.appendChild(adminBtn);
  }

  const toggleBtn = document.getElementById('userToggle');
  const dropdown = document.getElementById('userDropdown');
  if (toggleBtn && dropdown) {
    toggleBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      dropdown.classList.toggle('show');
    });
  
    document.addEventListener('click', function (e) {
      if (!dropdown.contains(e.target) && e.target !== toggleBtn) {
        dropdown.classList.remove('show');
      }
    });
  } else {
    console.warn("No se encontró el botón o el menú. ¿El id='userToggle' existe en el HTML?");
  }
  

  const logoutBtn = document.getElementById('logoutBtn');
  logoutBtn.addEventListener('click', () => {
    sessionStorage.clear();
    window.location.href = 'login.html';
  });
});

// Refrescar si se navega con back/forward
window.addEventListener('pageshow', (event) => {
  if (event.persisted || window.performance?.navigation.type === 2) {
    window.location.reload();
  }
});
