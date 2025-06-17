
document.addEventListener('DOMContentLoaded', () => {
    const tipo = localStorage.getItem('tipo');
  
    if (tipo === 'admin') {
      const nav = document.querySelector('nav ul');
  
      const adminBtn = document.createElement('li');
      adminBtn.innerHTML = '<a href="panelAdmin.html">Panel de Admin</a>';
  
      nav.appendChild(adminBtn);
    }
  });
  