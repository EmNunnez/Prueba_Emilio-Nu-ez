const COSTO_ENVIO = 3990;

document.addEventListener('DOMContentLoaded', () => {
    cargarCarrito();
});

function obtenerCarrito() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function guardarCarrito(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    cargarCarrito();
    if (typeof actualizarContadorCarrito === 'function') {
        actualizarContadorCarrito();
    }
}

// Dibuja los productos y calcula importes
function cargarCarrito() {
    const cart = obtenerCarrito();
    const contenedor = document.getElementById('lista-carrito');
    const subtotalEl = document.getElementById('cart-subtotal');
    const totalEl = document.getElementById('cart-total');
    const shippingEl = document.getElementById('cart-shipping');

    if (typeof actualizarContadorCarrito === 'function') {
        actualizarContadorCarrito();
    }

    if (!contenedor) return;

    // Si el carrito está vacío o recién vaciado/pagado
    if (cart.length === 0) {
        contenedor.innerHTML = '<p style="color: #94a3b8; text-align: center; padding: 20px;">Tu carrito está vacío.</p>';
        if (subtotalEl) subtotalEl.textContent = '$0';
        if (shippingEl) shippingEl.textContent = '$0';
        if (totalEl) totalEl.textContent = '$0';
        return;
    }

    let subtotal = 0;
    contenedor.innerHTML = '';

    cart.forEach((producto, index) => {
        const itemSubtotal = producto.precio * producto.cantidad;
        subtotal += itemSubtotal;

        const item = document.createElement('div');
        item.style.cssText = 'display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #334155; padding-bottom: 12px; gap: 15px;';
        
        const imagenSrc = producto.imagen && producto.imagen !== '' ? producto.imagen : 'https://via.placeholder.com/60';

        item.innerHTML = `
            <img src="${imagenSrc}" alt="${producto.nombre}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px; border: 1px solid #334155;">
            
            <div style="flex: 2;">
                <h4 style="color: #f8fafc; margin: 0 0 4px 0; font-size: 0.95rem;">${producto.nombre}</h4>
                <span style="color: #38bdf8; font-weight: bold; font-size: 0.9rem;">$${producto.precio.toLocaleString('es-CL')} c/u</span>
            </div>

            <div style="display: flex; align-items: center; gap: 8px;">
                <button onclick="cambiarCantidad(${index}, -1)" style="background: #334155; color: #fff; border: none; width: 24px; height: 24px; border-radius: 4px; cursor: pointer; font-weight: bold;">-</button>
                <span style="color: #fff; font-weight: bold; min-width: 18px; text-align: center;">${producto.cantidad}</span>
                <button onclick="cambiarCantidad(${index}, 1)" style="background: #334155; color: #fff; border: none; width: 24px; height: 24px; border-radius: 4px; cursor: pointer; font-weight: bold;">+</button>
            </div>

            <div style="text-align: right; min-width: 80px;">
                <span style="color: #f8fafc; font-weight: bold; display: block; font-size: 0.95rem;">$${itemSubtotal.toLocaleString('es-CL')}</span>
                <button onclick="eliminarProducto(${index})" style="background: none; border: none; color: #ef4444; font-size: 0.8rem; cursor: pointer; padding: 0;">Eliminar</button>
            </div>
        `;
        contenedor.appendChild(item);
    });

    const costoEnvioActual = subtotal > 0 ? COSTO_ENVIO : 0;
    const totalPagar = subtotal + costoEnvioActual;

    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toLocaleString('es-CL')}`;
    if (shippingEl) shippingEl.textContent = costoEnvioActual > 0 ? `$${costoEnvioActual.toLocaleString('es-CL')}` : '$0';
    if (totalEl) totalEl.textContent = `$${totalPagar.toLocaleString('es-CL')}`;
}

function cambiarCantidad(index, cambio) {
    let cart = obtenerCarrito();
    cart[index].cantidad += cambio;

    if (cart[index].cantidad <= 0) {
        cart.splice(index, 1);
    }

    guardarCarrito(cart);
}

function eliminarProducto(index) {
    let cart = obtenerCarrito();
    cart.splice(index, 1);
    guardarCarrito(cart);
}

// Botón Vaciar Carrito: Borra todo y vuelve el contador a 0
function vaciarCarrito() {
    const cart = obtenerCarrito();
    if (cart.length === 0) return;

    if (confirm('¿Estás seguro de que deseas vaciar el carrito?')) {
        localStorage.removeItem('cart');
        cargarCarrito();
    }
}

// Procesar Pago: Completa la compra, borra el carrito y deja el contador en 0
function procesarPago() {
    const cart = obtenerCarrito();
    if (cart.length === 0) {
        alert('Tu carrito está vacío. Agrega productos antes de realizar la compra.');
        return;
    }

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        alert('Debes iniciar sesión para completar tu pedido.');
        window.location.href = '../Usuario/login.html';
        return;
    }

    const address = document.getElementById('ship-address').value.trim();
    const city = document.getElementById('ship-city').value.trim();
    const phone = document.getElementById('ship-phone').value.trim();

    if (!address || !city || !phone) {
        alert('Por favor, completa los datos de despacho.');
        return;
    }

    const subtotal = cart.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    const totalPagar = subtotal + COSTO_ENVIO;

    alert(`¡Compra realizada con éxito!\n\nCliente: ${currentUser.name}\nTotal: $${totalPagar.toLocaleString('es-CL')}`);

    // Limpieza total y retorno a 0
    localStorage.removeItem('cart');
    actualizarContadorCarrito();
    window.location.href = 'index.html';
}