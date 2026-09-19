// Catálogo de Productos
const productosBase = [
    {
        id: 1,
        nombre: "Teclado Mecánico Royal Kludge RK855 (RK68)",
        categoria: "perifericos",
        precio: 49990,
        descripcion: "Teclado gamer mecánico compacto en formato 65% con 68 teclas. Cuenta con retroiluminación RGB dinámica y cable USB Tipo-C extraíble.",
        caracteristicas: ["Formato Compacto 65%", "Cable USB Tipo-C", "Retroiluminación RGB", "Switches mecánicos táctiles"],
        imagen: "https://www.gsmpro.cl/cdn/shop/files/teclado-gamer-mecanico-royal-kludge-rk-855-rgb-switch-azul-negro.png?v=1775234736"
    },
    {
        id: 2,
        nombre: "Mouse Gamer Logitech G502 HERO 25K",
        categoria: "perifericos",
        precio: 39990,
        descripcion: "Mouse ergonómico de alto rendimiento equipado con el sensor óptico HERO 25K (hasta 25.600 DPI) y 11 botones programables.",
        caracteristicas: ["Sensor HERO 25K", "11 Botones programables", "Sistema de pesas", "Iluminación RGB"],
        imagen: "https://media.falabella.com/falabellaCL/143442248_01/w=1500,h=1500,fit=cover"
    },
    {
        id: 3,
        nombre: "Monitor Gamer Dell 24\" FHD 144Hz 1ms IPS",
        categoria: "monitores",
        precio: 169990,
        descripcion: "Pantalla plana Dell de 24 pulgadas Full HD IPS. Tasa de refresco ultra fluida de 144Hz y 1ms de tiempo de respuesta con AMD FreeSync.",
        caracteristicas: ["24\" Full HD IPS", "144Hz & 1ms", "AMD FreeSync Premium", "HDMI / DisplayPort"],
        imagen: "https://http2.mlstatic.com/D_NQ_NP_630678-CBT115612335906_092026-O.webp"
    },
    {
        id: 4,
        nombre: "Monitor Curvo 27\" QHD 240Hz 1000R",
        categoria: "monitores",
        precio: 249990,
        descripcion: "Monitor gaming con pantalla curva 1000R, resolución QHD (2560 x 1440), 240Hz y 1ms de respuesta.",
        caracteristicas: ["Resolución QHD 2K", "Curvatura 1000R", "Tasa de 240Hz", "Tiempo de 1ms"],
        imagen: "https://http2.mlstatic.com/D_NQ_NP_846540-CBT112538947810_062026-O.webp"
    },
    {
        id: 5,
        nombre: "Auriculares Gamer Redragon Zeus 7.1 Surround",
        categoria: "auriculares",
        precio: 44990,
        descripcion: "Audífonos gamer con sonido envolvente virtual 7.1, altavoces de 53 mm y micrófono desmontable con cancelación de ruido.",
        caracteristicas: ["Sonido Virtual 7.1", "Drivers 53 mm", "Chasis de aluminio", "Micrófono desmontable"],
        imagen: "https://i5.walmartimages.cl/asr/a7b8a7a5-90e7-49e4-93fa-453c712f4071.ecbc2ed0ba9e2d854401eeae5e9aa5f1.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF"
    },
    {
        id: 6,
        nombre: "Auriculares Inalámbricos PlayStation Pulse Pro",
        categoria: "auriculares",
        precio: 99990,
        descripcion: "Headset inalámbrico con audio 3D posicional, latencia ultra baja y micrófono retráctil.",
        caracteristicas: ["Audio 3D inmersivo", "Conexión 2.4GHz + Bluetooth", "Cancelación por IA", "24 horas de batería"],
        imagen: "https://media.solotodo.com/media/products/2023729_picture_1741202678.webp"
    }
];

let categoriaActual = 'todos';

function renderizarProductos(productosARenderizar) {
    const grid = document.getElementById('grid-productos');
    if (!grid) return;

    if (!productosARenderizar || productosARenderizar.length === 0) {
        grid.innerHTML = '<p style="color:#94a3b8; grid-column: 1/-1; text-align:center; padding: 40px 0;">No se encontraron productos en esta categoría.</p>';
        return;
    }

    grid.innerHTML = productosARenderizar.map(prod => `
        <div style="background: #1e293b; border: 1px solid #334155; border-radius: 8px; padding: 15px; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
                <img src="${prod.imagen}" alt="${prod.nombre}" style="width: 100%; height: 180px; object-fit: cover; border-radius: 6px; margin-bottom: 15px;">
                <h3 style="color: #f8fafc; font-size: 1.1rem; margin-bottom: 8px;">${prod.nombre}</h3>
                <p style="color: #cbd5e1; font-size: 0.85rem; line-height: 1.4; margin-bottom: 12px; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">
                    ${prod.descripcion}
                </p>
                <div style="margin-bottom: 15px;">
                    <span style="color: #38bdf8; font-weight: bold; font-size: 1.3rem;">$${prod.precio.toLocaleString('es-CL')}</span>
                </div>
            </div>
            <button onclick="verDetallesProducto(${prod.id})" style="width: 100%; padding: 10px; background: #38bdf8; color: #020617; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">Ver Detalles</button>
        </div>
    `).join('');
}

