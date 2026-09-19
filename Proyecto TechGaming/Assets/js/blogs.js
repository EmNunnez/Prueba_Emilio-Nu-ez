// Array global de artículos de blog con imágenes directas
const blogs = [
    {
        id: 1,
        titulo: "¿Cómo elegir el switch perfecto para tu teclado mecánico?",
        resumen: "Blue, Red, Brown... Descubre las diferencias clave y cuál se adapta mejor a tu estilo de juego o escritura.",
        fecha: "15 de Marzo, 2026",
        autor: "Alex Rivera - Spec Gamer",
        imagen: "https://i.ytimg.com/vi/U9dlkyQj-Oo/sddefault.jpg",
        contenido: `Elegir el switch adecuado para tu teclado mecánico puede transformar por completo tu experiencia al jugar o escribir. Los switches son los mecanismos debajo de cada tecla que registran la pulsación.

        1. Switches Lineales (Rojos/Red): Son ultrasuaves y silenciosos. No tienen sensación táctil intermedia al presionar, lo que los hace los favoritos de los jugadores de shooters como Valorant o CS:GO.

        2. Switches Táctiles (Marrones/Brown): Ofrecen un pequeño "salto" o retroalimentación física justo en el punto de activación. Son ideales si buscas un equilibrio entre jugar y redactar textos.

        3. Switches Clicky (Azules/Blue): Hacen un sonido "click" distintivo y fuerte al activarse. Ofrecen una respuesta táctil excelente pero pueden resultar ruidosos si juegas de noche o compartes habitación.

        Conclusión: Si juegas de forma competitiva, los lineales o táctiles te darán mayor rapidez sin distraerte.`
    },
    {
        id: 2,
        titulo: "144Hz vs 240Hz: ¿Realmente vale la pena dar el salto?",
        resumen: "Analizamos si pasar de 144Hz a 240Hz otorga una ventaja competitiva real en shooters eSports.",
        fecha: "10 de Marzo, 2026",
        autor: "Camila Soto - Hardware Specialist",
        imagen: "https://i.ytimg.com/vi/whIF0yWuCbU/maxresdefault.jpg",
        contenido: `La tasa de refresco medida en Hertz (Hz) determina cuántas imágenes por segundo actualiza tu monitor.

        - Salto de 60Hz a 144Hz: Es una diferencia monumental (de 16.6ms a 6.9ms de tiempo entre cuadros). Todo el movimiento se vuelve fluido instantáneamente.

        - Salto de 144Hz a 240Hz: Reduce el tiempo entre imágenes de 6.9ms a 4.1ms. Aunque el margen numérico parece menor, en shooters competitivos como Valorant, CS2 o Overwatch 2 se traducen en:
          1. Menor fluidez percibida al girar la cámara rápido (ghosting/motion blur reducido).
          2. Menor latencia del sistema y de entrada (input lag).
          3. Una respuesta de apuntado (tracking) más precisa con el mouse.

        Conclusión: Si juegas de forma casual, los 144Hz son el estándar ideal en calidad/precio. Si juegas de forma competitiva o eSports y tu PC alcanza de forma constante más de 240 FPS, la velocidad extra de los 240Hz te dará una pequeña ventaja estratégica.`
    },
    {
        id: 3,
        titulo: "Mouses Gamer: Sensores Ópticos vs Sensores Láser",
        resumen: "Analizamos la precisión, aceleración y respuesta de ambas tecnologías para que elijas la mejor opción en eSports.",
        fecha: "18 de Agosto, 2026",
        autor: "Matías Silva - Pro Gaming Gear",
        imagen: "https://i.ytimg.com/vi/vQsfzXp9tbc/maxresdefault.jpg",
        contenido: `El tipo de sensor en tu mouse determina cómo se traduce el movimiento físico de tu mano a la pantalla. Aunque ambas tecnologías iluminan la superficie para tomar miles de capturas por segundo, funcionan de manera muy distinta:

        1. Sensores Ópticos: Utilizan un LED para iluminar la superficie. Al no penetrar profundamente en los materiales, ofrecen un seguimiento 1:1 completamente preciso y libre de aceleración artificial, convirtiéndolos en el estándar absoluto para juegos competitivos y shooters (FPS).

        2. Sensores Láser: Usan un haz láser invisible capaz de penetrar capas más profundas. Su mayor ventaja es que funcionan en prácticamente cualquier superficie, incluyendo vidrio transparente. Sin embargo, tienden a introducir una ligera aceleración involuntaria en movimientos rápidos.

        Conclusión: Para juegos eSports donde la precisión milimétrica es crucial, el sensor óptico sobre un buen mousepad de tela sigue siendo la mejor alternativa.`
    }
];

