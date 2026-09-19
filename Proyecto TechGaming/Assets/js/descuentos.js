// Mismo catálogo base pero mapeado con precios en rojo para las ofertas del día
const productosBaseOfertas = [
    {
        id: 1,
        nombre: "Teclado Mecánico Royal Kludge RK855 (RK68)",
        categoria: "perifericos",
        precioOriginal: 49990,
        descripcion: "Teclado gamer mecánico compacto en formato 65% con 68 teclas (mantiene flechas de dirección dedicadas). Cuenta con retroiluminación RGB dinámica con múltiples modos de iluminación, conexión mediante cable USB Tipo-C extraíble e interruptores (switches) mecánicos táctiles de alta durabilidad. Compatible con Windows, macOS, Android e iOS.",
        caracteristicas: ["Formato Compacto 65% (68 teclas)", "Cable USB Tipo-C extraíble", "Retroiluminación RGB dinámica", "Switches mecánicos táctiles Huano/RK", "Compatibilidad multiplataforma"],
        imagen: "https://www.gsmpro.cl/cdn/shop/files/teclado-gamer-mecanico-royal-kludge-rk-855-rgb-switch-azul-negro.png?v=1775234736"
    },
    {
        id: 2,
        nombre: "Mouse Gamer Logitech G502 HERO 25K",
        categoria: "perifericos",
        precioOriginal: 39990,
        descripcion: "Mouse ergonómico de alto rendimiento equipado con el sensor óptico HERO 25K de última generación (ajustable de 100 a 25.600 DPI sin aceleración). Incluye 11 botones totalmente programables mediante el software Logitech G HUB, rueda de desplazamiento hiperrápida con modo dual, iluminación RGB LIGHTSYNC y un sistema personalizable con 5 pesas de 3.6 g para ajustar el centro de gravedad.",
        caracteristicas: ["Sensor Óptico HERO 25K (hasta 25.600 DPI)", "11 Botones programables vía Logitech G HUB", "Sistema de pesas ajustables (5 pesas de 3.6g)", "Rueda de desplazamiento hiperrápida modo dual", "Iluminación RGB LIGHTSYNC"],
        imagen: "https://media.falabella.com/falabellaCL/143442248_01/w=1500,h=1500,fit=cover"
    },
    {
        id: 3,
        nombre: "Monitor Gamer Dell 24\" FHD 144Hz 1ms IPS",
        categoria: "monitores",
        precioOriginal: 169990,
        descripcion: "Pantalla plana Dell de 24 pulgadas Full HD (1920 x 1080) diseñada para el juego competitivo. Equipada con panel IPS de alta precisión de color, tasa de refresco ultra fluida de 144Hz, 1ms de tiempo de respuesta (MPRT) y soporte para tecnología AMD FreeSync Premium. Su conectividad versátil includes 2 puertos HDMI, 1 DisplayPort y salida para audífonos.",
        caracteristicas: ["Pantalla 24\" Full HD (1920x1080) Panel IPS", "144Hz Tasa de refresco & 1ms Tiempo de respuesta", "AMD FreeSync Premium", "Conectividad: 2x HDMI, 1x DisplayPort, Salida Audio", "Base ergonómica con ajuste de inclinación"],
        imagen: "https://http2.mlstatic.com/D_NQ_NP_630678-CBT115612335906_092026-O.webp"
    },
    {
        id: 4,
        nombre: "Monitor Curvo 27\" QHD 240Hz 1000R",
        categoria: "monitores",
        precioOriginal: 249990,
        descripcion: "Monitor gaming con pantalla curva inmersiva 1000R que se adapta al campo de visión natural. Cuenta con resolución Quad HD (2560 x 1440) para mayor nitidez, tasa de refresco ultra rápida de 240Hz, 1ms de tiempo de respuesta y compatibilidad con tecnologías de sincronización adaptativa (Adaptive-Sync) para evitar desgarros de imagen en juegos de alta velocidad.",
        caracteristicas: ["Resolución QHD (2560x1440 pixels)", "Curvatura inmersiva 1000R", "Tasa de refresco ultra rápida de 240Hz", "Tiempo de respuesta de 1ms", "Sincronización Adaptive-Sync / FreeSync"],
        imagen: "https://http2.mlstatic.com/D_NQ_NP_846540-CBT112538947810_062026-O.webp"
    },
    {
        id: 5,
        nombre: "Auriculares Gamer Redragon Zeus 7.1 Surround",
        categoria: "auriculares",
        precioOriginal: 44990,
        descripcion: "Audífonos gamer Redragon equipados con sonido envolvente virtual 7.1 y altavoces dinámicos de 53 mm con imanes de neodimio para bajos profundos. Diseñados con una sólida estructura de aluminio, almohadillas de espuma viscoelástica (Memory Foam) de alta comodidad y micrófono omnidireccional desmontable con cancelación pasiva de ruido ambiental.",
        caracteristicas: ["Sonido envolvente Virtual 7.1 Surround", "Drivers de neodimio de 53 mm", "Estructura resistente de aluminio", "Micrófono desmontable con reducción de ruido", "Almohadillas acolchadas Memory Foam"],
        imagen: "https://i5.walmartimages.cl/asr/a7b8a7a5-90e7-49e4-93fa-453c712f4071.ecbc2ed0ba9e2d854401eeae5e9aa5f1.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF"
    },
    {
        id: 6,
        nombre: "Auriculares Inalámbricos PlayStation Pulse Pro eSports",
        categoria: "auriculares",
        precioOriginal: 99990,
        descripcion: "Headset inalámbrico oficial diseñado para consolas PlayStation (PS5 / PS4) y PC. Cuenta con audio 3D posicional de alta fidelidad, conexión inalámbrica de latencia ultra baja vía dongle USB (2.4GHz / PlayStation Link) y Bluetooth 5.2. Incluye micrófono retráctil con cancelación de ruido asistida por IA y batería de larga duración con hasta 24 horas de autonomía continua.",
        caracteristicas: ["Audio 3D inmersivo optimizado para PS5/PC", "Conexión Inalámbrica 2.4GHz USB + Bluetooth 5.2", "Micrófono retráctil con cancelación de ruido por IA", "Hasta 24 horas de autonomía continua", "Carga rápida mediante conector USB-C"],
        imagen: "https://media.solotodo.com/media/products/2023729_picture_1741202678.webp"
    }
];

