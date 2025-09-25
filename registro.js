// Obtener elementos
const form = document.getElementById('formRegistro');
const listaUsuarios = document.getElementById('listaUsuarios');
const mensaje = document.getElementById('mensaje');

// Función para mostrar usuarios
function mostrarUsuarios() {
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  listaUsuarios.innerHTML = '';
  usuarios.forEach(usuario => {
    const li = document.createElement('li');
    li.textContent = `${usuario.nombre} - ${usuario.email}`;
    listaUsuarios.appendChild(li);
  });
}

// Manejo del formulario
form.addEventListener('submit', function(e){
  e.preventDefault();

  const nombre = document.getElementById('nombre').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  if (!nombre || !email || !password) {
    mensaje.style.color = 'red';
    mensaje.textContent = "Completa todos los campos.";
    return;
  }

  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  // Verificar si el usuario ya existe
  const existe = usuarios.some(u => u.email === email);
  if (existe) {
    mensaje.style.color = 'red';
    mensaje.textContent = "Este email ya está registrado.";
    return;
  }

  // Crear objeto usuario
  const nuevoUsuario = { nombre, email, password };
  usuarios.push(nuevoUsuario);

  // Guardar en localStorage
  localStorage.setItem('usuarios', JSON.stringify(usuarios));

  mensaje.style.color = 'lime';
  mensaje.textContent = "Usuario registrado correctamente.";

  // Limpiar formulario
  form.reset();

  // Actualizar lista de usuarios
  mostrarUsuarios();
});

// Mostrar usuarios al cargar la página
mostrarUsuarios();
