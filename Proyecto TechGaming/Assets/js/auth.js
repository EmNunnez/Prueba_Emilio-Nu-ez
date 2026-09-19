document.addEventListener('DOMContentLoaded', () => {
    checkAuthState();

    // Procesar Inicio de Sesión
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const emailInput = document.getElementById('login-email');
            const passwordInput = document.getElementById('login-password');

            const email = emailInput ? emailInput.value.trim() : '';
            const password = passwordInput ? passwordInput.value.trim() : '';

            // 1. VALIDACIÓN: Campos requeridos vacíos
            if (!email || !password) {
                alert('Por favor, ingresa tu correo electrónico y contraseña.');
                return;
            }

            // 2. VALIDACIÓN: El correo NO puede contener la letra Ñ o ñ
            if (/[ñÑ]/.test(email)) {
                alert('El correo electrónico no puede contener la letra "Ñ" o "ñ".');
                return;
            }

            const users = JSON.parse(localStorage.getItem('users')) || [];

            // Admin por defecto
            if (email === 'admin@techgaming.cl' && password === 'admin123') {
                const adminUser = {
                    name: 'Administrador',
                    email: email,
                    role: 'admin'
                };
                localStorage.setItem('currentUser', JSON.stringify(adminUser));
                alert('¡Bienvenido Administrador!');
                window.location.href = '../Página/index.html';
                return;
            }

            const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());

            // 3. VALIDACIÓN: Usuario no registrado
            if (!foundUser) {
                alert('El correo ingresado no está registrado. Por favor, crea una cuenta primero.');
                return;
            }

            // 4. VALIDACIÓN: Contraseña incorrecta
            if (foundUser.password !== password) {
                alert('Contraseña incorrecta. Inténtalo nuevamente.');
                return;
            }

            // Inicio de sesión exitoso
            const sessionUser = {
                name: foundUser.name,
                email: foundUser.email,
                role: 'user'
            };

            localStorage.setItem('currentUser', JSON.stringify(sessionUser));
            alert(`¡Bienvenido de nuevo, ${foundUser.name}!`);
            window.location.href = '../Página/index.html';
        });
    }

    // Procesar Registro de Usuario
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const firstName = document.getElementById('reg-firstname').value.trim();
            const lastName = document.getElementById('reg-lastname').value.trim();
            const email = document.getElementById('reg-email').value.trim();
            const dob = document.getElementById('reg-dob').value;
            const country = document.getElementById('reg-country').value;
            const regionInput = document.getElementById('reg-region');
            const comunaInput = document.getElementById('reg-comuna');
            const cityInput = document.getElementById('reg-city');
            const password = document.getElementById('reg-password').value.trim();

            const region = regionInput ? regionInput.value : '';
            const comuna = comunaInput ? comunaInput.value : '';
            const city = cityInput ? cityInput.value.trim() : '';

            // 1. VALIDACIÓN: Campos vacíos
            if (!firstName || !lastName || !email || !dob || !country || !password) {
                alert('Por favor, completa todos los campos obligatorios (*).');
                return;
            }

            // Ubicación según país
            if (country === 'CL') {
                if (!region || !comuna) {
                    alert('Debes seleccionar tu Región y Comuna.');
                    return;
                }
            } else {
                if (!city) {
                    alert('Por favor, ingresa tu Ciudad / Provincia.');
                    return;
                }
            }

            // 2. VALIDACIÓN: El correo NO puede contener la letra Ñ o ñ
            if (/[ñÑ]/.test(email)) {
                alert('El correo electrónico no puede contener la letra "Ñ" o "ñ".');
                return;
            }

            // 3. VALIDACIÓN DE REGLAS DE CONTRASEÑA: Mínimo 8 caracteres, 1 Mayúscula y 1 Minúscula
            if (password.length < 8) {
                alert('La contraseña debe tener al menos 8 caracteres.');
                return;
            }

            if (!/[A-Z]/.test(password)) {
                alert('La contraseña debe incluir al menos una letra mayúscula.');
                return;
            }

            if (!/[a-z]/.test(password)) {
                alert('La contraseña debe incluir al menos una letra minúscula.');
                return;
            }

            let users = JSON.parse(localStorage.getItem('users')) || [];

            // 4. VALIDACIÓN: Correo ya registrado
            const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
            if (existingUser) {
                alert('Este correo ya está registrado. Por favor, inicia sesión.');
                window.location.href = 'login.html';
                return;
            }

            // Guardar usuario
            const newUser = {
                name: `${firstName} ${lastName}`,
                email: email,
                password: password,
                dob: dob,
                country: country,
                region: country === 'CL' ? region : city,
                comuna: country === 'CL' ? comuna : '',
                role: 'user'
            };

            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));

            alert('¡Registro exitoso! Por favor, inicia sesión con tus datos.');
            window.location.href = 'login.html';
        });
    }
});

// Comprobar la sesión activa en el header
function checkAuthState() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    const linkAdmin = document.getElementById('link-admin');
    const linkAuth = document.getElementById('link-auth');
    const linkRegister = document.getElementById('link-register');

    if (currentUser) {
        if (linkAuth) {
            linkAuth.textContent = `Hola, ${currentUser.name}`;
            linkAuth.href = '#';
            linkAuth.addEventListener('click', (e) => {
                e.preventDefault();
                if (confirm('¿Deseas cerrar sesión?')) {
                    localStorage.removeItem('currentUser');
                    window.location.href = '../Página/index.html';
                }
            });
        }

        if (linkRegister) {
            linkRegister.style.display = 'none';
        }

        if (linkAdmin && currentUser.role === 'admin') {
            linkAdmin.style.display = 'inline-block';
        }
    }
}