let blogActualId = null;

document.addEventListener('DOMContentLoaded', () => {
    renderizarBlogs();
    
    // Escuchar envío de comentarios
    const formComentario = document.getElementById('form-comentario');
    if (formComentario) {
        formComentario.addEventListener('submit', (e) => {
            e.preventDefault();
            agregarComentario();
        });
    }
});

function renderizarBlogs() {
    const gridBlogs = document.getElementById('grid-blogs');
    if (!gridBlogs) return;

    gridBlogs.innerHTML = blogs.map(blog => `
        <article style="background: #1e293b; border: 1px solid #334155; border-radius: 8px; overflow: hidden; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
                <img src="${blog.imagen}" alt="${blog.titulo}" style="width: 100%; height: 200px; object-fit: cover;">
                <div style="padding: 18px;">
                    <div style="display: flex; gap: 10px; font-size: 0.8rem; color: #38bdf8; margin-bottom: 8px; font-weight: bold;">
                        <span>${blog.fecha}</span>
                        <span>•</span>
                        <span>${blog.autor}</span>
                    </div>
                    <h3 style="color: #f8fafc; font-size: 1.15rem; margin-bottom: 10px; line-height: 1.3;">${blog.titulo}</h3>
                    <p style="color: #cbd5e1; font-size: 0.9rem; line-height: 1.5; margin-bottom: 15px;">${blog.resumen}</p>
                </div>
            </div>
            <div style="padding: 0 18px 18px 18px;">
                <button onclick="leerBlog(${blog.id})" style="width: 100%; padding: 10px; background: #38bdf8; color: #020617; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">Leer Artículo Completo</button>
            </div>
        </article>
    `).join('');
}

function leerBlog(idBlog) {
    const blog = blogs.find(b => b.id === idBlog);
    if (!blog) return;

    blogActualId = idBlog;

    document.getElementById('blog-modal-img').src = blog.imagen;
    document.getElementById('blog-modal-titulo').textContent = blog.titulo;
    document.getElementById('blog-modal-fecha').textContent = blog.fecha;
    document.getElementById('blog-modal-autor').textContent = blog.autor;
    document.getElementById('blog-modal-contenido').textContent = blog.contenido;

    cargarComentarios(idBlog);

    document.getElementById('modal-blog').style.display = 'flex';
}

function cerrarModalBlog() {
    const modal = document.getElementById('modal-blog');
    if (modal) modal.style.display = 'none';
}

function cargarComentarios(idBlog) {
    const comentariosGuardados = JSON.parse(localStorage.getItem(`comentarios_blog_${idBlog}`)) || [];
    const listaComentarios = document.getElementById('lista-comentarios');

    if (comentariosGuardados.length === 0) {
        listaComentarios.innerHTML = '<p style="color: #94a3b8; font-size: 0.9rem; font-style: italic;">Sé el primero en comentar este artículo.</p>';
        return;
    }

    listaComentarios.innerHTML = comentariosGuardados.map(c => `
        <div style="background: #0f172a; padding: 12px; border-radius: 6px; border: 1px solid #334155;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                <strong style="color: #38bdf8; font-size: 0.9rem;">${escapeHTML(c.nombre)}</strong>
                <span style="color: #64748b; font-size: 0.75rem;">${c.fecha}</span>
            </div>
            <p style="color: #cbd5e1; font-size: 0.9rem; margin: 0;">${escapeHTML(c.texto)}</p>
        </div>
    `).join('');
}

function agregarComentario() {
    if (!blogActualId) return;

    const inputNombre = document.getElementById('comentario-nombre');
    const inputTexto = document.getElementById('comentario-texto');

    const nombre = inputNombre.value.trim();
    const texto = inputTexto.value.trim();

    if (!nombre || !texto) return;

    const nuevoComentario = {
        nombre: nombre,
        texto: texto,
        fecha: new Date().toLocaleDateString('es-CL', { hour: '2-digit', minute: '2-digit' })
    };

    let comentarios = JSON.parse(localStorage.getItem(`comentarios_blog_${blogActualId}`)) || [];
    comentarios.unshift(nuevoComentario);

    localStorage.setItem(`comentarios_blog_${blogActualId}`, JSON.stringify(comentarios));

    inputNombre.value = '';
    inputTexto.value = '';

    cargarComentarios(blogActualId);
}

function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}