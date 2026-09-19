document.addEventListener('DOMContentLoaded', () => {
    verificarAccesoAdmin();
    cargarUsuariosAdmin();

    const formProduct = document.getElementById('form-add-product');
    if (formProduct) {
        formProduct.addEventListener('submit', agregarProductoAdmin);
    }
});

// Proteger el acceso al panel solo a admins
function verificarAccesoAdmin() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'admin') {
        alert('Acceso no autorizado. Se requieren permisos de Administrador.');
        window.location.href = '../Página/index.html';
    }
}

// Cargar usuarios en la tabla del panel
function cargarUsuariosAdmin() {
    const lista = document.getElementById('admin-users-list');
    if (!lista) return;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    lista.innerHTML = '';

    if (users.length === 0) {
        lista.innerHTML = '<tr><td colspan="3" style="padding: 10px; text-align: center; color: #94a3b8;">No hay usuarios registrados.</td></tr>';
        return;
    }

    users.forEach((user, index) => {
        const row = document.createElement('tr');
        row.style.borderBottom = '1px solid #334155';
        row.innerHTML = `
            <td style="padding: 8px;">${user.name}</td>
            <td style="padding: 8px;">${user.email}</td>
            <td style="padding: 8px;">
                <button onclick="eliminarUsuarioAdmin(${index})" style="background: #ef4444; color: #fff; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 0.8rem;">Eliminar</button>
            </td>
        `;
        lista.appendChild(row);
    });
}

function eliminarUsuarioAdmin(index) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    if (confirm(`¿Deseas eliminar al usuario ${users[index].email}?`)) {
        users.splice(index, 1);
        localStorage.setItem('users', JSON.stringify(users));
        cargarUsuariosAdmin();
    }
}

function agregarProductoAdmin(e) {
    e.preventDefault();

    const name = document.getElementById('prod-name').value.trim();
    const price = parseInt(document.getElementById('prod-price').value);
    const img = document.getElementById('prod-img').value.trim();

    if (!name || isNaN(price) || !img) return;

    let products = JSON.parse(localStorage.getItem('custom_products')) || [];

    const newProduct = {
        id: Date.now(),
        nombre: name,
        precio: price,
        imagen: img
    };

    products.push(newProduct);
    localStorage.setItem('custom_products', JSON.stringify(products));

    alert('Producto registrado exitosamente.');
    document.getElementById('form-add-product').reset();
}