console.log(window.location.pathname);

if (
  localStorage.getItem("loggedUser") === null &&
  window.location.pathname !== "/login.html" &&
  window.location.pathname !== "/don-onofre-tienda-amor/index.html"
) {
  console.log(window.location);
  window.location.href = "index.html";
}

function getInfoUsuario() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  console.log({ email, password });
  logInUsuario(email, password);
}

function togglePasswordVisibility() {
  const passwordInput = document.getElementById("password");
  const eyeClosed = document.getElementById("eyeClosed");
  const eyeOpen = document.getElementById("eyeOpen");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    eyeClosed.style.display = "none";
    eyeOpen.style.display = "block";
  } else {
    passwordInput.type = "password";
    eyeClosed.style.display = "block";
    eyeOpen.style.display = "none";
  }
}

function logInUsuario(email, password) {
  const listaUsuarios = localStorage.getItem("users");
  const listaParsed = JSON.parse(listaUsuarios);
  console.log(listaParsed);
  if (email in listaParsed) {
    if (password === listaParsed[email].password) {
      console.log("xd");
      localStorage.setItem("loggedUser", email);
      window.location.href = "index.html";
    }
  } else {
  }
}
