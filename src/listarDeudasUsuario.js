const PATH_API = "https://staging.adamspay.com/api/v1";
const API_KEY = "ap-174d85421e89cba68d444271";
const headers = {
  apiKey: API_KEY,
  "Content-Type": "application/json",
};

function getDeudasOfUser() {
  const deudas = localStorage.getItem("deudas");
  const deudasParsed = JSON.parse(deudas);
  const usuarioActual = localStorage.getItem("loggedUser");
  const deudasUsuario = deudasParsed[usuarioActual];
  for (let i in deudasUsuario) {
    console.log(deudasUsuario[i]);
    getDetallesDeuda(deudasUsuario[i]);
  }
}

function getDetallesDeuda(deudaId) {
  axios
    .get(`${PATH_API}/debts/${deudaId}`, { headers: headers })
    .then(function (response) {
      construirTablaDeudas(response.data.debt);
    });
}

function construirTablaDeudas(response) {
  console.log(response);
  const tableBody = document.getElementById("tableBody");
  const fila = document.createElement("tr");
  fila.classList.add(
    "bg-white",
    "lg:hover:bg-gray-100",
    "flex",
    "lg:table-row",
    "flex-row",
    "lg:flex-row",
    "flex-wrap",
    "lg:flex-no-wrap",
    "mb-10",
    "lg:mb-0"
  );
  fila.innerHTML = crearColumnasDeudas(response);
  tableBody.appendChild(fila);
}

function crearColumnasDeudas(response) {
  const nombre = response.label;
  const montoTotal = parseInt(response.amount.value);
  const pagado = parseInt(response.amount.paid);
  const estado = response.payStatus.status;
  const payUrl = response.payUrl;
  let classParaEstado;
  let estadoEspanhol;
  switch (estado) {
    case "paid":
      classParaEstado = "bg-green-400";
      estadoEspanhol = "Pagado";
      break;
    case "pending":
      classParaEstado = "bg-yellow-400";
      estadoEspanhol = "Pendiente";
  }
  return `
            <td
              class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static"
            >
              <span
                class="lg:hidden absolute top-0 left-0 bg-pink-200 px-2 py-1 text-xs font-bold uppercase"
                >Nombre</span
              >
              ${nombre}
            </td>
            <td
              class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static"
            >
              <span
                class="lg:hidden absolute top-0 left-0 bg-pink-200 px-2 py-1 text-xs font-bold uppercase"
                >Monto Total</span
              >
              ${montoTotal}
            </td>
            <td
              class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static"
            >
              <span
                class="lg:hidden absolute top-0 left-0 bg-pink-200 px-2 py-1 text-xs font-bold uppercase"
                >Pagado</span>
              ${pagado}
            </td>
            <td
              class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static"
            >
              <span
                class="lg:hidden absolute top-0 left-0 bg-pink-200 px-2 py-1 text-xs font-bold uppercase"
                >Estado</span
              >
                <span class="rounded ${classParaEstado} py-1 px-3 text-xs font-bold">${estadoEspanhol}</span
              >
            </td>
            <td
              class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static"
            >
              <span
                class="lg:hidden absolute top-0 left-0 bg-pink-200 px-2 py-1 text-xs font-bold uppercase"
                >Acciones</span
              >
              <a
                id="payBtn"
                type="button"
                class="mt-6 w-full rounded-md bg-pink-300 py-1.5 font-medium text-blue-50 hover:bg-pink-400"
                href="${payUrl}"
              >
                Pagar
              </button>
            </td>
          </tr>`;
}

getDeudasOfUser();
