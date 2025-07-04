
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const correo = document.getElementById('correo').value;
  const contraseña = document.getElementById('contraseña').value;

  const res = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ correo, contraseña }),
  });

  const data = await res.json();

  if (res.status === 200) {
    sessionStorage.setItem('tipo', data.tipo);
    sessionStorage.setItem('nombre', data.nombre);
    sessionStorage.setItem('correo', data.correo);
    alert(data.message);
    window.location.href = 'menuPrincipal.html';
  } else {
    alert(data.message);
  }
});
