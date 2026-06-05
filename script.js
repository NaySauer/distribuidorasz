let carrito = [];

//FUNCION RENDER
function renderProductos(){

    const contenedor = document.getElementById("contenedor-productos");

    contenedor.innerHTML = "";

    // CATEGORIAS SIN REPETIR
    const categorias = [...new Set(productos.map(
        producto => producto.categoria
    ))];

    categorias.forEach(categoria => {

        contenedor.innerHTML += `
        
            <h2 class="titulo-seccion mt-5">
                ${categoria}
            </h2>

            <div class="row g-4" id="${categoria}">
            </div>
        
        `;

        const fila = document.getElementById(categoria);

        const productosFiltrados = productos.filter(
            producto => producto.categoria === categoria
        );

        productosFiltrados.forEach(producto => {

            fila.innerHTML += `
            
            <div class="col-md-3">

                <div class="card producto-card">

                    <img 
                        src="${producto.imagen}" 
                        class="producto-img"
                    >

                    <div class="card-body">

                        <h5>${producto.nombre}</h5>

                         ${producto.descripcion ? `
                           <p class="descripcion">
                           ${producto.descripcion}
                           </p>
                            ` : ""}

                        <h4 class="precio">
                         $${producto.precio}
                        </h4>

                        <div class="contador-container">

                            <span class="texto-agregar">
                                Agregar
                            </span>

                            <div class="contador-botones">

                                <button
                                    class="btn-cantidad"
                                    onclick="restarProducto('${producto.nombre}')">
                                    -
                                </button>

                                <span id="cantidad-${producto.nombre}">
                                    0
                                </span>

                                <button
                                    class="btn-cantidad"
                                    onclick="sumarProducto('${producto.nombre}', ${producto.precio})">
                                    +
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
            
            `;
        });

    });

}

function sumarProducto(nombre, precio){

    const productoExistente = carrito.find(
        producto => producto.nombre === nombre
    );

    if(productoExistente){

        productoExistente.cantidad++;

    }else{

        carrito.push({
            nombre,
            precio,
            cantidad: 1
        });

    }

    actualizarCarrito();
    actualizarCantidadVisual(nombre);
}

function restarProducto(nombre){

    const productoExistente = carrito.find(
        producto => producto.nombre === nombre
    );

    if(!productoExistente) return;

    productoExistente.cantidad--;

    if(productoExistente.cantidad <= 0){

        carrito = carrito.filter(
            producto => producto.nombre !== nombre
        );
    }

    actualizarCarrito();
    actualizarCantidadVisual(nombre);
}

function actualizarCantidadVisual(nombre){

    const producto = carrito.find(
        p => p.nombre === nombre
    );

    const elementoCantidad = document.getElementById(`cantidad-${nombre}`);

    if(producto){

        elementoCantidad.innerText = producto.cantidad;

    }else{

        elementoCantidad.innerText = 0;
    }
}

function actualizarCarrito(){

    const lista = document.getElementById("lista-carrito");
    const total = document.getElementById("total");
    const contador = document.getElementById("contador-carrito");

    lista.innerHTML = "";

    let totalFinal = 0;
    let cantidadTotal = 0;

    carrito.forEach(producto => {

        const subtotal = producto.precio * producto.cantidad;

        totalFinal += subtotal;

        cantidadTotal += producto.cantidad;

        lista.innerHTML += `
        
        <li class="list-group-item d-flex justify-content-between">

            <div>
                <strong>${producto.nombre}</strong>
                <br>
                x${producto.cantidad}
            </div>

            <span>$${subtotal}</span>

        </li>
        
        `;
    });

    total.innerText = totalFinal;

    contador.innerText = cantidadTotal;
}

function enviarWhatsApp(){

    let mensaje = "Hola, quiero realizar el siguiente pedido:%0A%0A";

    carrito.forEach((producto) => {

        mensaje += `- ${producto.nombre} x${producto.cantidad}%0A`;

    });

    const total = carrito.reduce(
        (acc, item) => acc + (item.precio * item.cantidad),
        0
    );

    mensaje += `%0ATotal: $${total}`;

    const telefono = "5491112345678";

    window.open(`https://wa.me/${telefono}?text=${mensaje}`, "_blank");
}

renderProductos();
