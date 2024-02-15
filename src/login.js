function getInfoUsuario() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  console.log({ email, password });
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