let productosConDescuentoDiario = [];

function obtenerSemillaDelDia() {
    const hoy = new Date();
    return parseInt(`${hoy.getFullYear()}${String(hoy.getMonth() + 1).padStart(2, '0')}${String(hoy.getDate()).padStart(2, '0')}`, 10);
}

function pseudoRandom(semilla) {
    const x = Math.sin(semilla) * 10000;
    return x - Math.floor(x);
}

function cargarProductosDelDia() {
    let semilla = obtenerSemillaDelDia();
    const productosCopia = JSON.parse(JSON.stringify(productosBaseOfertas));

    for (let i = productosCopia.length - 1; i > 0; i--) {
        const j = Math.floor(pseudoRandom(semilla + i) * (i + 1));
        [productosCopia[i], productosCopia[j]] = [productosCopia[j], productosCopia[i]];
    }

    const seleccionados = productosCopia.slice(0, 3);

    productosConDescuentoDiario = seleccionados.map((prod, index) => {
        const pctDescuento = 15 + Math.floor(pseudoRandom(semilla + index * 10) * 26); 
        const precioOferta = Math.round(prod.precioOriginal * (1 - pctDescuento / 100));

        return {
            ...prod,
            porcentajeDescuento: pctDescuento,
            precioOferta: precioOferta
        };
    });
}

function renderizarDescuentos() {
    const grid = document.getElementById('grid-descuentos');
    if (!grid) return;

    if (!productosConDescuentoDiario || productosConDescuentoDiario.length === 0) {
        grid.innerHTML = `<p style="color:#94a3b8; grid-column: 1/-1; text-align:center;">No hay ofertas disponibles en este momento.</p>`;
        return;
    }

    grid.innerHTML = productosConDescuentoDiario.map(prod => `
        <div style="background: #1e293b; border: 1px solid #ef4444; border-radius: 8px; padding: 15px; display: flex; flex-direction: column; justify-content: space-between; position: relative;">
            <span style="position: absolute; top: 10px; right: 10px; background: #ef4444; color: #fff; font-weight: bold; padding: 4px 10px; border-radius: 20px; font-size: 0.85rem; z-index: 1; box-shadow: 0 0 10px rgba(239, 68, 68, 0.5);">-${prod.porcentajeDescuento}% OFF</span>
            <div>
                <img src="${prod.imagen}" alt="${prod.nombre}" onerror="this.src='https://via.placeholder.com/300x180/1e293b/ffffff?text=Producto'" style="width: 100%; height: 180px; object-fit: cover; border-radius: 6px; margin-bottom: 15px;">
                <h3 style="color: #f8fafc; font-size: 1.1rem; margin-bottom: 8px;">${prod.nombre}</h3>
                <p style="color: #cbd5e1; font-size: 0.85rem; line-height: 1.4; margin-bottom: 12px; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">
                    ${prod.descripcion}
                </p>
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
                    <span style="color: #ef4444; font-weight: 800; font-size: 1.4rem; text-shadow: 0 0 8px rgba(239, 68, 68, 0.3);">$${prod.precioOferta.toLocaleString('es-CL')}</span>
                    <span style="color: #94a3b8; text-decoration: line-through; font-size: 0.95rem;">$${prod.precioOriginal.toLocaleString('es-CL')}</span>
                </div>
            </div>
            <button onclick="verDetallesOferta(${prod.id})" style="width: 100%; padding: 10px; background: #ef4444; color: #ffffff; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; transition: background 0.2s;">Ver Oferta</button>
        </div>
    `).join('');
}

