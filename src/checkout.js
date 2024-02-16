const PATH_API = "https://staging.adamspay.com/api/v1";
const API_KEY = "ap-174d85421e89cba68d444271";
const headers = {
  apiKey: API_KEY,
  "Content-Type": "application/json",
};

if (localStorage.getItem("loggedUser") !== null) {
  const loggedUser = localStorage.getItem("loggedUser");
  const users = localStorage.getItem("users");
  const usersParsed = JSON.parse(users);
  if (usersParsed[loggedUser].role === "admin") {
    document.getElementById("panelAdmin").classList.remove("hidden");
  }
}

function createProductHTML(
  productoId,
  nombreProducto,
  precio,
  cantidadProducto,
  imgSrc
) {
  return `
    <div id="producto-${productoId}" class="justify-start mb-6 rounded-lg bg-white p-6 shadow-md border sm:flex xl:flex sm:justify-start"> 
        <img class="rounded-full sm:w-40" src="${imgSrc}" alt="product-image">
        <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
            <div class="mt-5 sm:mt-0">
                <h2 id="nombre-producto-${productoId}" class="text-lg font-bold text-gray-900">${nombreProducto}</h2>
            </div>
            <div class="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                <div class="flex items-center border-gray-100 justify-end">
                    <button
                    class="subtractBtn cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100"
                    onclick="actualizarProducto(${productoId}, 'menos')"
                  >
                    -
                  </button>
                  <input
                    id="cantidad-producto-${productoId}"
                    class="numberInput h-7 w-7 bg-white text-center text-xs outline-none"
                    type="number"
                    min="0"
                    value="${cantidadProducto}"
                    max="10"
                    readonly
                  />
                  <button
                    class="addBtn cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-pink-300 hover:text-blue-50"
                    onclick="actualizarProducto(${productoId}, 'mas')"
                  >
                    +
                  </button>
                </div>
                <div class="flex items-center space-x-4">
                    <p id="precio-producto-${productoId}" class="text-sm">₲ ${precio} c/u</p>
                    <button onclick="sacarProducto(${productoId})">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5 cursor-pointer duration-150 hover:text-pink-300">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>`;
}

function sacarProducto(numeroId) {
  document.getElementById(`producto-${numeroId}`).remove();
  if (localStorage.length !== 0) {
    const carrito = localStorage.getItem("carrito");
    const carritoParsed = JSON.parse(carrito);
    delete carritoParsed[numeroId];
    const stringifiedCarrito = JSON.stringify(carritoParsed);
    localStorage.setItem("carrito", stringifiedCarrito);
    actualizarPrecioTotal();
    vaciarLista();
    listarItemsPrecios();
    if (localStorage.getItem("carrito") === "{}") {
      elegirContenido();
    }
  }
}

function crearTotalDeUnProducto(nombreProducto, precio, cantidadProducto) {
  const precioTotal = parseInt(precio) * parseInt(cantidadProducto);
  return `
  <div class="mb-2 flex justify-between">
    <p class="text-gray-700">${nombreProducto}</p>
    <p id="precioTotalIndividual" class="text-gray-700">
        <span class="hidden sm:inline-block lg:hidden">₲ ${precio} x ${cantidadProducto} =</span>
        ₲ ${precioTotal}
    </p>
</div>
`;
}

function listarItemsPrecios() {
  const parentElement = document.getElementById("listadoItemsSubtotal");
  if (localStorage.length !== 0) {
    const carrito = localStorage.getItem("carrito");
    const carritoParsed = JSON.parse(carrito);
    for (const productoId in carritoParsed) {
      const productoCarrito = carritoParsed[productoId];
      parentElement.innerHTML += crearTotalDeUnProducto(
        productoCarrito.nombre,
        productoCarrito.precio,
        productoCarrito.cantidadProducto
      );
    }
  }
}

function createAndAppendProducts() {
  const parentElement = document.getElementById("listadoProductos");
  if (localStorage.length !== 0) {
    const carrito = localStorage.getItem("carrito");
    const carritoParsed = JSON.parse(carrito);
    for (const productoId in carritoParsed) {
      const productoCarrito = carritoParsed[productoId];
      parentElement.innerHTML += createProductHTML(
        productoId,
        productoCarrito.nombre,
        productoCarrito.precio,
        productoCarrito.cantidadProducto,
        productoCarrito.imgSrc
      );
    }
  }
}

function actualizarPrecioTotal() {
  if (localStorage.length !== 0) {
    const carrito = localStorage.getItem("carrito");
    const carritoParsed = JSON.parse(carrito);
    let precioTotal = calcularPrecioTotal(carritoParsed);
    console.log(precioTotal);
    const precioElement = document.getElementById("precioTotal");
    console.log(precioElement);
    precioElement.innerHTML = `₲ ${precioTotal}`;
  }
}

function calcularPrecioTotal(carritoParsed) {
  let precioTotal = 0;
  for (const productoId in carritoParsed) {
    const productoCarrito = carritoParsed[productoId];
    const precioMultiplicado =
      productoCarrito.precio * productoCarrito.cantidadProducto;
    precioTotal += precioMultiplicado;
  }
  return precioTotal;
}

