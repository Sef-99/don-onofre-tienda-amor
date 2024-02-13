function agregarProducto(numeroId) {
  const producto = document.getElementById(`producto-${numeroId}`);
  const nombreProducto = producto.querySelector(
    `#nombre-producto-${numeroId}`
  ).textContent;
  const precioTexto = producto.querySelector(
    `#precio-producto-${numeroId}`
  ).textContent;
  const precio = parseFloat(precioTexto.replace(/[^\d.]/g, "")) * 1000;
  const cantidadProducto = producto.querySelector(
    `#cantidad-producto-${numeroId}`
  ).value;
  const imgSrc = producto.querySelector("img").getAttribute("src");

  guardarProducto(nombreProducto, precio, cantidadProducto, numeroId, imgSrc);
  actualizarCantCarrito();

  if (cantidadProducto > 0) {
    document.getElementById("floatingAlert").classList.remove("hidden");
    setTimeout(function () {
      document.getElementById("floatingAlert").classList.add("hidden");
    }, 2500);
  }
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

actualizarCantidades();
actualizarCantCarrito();
agregarEventListeners();
