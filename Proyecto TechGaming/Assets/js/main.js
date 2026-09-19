document.addEventListener('DOMContentLoaded', () => {
    actualizarContadorCarrito();
});

// Mantiene sincronizado el número del header asegurando que la lista no esté vacía
function actualizarContadorCarrito() {
    const cartCountEl = document.getElementById('cart-count');
    if (!cartCountEl) return;

    let cart = [];
    try {
        cart = JSON.parse(localStorage.getItem('cart')) || [];
    } catch (e) {
        cart = [];
    }

    // Si no es un arreglo válido o está vacío, forzar a 0
    if (!Array.isArray(cart) || cart.length === 0) {
        cartCountEl.textContent = '0';
        return;
    }

    // Sumar solo si los elementos tienen una cantidad válida mayor a 0
    const totalItems = cart.reduce((acc, item) => {
        const cant = Number(item.cantidad);
        return acc + (isNaN(cant) ? 0 : cant);
    }, 0);

    cartCountEl.textContent = totalItems;
}

// Función global para agregar productos de forma segura
function agregarAlCarrito(id, nombre, precio, imagen, cantidad = 1) {
    let cart = [];
    try {
        cart = JSON.parse(localStorage.getItem('cart')) || [];
    } catch (e) {
        cart = [];
    }

    if (!Array.isArray(cart)) cart = [];

    // Limpiar precio para asegurar que sea numérico
    const precioNumerico = typeof precio === 'string' 
        ? parseInt(precio.replace(/[^0-9]/g, ''), 10) 
        : Number(precio);

    const cantNumerica = Number(cantidad) || 1;

    // Buscar si el producto ya existe en el carrito
    const itemExistente = cart.find(item => item.id === id);

    if (itemExistente) {
        itemExistente.cantidad = Number(itemExistente.cantidad) + cantNumerica;
    } else {
        cart.push({
            id: id,
            nombre: nombre,
            precio: precioNumerico || 0,
            imagen: imagen || 'https://via.placeholder.com/60',
            cantidad: cantNumerica
        });
    }

    // Guardar en el almacenamiento local
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Actualizar el contador inmediatamente
    actualizarContadorCarrito();

    alert(`¡"${nombre}" se agregó al carrito!`);
}