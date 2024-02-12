function agregarProducto(numeroId) {
  const producto = document.getElementById(`producto-${numeroId}`);
  const nombreProducto = producto.querySelector(
    `#nombre-producto-${numeroId}`
  ).textContent;
  const precioTexto = producto.querySelector(
    `#precio-producto-${numeroId}`
  ).textContent;
  const precio = parseFloat(precioTexto.replace(/[^\d.]/g, "")) * 1000;
  console.log(producto);
  console.log(nombreProducto);
  console.log(precio);
}
