function createProductHTML(
  productoId,
  nombreProducto,
  precio,
  cantidadProducto,
  imgSrc
) {
  return `
    <div id="producto-${productoId}" class="justify-start mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
        <img src="${imgSrc}" alt="product-image" class="w-full rounded-full sm:w-40">
        <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
            <div class="mt-5 sm:mt-0">
                <h2 id="nombre-producto-${productoId}" class="text-lg font-bold text-gray-900">${nombreProducto}</h2>
            </div>
            <div class="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                <div class="flex items-center border-gray-100">
                    <span class="subtractBtn cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-pink-300 hover:text-blue-50">-</span>
                    <input id="cantidad-producto-${productoId}" class="numberInput h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value="${cantidadProducto}" min="1">
                    <span class="addBtn cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-pink-300 hover:text-blue-50">+</span>
                    <button class="pl-1 checkButton" onclick="actualizarProducto(${productoId})">
                      <i class="fa-solid fa-check fa-lg"></i>
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
  document.getElementById(`producto-${numeroId}`).outerHTML = "";
  if (localStorage.length !== 0) {
    const carrito = localStorage.getItem("carrito");
    const carritoParsed = JSON.parse(carrito);
    delete carritoParsed[numeroId];
    const stringifiedCarrito = JSON.stringify(carritoParsed);
    localStorage.setItem("carrito", stringifiedCarrito);
    actualizarPrecioTotal();
    vaciarLista();
    listarItemsPrecios();
  }
}

function crearTotalDeUnProducto(nombreProducto, precio, cantidadProducto) {
  const precioTotal = parseInt(precio) * parseInt(cantidadProducto);
  return `
  <div class="mb-2 flex justify-between">
              <p class="text-gray-700">${nombreProducto}</p>
              <p id="precioTotalIndividual" class="text-gray-700">₲ ${precio} x ${cantidadProducto} = ₲ ${precioTotal}</p>
            </div>`;
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
    let precioTotal = 0;
    for (const productoId in carritoParsed) {
      const productoCarrito = carritoParsed[productoId];
      const precioMultiplicado =
        productoCarrito.precio * productoCarrito.cantidadProducto;
      precioTotal += precioMultiplicado;
    }
    console.log(precioTotal);
    const precioElement = document.getElementById("precioTotal");
    console.log(precioElement);
    precioElement.innerHTML = `₲ ${precioTotal}`;
  }
}

function agregarEventListenerConfirm() {
  const botonCheck = document.querySelectorAll(".checkButton");
  botonCheck.forEach(function (botonCheck, index) {
    botonCheck.addEventListener("click", function () {
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

createAndAppendProducts();
agregarEventListeners();
listarItemsPrecios();
actualizarPrecioTotal();
agregarEventListenerConfirm();