function agregarEventListenerConfirm() {
  const botonAgregar = document.querySelectorAll(".addBtn");
  const botonSacar = document.querySelectorAll(".subtractBtn");
  botonAgregar.forEach(function (botonAgregar, index) {
    botonAgregar.addEventListener("click", function () {
      actualizarPrecioTotal();
      vaciarLista();
      listarItemsPrecios();
    });
  });
  botonSacar.forEach(function (botonSacar, index) {
    botonSacar.addEventListener("click", function () {
      actualizarPrecioTotal();
      vaciarLista();
      listarItemsPrecios();
    });
  });
}

function vaciarLista() {
  const parentElement = document.getElementById("listadoItemsSubtotal");
  parentElement.innerHTML = "";
}

function crearDeuda() {
  const carrito = localStorage.getItem("carrito");
  const carritoParsed = JSON.parse(carrito);
  const deudaRazon = formatearRazon(carritoParsed);
  const precioTotal = calcularPrecioTotal(carritoParsed);
  console.log(deudaRazon);
  console.log(precioTotal);
  const requestBody = {
    debt: {
      amount: {
        currency: "PYG",
        value: precioTotal,
      },
      label: deudaRazon,
      validPeriod: {
        start: "2024-01-07T15:46:23+0000",
        end: "2025-12-07T15:46:23+0000",
      },
    },
  };
  const headers = {
    apiKey: API_KEY,
    "Content-Type": "application/json",
  };
  axios
    .post(`${PATH_API}/debts`, requestBody, { headers: headers })
    .then(function (response) {
      const payUrl = response.data.debt.payUrl;
      const usuarioActual = localStorage.getItem("loggedUser");
      const idDeuda = response.data.debt.docId;
      guardarEnHistorialDeudas(usuarioActual, idDeuda);
      localStorage.removeItem("carrito");
      listarItemsPrecios();
      actualizarPrecioTotal();
      const modalPago = document.getElementById("modalPago");
      document.getElementById("codigoQr").setAttribute("src", `${payUrl}/qr`);
      document
        .getElementById("botonRedireccion")
        .setAttribute("href", `${payUrl}`);
      modalPago.showModal();
    });
}

function guardarEnHistorialDeudas(usuarioActual, idDeuda) {
  if (localStorage.getItem("deudas") === null) {
    let deudas = {};
    deudas[usuarioActual] = [idDeuda];
    const deudaUsuarioStringified = JSON.stringify(deudas);
    localStorage.setItem("deudas", deudaUsuarioStringified);
  } else {
    const deudas = localStorage.getItem("deudas");
    const deudasParsed = JSON.parse(deudas);
    console.log(deudasParsed[usuarioActual]);
    if (deudasParsed[usuarioActual] !== undefined) {
      deudasParsed[usuarioActual].push(idDeuda);
    } else {
      deudasParsed[usuarioActual] = [idDeuda];
    }
    const stringifiedDeudas = JSON.stringify(deudasParsed);
    localStorage.setItem("deudas", stringifiedDeudas);
    console.log(deudasParsed);
  }
}

function formatearRazon(carritoParsed) {
  let nombreDeuda = "";

  for (const productoId in carritoParsed) {
    const item = carritoParsed[productoId];
    nombreDeuda += item.nombre + " - ";
  }
  nombreDeuda = nombreDeuda.slice(0, -3);
  return nombreDeuda;
}

function elegirContenido() {
  console.log(localStorage.getItem("carrito"));
  if (
    localStorage.getItem("carrito") === null ||
    localStorage.getItem("carrito") === "{}"
  ) {
    document.getElementById("productosCheckout").classList.add("hidden");
    document.getElementById("carritoVacioParent").classList.remove("hidden");
    document.getElementById("carritoVacio").classList.remove("hidden");
  } else {
    document.getElementById("carritoVacioParent").classList.add("hidden");
    document.getElementById("carritoVacio").classList.add("hidden");
    document.getElementById("productosCheckout").classList.remove("hidden");
    createAndAppendProducts();
    actualizarCantidades();
    agregarEventListeners();
    listarItemsPrecios();
    actualizarPrecioTotal();
    agregarEventListenerConfirm();
    if (localStorage.getItem("loggedUser") === null) {
      const checkoutBtn = document.getElementById("checkoutBtn");
      checkoutBtn.classList.add("btn-disabled");
      checkoutBtn.disabled = true;
      document.getElementById("alertCheckout").classList.remove("hidden");
    }
  }
}

function getDeudasOfUser() {
  const deudas = localStorage.getItem("deudas");
  if (deudas !== null) {
    const deudasParsed = JSON.parse(deudas);
    const usuarioActual = localStorage.getItem("loggedUser");
    if (usuarioActual in deudasParsed) {
      const deudasUsuario = deudasParsed[usuarioActual];
      if (deudasUsuario !== null) {
        for (let i in deudasUsuario) {
          console.log(deudasUsuario[i]);
          getDetallesDeuda(deudasUsuario[i]);
        }
      }
    }
  }
}

function getDetallesDeuda(deudaId) {
  axios
    .get(`${PATH_API}/debts/${deudaId}`, { headers: headers })
    .then(function (response) {
      if (response.data.debt.payStatus.status === "pending") {
        document
          .getElementById("deudasPendientesAlert")
          .classList.remove("hidden");
        const checkoutBtn = document.getElementById("checkoutBtn");
        checkoutBtn.classList.add("btn-disabled");
        checkoutBtn.disabled = true;
      }
    });
}

getDeudasOfUser();

elegirContenido();
