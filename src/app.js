function agregarProducto(numeroId) {
  const producto = document.getElementById(`producto-${numeroId}`);
  const nombreProducto = producto.querySelector(
    `#nombre-producto-${numeroId}`
  ).textContent;
  const precioTexto = producto.querySelector(
    `#precio-producto-${numeroId}`
  ).textContent;
  const precio = parseFloat(precioTexto.replace(/[^\d.]/g, "")) * 1000;

  if (localStorage.getItem(nombreProducto) === null) {
    localStorage.setItem(nombreProducto, precio);
  }

  cambiarBoton(producto, numeroId, "eliminar");
  actualizarCantCarrito();
  document.getElementById("floatingAlert").classList.remove("hidden");
  setTimeout(function () {
    document.getElementById("floatingAlert").classList.add("hidden");
  }, 2500);
}

function eliminarProducto(numeroId) {
  const producto = document.getElementById(`producto-${numeroId}`);
  const nombreProducto = producto.querySelector(
    `#nombre-producto-${numeroId}`
  ).textContent;
  localStorage.removeItem(nombreProducto);

  cambiarBoton(producto, numeroId, "agregar");
  actualizarCantCarrito();
}

function cambiarBoton(producto, numeroId, accion) {
  const botonAReemplazar = producto.querySelector("button");
  const botonNuevo = document.createElement("button");
  botonNuevo.setAttribute("onclick", `${accion}Producto(${numeroId})`);
  const icono = document.createElement("i");
  icono.className = cambiarIcono(accion);
  botonNuevo.appendChild(icono);
  botonAReemplazar.parentNode.replaceChild(botonNuevo, botonAReemplazar);
}

function cambiarIcono(accion) {
  const iconoMas = "fa-solid fa-plus fa-lg";
  const iconoMenos = "fa-solid fa-minus fa-lg";
  switch (accion) {
    case "eliminar":
      return iconoMenos;
    case "agregar":
      return iconoMas;
  }
}

function actualizarIconos() {
  let localStorageItems = guardarLocStorObjeto();
  for (let i = 1; i < 10; i++) {
    const producto = document.getElementById(`producto-${i}`);
    const nombreProducto = producto.querySelector(
      `#nombre-producto-${i}`
    ).textContent;
    if (nombreProducto in localStorageItems) {
      cambiarBoton(producto, i, "eliminar");
    }
  }
}

function guardarLocStorObjeto() {
  let localStorageItems = {};
  for (let i = 0; i < localStorage.length; i++) {
    const item = localStorage.key(i);
    const precio = localStorage.getItem(item);
    localStorageItems[item] = precio;
  }
  return localStorageItems;
}

function actualizarCantCarrito() {
  const cantCarritoElement = document.getElementById("carritoCantidad");
  cantCarritoElement.innerHTML = localStorage.length++;
}

actualizarIconos();
actualizarCantCarrito();