function filtrarPorCategoria(cat) {
    categoriaActual = cat || 'todos';

    // Iluminar botón correspondiente comparando tanto 'data-cat' como 'data-categoria'
    const botones = document.querySelectorAll('.btn-categoria');
    botones.forEach(btn => {
        const catBtn = btn.getAttribute('data-cat') || btn.getAttribute('data-categoria');
        if (catBtn === categoriaActual) {
            btn.style.background = '#38bdf8';
            btn.style.color = '#020617';
            btn.style.borderColor = '#38bdf8';
            btn.style.fontWeight = 'bold';
        } else {
            btn.style.background = '#1e293b';
            btn.style.color = '#38bdf8';
            btn.style.borderColor = '#334155';
            btn.style.fontWeight = 'normal';
        }
    });

    if (categoriaActual === 'todos') {
        renderizarProductos(productosBase);
    } else {
        const filtrados = productosBase.filter(p => p.categoria.toLowerCase() === categoriaActual.toLowerCase());
        renderizarProductos(filtrados);
    }
}

function buscarProductos(texto) {
    const busqueda = texto.toLowerCase().trim();
    let filtrados = productosBase;

    if (categoriaActual !== 'todos') {
        filtrados = filtrados.filter(p => p.categoria.toLowerCase() === categoriaActual.toLowerCase());
    }

    if (busqueda !== '') {
        filtrados = filtrados.filter(p => 
            p.nombre.toLowerCase().includes(busqueda) || 
            p.descripcion.toLowerCase().includes(busqueda)
        );
    }

    renderizarProductos(filtrados);
}

function verDetallesProducto(idProducto) {
    const producto = productosBase.find(p => p.id === idProducto);
    if (!producto) return;

    const modalImg = document.getElementById('modal-img');
    const modalTitulo = document.getElementById('modal-titulo');
    const modalDesc = document.getElementById('modal-descripcion');
    const modalPrecio = document.getElementById('modal-precio');
    const listaSpecs = document.getElementById('modal-caracteristicas');

    if (modalImg) modalImg.src = producto.imagen;
    if (modalTitulo) modalTitulo.textContent = producto.nombre;
    if (modalDesc) modalDesc.textContent = producto.descripcion;
    if (modalPrecio) modalPrecio.textContent = `$${producto.precio.toLocaleString('es-CL')}`;

    if (listaSpecs) {
        listaSpecs.innerHTML = (producto.caracteristicas || []).map(spec => `<li style="margin-bottom: 4px; color: #cbd5e1;">${spec}</li>`).join('');
    }

    const inputCantidad = document.getElementById('modal-cantidad');
    if (inputCantidad) inputCantidad.value = 1;

    const btnAgregarModal = document.getElementById('modal-btn-agregar');
    if (btnAgregarModal) {
        btnAgregarModal.onclick = () => {
            const cantidad = parseInt(document.getElementById('modal-cantidad').value, 10) || 1;
            agregarAlCarrito(producto, cantidad);
            cerrarModal();
        };
    }

    const modal = document.getElementById('modal-detalles');
    if (modal) modal.style.display = 'flex';
}

function cambiarCantidadModal(delta) {
    const inputCantidad = document.getElementById('modal-cantidad');
    if (!inputCantidad) return;
    let val = parseInt(inputCantidad.value, 10) || 1;
    val += delta;
    if (val < 1) val = 1;
    inputCantidad.value = val;
}

function cerrarModal() {
    const modal = document.getElementById('modal-detalles');
    if (modal) modal.style.display = 'none';
}

function agregarAlCarrito(producto, cantidad) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const itemExistente = carrito.find(item => item.id === producto.id);

    if (itemExistente) {
        itemExistente.cantidad += cantidad;
    } else {
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen,
            cantidad: cantidad
        });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContadorCarrito();
    alert(`Agregado al carrito: ${cantidad}x ${producto.nombre}`);
}

function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const countElem = document.getElementById('cart-count');
    if (countElem) {
        const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
        countElem.textContent = totalItems;
    }
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    actualizarContadorCarrito();

    // Asignar eventos de clic a los botones de categoría en productos.html
    const botones = document.querySelectorAll('.btn-categoria');
    botones.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const cat = btn.getAttribute('data-cat') || btn.getAttribute('data-categoria');
            
            // Actualizar la URL dinámicamente sin recargar la página
            const nuevaUrl = cat === 'todos' ? 'productos.html' : `productos.html?cat=${cat}`;
            window.history.pushState({ path: nuevaUrl }, '', nuevaUrl);
            
            filtrarPorCategoria(cat);
        });
    });

    // Leer el parámetro inicial de la URL (cuando se ingresa desde index.html)
    const urlParams = new URLSearchParams(window.location.search);
    const catUrl = urlParams.get('cat');

    if (catUrl) {
        filtrarPorCategoria(catUrl);
    } else {
        filtrarPorCategoria('todos');
    }
});