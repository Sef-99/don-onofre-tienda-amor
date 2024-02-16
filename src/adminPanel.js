const PATH_API = "https://staging.adamspay.com/api/v1";
const API_KEY = "ap-174d85421e89cba68d444271";
const headers = {
  apiKey: API_KEY,
  "Content-Type": "application/json",
};

const loggedUser = localStorage.getItem("loggedUser");
const users = localStorage.getItem("users");
const userParsed = JSON.parse(users);
if (userParsed[loggedUser].role !== "admin") {
  window.location.href = "index.html";
}

function getDeudas() {
  axios
    .get(`${PATH_API}/debts?create_time=2024-02-16~`, { headers: headers })
    .then(function (response) {
      const deudas = response.data.debts;
      console.log(deudas);
      for (const deuda in deudas) {
        construirTablaDeudas(deudas[deuda]);
      }
    });
}

function construirTablaDeudas(deudas) {
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
  fila.innerHTML = crearColumnasDeudas(deudas);
  tableBody.appendChild(fila);
  agregarEventListener(deudas.docId, deudas.label);
}

function crearColumnasDeudas(deudas) {
  const fechaCreacion = deudas.created;
  const idDeuda = deudas.docId;
  const concepto = deudas.label;
  const estado = deudas.payStatus.status;
  const valor = parseInt(deudas.amount.value);
  let classParaEstado;
  let estadoEspanhol;
  let pagadoFecha = "";
  switch (estado) {
    case "paid":
      pagadoFecha = deudas.payStatus.time;
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
                >Creada</span
              >
              ${fechaCreacion}
            </td>
            <td
              class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static"
            >
              <span
                class="lg:hidden absolute top-0 left-0 bg-pink-200 px-2 py-1 text-xs font-bold uppercase"
                >ID</span
              >
              ${idDeuda}
            </td>
            <td
              class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static"
            >
              <span
                class="lg:hidden absolute top-0 left-0 bg-pink-200 px-2 py-1 text-xs font-bold uppercase"
                >Concepto</span>
              ${concepto}
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
                >Cobrado</span
              >
              ${pagadoFecha}
            </td>
            <td
              class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static"
            >
              <span
                class="lg:hidden absolute top-0 left-0 bg-pink-200 px-2 py-1 text-xs font-bold uppercase"
                >Valor</span
              >
              ₲ ${valor}
            </td>
            <td
              class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static"
            >
              <span
                class="lg:hidden absolute top-0 left-0 bg-pink-200 px-2 py-1 text-xs font-bold uppercase"
                >Transacciones</span
              >
              <button
                id="transaccion-${idDeuda}"
                type="button"
                class="mt-6 w-full rounded-md bg-pink-300 py-1.5 font-medium text-blue-50 hover:bg-pink-400"
              >
                Mostrar
              </button>
            </td>
          </tr>`;
}

function agregarEventListener(idDeuda, concepto) {
  let botonTrans = document.getElementById(`transaccion-${idDeuda}`);
  botonTrans.addEventListener("click", function () {
    getTransacciones(idDeuda, concepto);
  });
}

function getTransacciones(idDeuda, concepto) {
  const tableBody = document.getElementById("transaccionTableBody");
  tableBody.innerHTML = "";
  axios
    .get(`${PATH_API}/debts/${idDeuda}/tx`, { headers: headers })
    .then(function (response) {
      const transacciones = response.data.txList;
      console.log(response);
      for (const transaccion in transacciones) {
        construirTablaTransaccion(
          transacciones[transaccion],
          idDeuda,
          concepto
        );
      }
      const modalTransaccion = document.getElementById("modalTransacciones");
      document.getElementById("deudaId").innerHTML = idDeuda;
      modalTransaccion.showModal();
    });
}

function construirTablaTransaccion(transaccion, idDeuda, concepto) {
  const tableBody = document.getElementById("transaccionTableBody");
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
  fila.innerHTML = crearColumnasTrans(transaccion, idDeuda, concepto);
  tableBody.appendChild(fila);
}

function crearColumnasTrans(transaccion, idDeuda, concepto) {
  const fechaCreacion = transaccion.created;
  const idTrans = transaccion.txId;
  const conceptoTrans = `${idDeuda} ${concepto}`;
  let correlationID = transaccion.correlationId;
  const valor = parseInt(transaccion.origAmount.value);
  const estado = transaccion.objStatus.status;
  let classParaEstado;
  let estadoEspanhol;
  let pagadoFecha = "";
  if (correlationID === null) {
    correlationID = "";
  }
  switch (estado) {
    case "success":
      classParaEstado = "bg-green-400";
      estadoEspanhol = "Cobrado";
      break;
    case "error":
      classParaEstado = "bg-red-400";
      estadoEspanhol = "Error";
  }
  return `
            <td
              class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static"
            >
              <span
                class="lg:hidden absolute top-0 left-0 bg-pink-200 px-2 py-1 text-xs font-bold uppercase"
                >Creada</span
              >
              ${fechaCreacion}
            </td>
            <td
              class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static"
            >
              <span
                class="lg:hidden absolute top-0 left-0 bg-pink-200 px-2 py-1 text-xs font-bold uppercase"
                >ID</span
              >
              ${idTrans}
            </td>
            <td
              class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static"
            >
              <span
                class="lg:hidden absolute top-0 left-0 bg-pink-200 px-2 py-1 text-xs font-bold uppercase"
                >Concepto</span>
              ${conceptoTrans}
            </td>
            <td
              class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static"
            >
              <span
                class="lg:hidden absolute top-0 left-0 bg-pink-200 px-2 py-1 text-xs font-bold uppercase"
                >ID Correlacion</span>
              ${correlationID}
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
                >Monto</span
              >
              ₲ ${valor}
            </td>
          </tr>`;
}

getDeudas();
