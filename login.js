const formLogin = document.getElementById('formLogin');
const mensaje = document.getElementById('mensaje');

formLogin.addEventListener('submit', function(e){
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  if (!email || !password) {
    mensaje.style.color = 'red';
    mensaje.textContent = "Completa todos los campos.";
    return;
  }

  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  // Buscar usuario
  const usuario = usuarios.find(u => u.email === email && u.password === password);

  if (usuario) {
    mensaje.style.color = 'lime';
    mensaje.textContent = `Bienvenido ${usuario.nombre}!`;

    // Guardar sesión
    localStorage.setItem('sesionActiva', JSON.stringify(usuario));

    // Redirigir después de 1.5s
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1500);

  } else {
    mensaje.style.color = 'red';
    mensaje.textContent = "Email o contraseña incorrectos.";
  }
});
