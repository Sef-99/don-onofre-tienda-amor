const PATH_API = "https://staging.adamspay.com/api/v1";
const API_KEY = "ap-174d85421e89cba68d444271";

actualizarCantidades();
actualizarCantCarrito();
agregarEventListeners();

const urlParams = new URLSearchParams(window.location.search);
const deudaId = urlParams.get("doc_id");

if (deudaId !== null) {
  const headers = {
    apiKey: API_KEY,
    "Content-Type": "application/json",
  };
  axios
    .get(`${PATH_API}/debts/${deudaId}`, { headers: headers })
    .then(function (response) {
      console.log(response);
      const estadoPago = response.data.debt.payStatus.status;
      const parrafoNotificacionElement = document.getElementById("infoPago");
      switch (estadoPago) {
        case "paid":
          parrafoNotificacionElement.innerHTML =
            "Su pago ha sido procesado con éxito. Gracias por su compra!";
          break;
        case "pending":
          const payUrl = response.data.debt.payUrl;
          parrafoNotificacionElement.innerHTML = `Su pago sigue pendiente. Por favor, paguelo aqui: <a href="${payUrl}" target="_blank">${payUrl}</a>`;
          break;
      }
      const modalNotificacion = document.getElementById("modalNotificacion");
      modalNotificacion.showModal();
    });
}

if (localStorage.getItem("loggedUser") !== null) {
  const loggedUser = localStorage.getItem("loggedUser");
  const users = localStorage.getItem("users");
  const usersParsed = JSON.parse(users);
  if (usersParsed[loggedUser].role === "admin") {
    document.getElementById("adminAlert").classList.remove("hidden");
  } else {
    document.getElementById("adminAlert").classList.add("hidden");
  }
} else {
  document.getElementById("adminAlert").classList.add("hidden");
}