function iniciarCuentaRegresiva() {
    const elemTimer = document.getElementById('reloj-conteo') || document.getElementById('timer-descuentos');
    
    function actualizarTimer() {
        const ahora = new Date();
        const mañana = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate() + 1, 0, 0, 0);
        const diferencia = mañana - ahora;

        if (diferencia <= 0) {
            cargarProductosDelDia();
            renderizarDescuentos();
            return;
        }

        const horas = String(Math.floor((diferencia / (1000 * 60 * 60)) % 24)).padStart(2, '0');
        const minutos = String(Math.floor((diferencia / (1000 * 60)) % 60)).padStart(2, '0');
        const segundos = String(Math.floor((diferencia / 1000) % 60)).padStart(2, '0');

        if (elemTimer) {
            elemTimer.textContent = `${horas}:${minutos}:${segundos}`;
        }
    }

    actualizarTimer();
    setInterval(actualizarTimer, 1000);
}

function verDetallesOferta(idProducto) {
    const producto = productosConDescuentoDiario.find(p => p.id === idProducto);
    if (!producto) return;

    const modalImg = document.getElementById('modal-img');
    const modalTitulo = document.getElementById('modal-titulo');
    const modalDesc = document.getElementById('modal-descripcion');
    const modalPrecio = document.getElementById('modal-precio');

    if (modalImg) modalImg.src = producto.imagen;
    if (modalTitulo) modalTitulo.textContent = producto.nombre;
    if (modalDesc) modalDesc.textContent = producto.descripcion;
    if (modalPrecio) {
        modalPrecio.innerHTML = `<span style="color: #ef4444; font-weight: 800; font-size: 1.6rem;">$${producto.precioOferta.toLocaleString('es-CL')}</span> <span style="font-size:0.95rem; color:#94a3b8; text-decoration:line-through; margin-left:8px;">$${producto.precioOriginal.toLocaleString('es-CL')}</span>`;
    }

    const inputCantidad = document.getElementById('modal-cantidad');
    if (inputCantidad) inputCantidad.value = 1;

    const listaSpecs = document.getElementById('modal-caracteristicas');
    if (listaSpecs) {
        listaSpecs.innerHTML = (producto.caracteristicas || []).map(spec => `<li style="margin-bottom: 6px; color: #cbd5e1;">${spec}</li>`).join('');
    }

    const btnAgregarModal = document.getElementById('modal-btn-agregar');
    if (btnAgregarModal) {
        btnAgregarModal.onclick = () => {
            const cantidad = parseInt(document.getElementById('modal-cantidad').value, 10) || 1;
            agregarAlCarritoOferta(producto, cantidad);
            cerrarModal();
        };
    }

    const modal = document.getElementById('modal-detalles');
    if (modal) modal.style.display = 'flex';
}

function agregarAlCarritoOferta(producto, cantidad) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const itemExistente = carrito.find(item => item.id === producto.id);

    if (itemExistente) {
        itemExistente.cantidad += cantidad;
    } else {
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precioOferta,
            imagen: producto.imagen,
            cantidad: cantidad
        });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContadorCarrito();
    alert(`🛒 Se agregaron ${cantidad} unidad(es) de "${producto.nombre}" en oferta al carrito.`);
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

function actualizarContadorCarrito() {
    const countElem = document.getElementById('cart-count');
    if (countElem) {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const totalItems = carrito.reduce((sum, i) => sum + i.cantidad, 0);
        countElem.textContent = totalItems;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    cargarProductosDelDia();
    renderizarDescuentos();
    iniciarCuentaRegresiva();
    actualizarContadorCarrito();
});