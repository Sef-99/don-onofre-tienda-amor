if (localStorage.getItem("loggedUser") !== null) {
  const loginElement = document.getElementById("loginout");
  console.log(loginElement);
  loginElement.innerHTML = "Cerrar Sesión";
  loginElement.onclick = logout;
}

function logout() {
  localStorage.removeItem("loggedUser");
}

function agregarProducto(numeroId, accion) {
  actualizarProducto(numeroId, accion);
  actualizarCantCarrito();
}

function actualizarProducto(numeroId, accion) {
  const producto = document.getElementById(`producto-${numeroId}`);
  const nombreProducto = producto.querySelector(
    `#nombre-producto-${numeroId}`
  ).textContent;
  const precioTexto = producto.querySelector(
    `#precio-producto-${numeroId}`
  ).textContent;
  const precio = parseInt(precioTexto.replace(".", "").replace("₲", ""));
  let cantidadProducto = producto.querySelector(
    `#cantidad-producto-${numeroId}`
  ).value;
  const imgSrc = producto.querySelector("img").getAttribute("src");
  switch (accion) {
    case "menos":
      if (cantidadProducto > 0) {
        cantidadProducto--;
      }
      break;
    case "mas":
      if (cantidadProducto < 10) {
        cantidadProducto++;
      }
      break;
  }

  guardarProducto(nombreProducto, precio, cantidadProducto, numeroId, imgSrc);
}

function guardarProducto(
  nombreProducto,
  precio,
  cantidadProducto,
  numeroId,
  imgSrc
) {
  const productoItem = {
    nombre: nombreProducto,
    precio: precio,
    cantidadProducto: cantidadProducto,
    imgSrc: imgSrc,
  };
  if (localStorage.length === 0) {
    let productosCarrito = {};
    productosCarrito[numeroId] = productoItem;
    const stringifiedCarrito = JSON.stringify(productosCarrito);
    localStorage.setItem("carrito", stringifiedCarrito);
  } else {
    const carrito = localStorage.getItem("carrito");
    const carritoParsed = JSON.parse(carrito);
    carritoParsed[numeroId] = productoItem;
    const stringifiedCarrito = JSON.stringify(carritoParsed);
    localStorage.setItem("carrito", stringifiedCarrito);
    console.log(carritoParsed);
  }
}

function actualizarCantidades() {
  if (localStorage.length !== 0) {
    const carrito = localStorage.getItem("carrito");
    const carritoParsed = JSON.parse(carrito);
    for (const productoId in carritoParsed) {
      const productoCarrito = carritoParsed[productoId];
      const cantidadProducto = document.querySelector(
        `#cantidad-producto-${productoId}`
      );
      cantidadProducto.value = productoCarrito.cantidadProducto;
    }
  }
}

function actualizarCantCarrito() {
  const cantCarritoElement = document.getElementById("carritoCantidad");
  let cantidad = 0;
  if (localStorage.length !== 0) {
    const carrito = localStorage.getItem("carrito");
    const carritoParsed = JSON.parse(carrito);
    for (const productoId in carritoParsed) {
      const producto = carritoParsed[productoId];
      cantidad += parseInt(producto.cantidadProducto);
    }
  }
  cantCarritoElement.innerHTML = cantidad;
}

function agregarEventListeners() {
  const botonSubstraer = document.querySelectorAll(".subtractBtn");
  const botonAgregar = document.querySelectorAll(".addBtn");
  const cantidad = document.querySelectorAll(".numberInput");

  botonSubstraer.forEach(function (botonSubstraer, index) {
    botonSubstraer.addEventListener("click", function () {
      let valor = parseInt(cantidad[index].value);
      if (valor > 0) {
        cantidad[index].value--;
      }
    });
  });

  botonAgregar.forEach(function (botonAgregar, index) {
    botonAgregar.addEventListener("click", function () {
      let valor = parseInt(cantidad[index].value);
      if (valor < 10) {
        cantidad[index].value++;
      }
    });
  });
}
