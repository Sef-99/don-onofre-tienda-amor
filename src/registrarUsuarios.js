const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function registrarUsuario(email, username, password) {
  if (esEmailValido(email)) {
    const userDetails = {
      email: email,
      password: password,
      role: "user",
    };
    const listaUsuarios = localStorage.getItem("users");
    const listaParsed = JSON.parse(listaUsuarios);
    listaParsed[username] = userDetails;
    const stringifiedUsers = JSON.stringify(listaParsed);
    localStorage.setItem("users", stringifiedUsers);
    window.location.href = "index.html?userCreated=true";
  } else {
    // mostrar error en la pagina
  }
}

function esEmailValido(email) {
  return emailRegex.test(email);
}
