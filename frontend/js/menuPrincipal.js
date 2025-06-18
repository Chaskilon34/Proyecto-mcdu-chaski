document.addEventListener('DOMContentLoaded', () => {
  const tipo = localStorage.getItem('tipo');
  console.log("Tipo detectado:", tipo); // 👈 esto mostrará el rol en consola

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
