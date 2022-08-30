const listaProductos = document.querySelector('#lista-productos');
const carritoHTML = document.querySelector('#lista-carrito tbody');
const btnVaciarCarrito = document.querySelector('#vaciar-carrito');

/* Variables */
let carrito = [];

/* Listeners */
listaProductos.addEventListener('click', agregarProducto);
carritoHTML.addEventListener('click', borrarProducto);
btnVaciarCarrito.addEventListener('click', vaciarCarrito);

document.addEventListener('DOMContentLoaded', () => {
	carrito = JSON.parse(localStorage.getItem('carrito')) || [];

	actualizarCarritoHTML();
})

function vaciarCarrito() {
	carrito = [];

	actualizarCarritoHTML();
	actualizarStorage();
}

function borrarProducto(e) {
	e.preventDefault();
	if (e.target.classList.contains('borrar-producto')) {
		const id = e.target.getAttribute('data-id');

		
		carrito = carrito.filter(producto => producto.id !== id);


		actualizarCarritoHTML();
		actualizarStorage();
	}
}

function agregarProducto(e) {
	e.preventDefault();

	
	if (e.target.classList.contains('agregar-carrito')) {
		
		const cardProducto = e.target.parentElement.parentElement;

		
		obtenerDatosProducto(cardProducto);
	}
}

function obtenerDatosProducto(card) {

	const producto = {
		nombre: card.querySelector('h4').textContent,
		precio: card.querySelector('.precio span').textContent,
		imagen: card.querySelector('img').getAttribute('src'),
		cantidad: 1,
		id: card.querySelector('a').dataset.id
	}

	
	const prodExistente = carrito.find(prod => prod.id === producto.id);

	if (prodExistente) {
		
		const productos = carrito.map(producto => {
			if (producto.id === prodExistente.id) {
				producto.cantidad++;
				return producto;
			} else {
				return producto;
			}
		});

		carrito = [...productos];
	} else {
		
		carrito.push(producto);
		
	}

	
	actualizarCarritoHTML();

	
	actualizarStorage();
}

function actualizarCarritoHTML() {

	carritoHTML.innerHTML = '';

	carrito.forEach(producto => {
		
		const { nombre, precio, imagen, cantidad, id } = producto;

		
		const row = document.createElement('tr');
		row.innerHTML = `
			<td>
				<img src="${imagen}">
			</td>
			<td>
				${nombre}
			</td>
			<td>
				${precio}
			</td>
			<td>
				${cantidad}
			</td>
			<td>
				<a href="#" class="borrar-producto" data-id="${id}">X</a>
			</td>
		`
		carritoHTML.appendChild(row);
	});
}



/** google_map js **/

function myMap() {
    var mapProp = {
        center: new google.maps.LatLng(40.712775, -74.005973),
        zoom: 18,
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
}