// main.js
// Archivo JavaScript externo para Resident Evil

// Función para inicializar la página
function initPage() {
    console.log("Página cargada correctamente.");
}

// Manejo del popup de bienvenida
function setupPopup() {
    const closeBtn = document.getElementById('close-popup');
    const popup = document.getElementById('popup');
    const overlay = document.getElementById('overlay');

    // Cerrar popup
    closeBtn.onclick = () => {
        popup.style.display = 'none';
        overlay.style.display = 'none';
    };
}

// Contador regresivo del popup
function startCountdown() {
    let timeLeft = 10;
    const countdownText = document.getElementById('countdown');
    const progressBar = document.querySelector('.progress');

    const interval = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0) {
            clearInterval(interval);
            document.getElementById('popup').style.display = 'none';
            document.getElementById('overlay').style.display = 'none';
        } else {
            countdownText.innerHTML = `Este popup se cerrará en: ${timeLeft} segundos
                <div class="progress-bar">
                    <div class="progress" style="width: ${(10 - timeLeft) * 10}%;"></div>
                </div>`;
        }
    }, 1000);
}

// Cambio de tema claro/oscuro
function toggleTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('light-theme');
            themeToggle.textContent = body.classList.contains('light-theme') 
                ? 'Cambiar a Tema Oscuro' 
                : 'Cambiar a Tema Claro';
        });
    }
}

// Botones "Leer más"
function setupReadMoreButtons() {
    const buttons = document.querySelectorAll('.read-more-btn');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.id.replace('-btn', '-more');
            const content = document.getElementById(targetId);

            if (content) {
                content.classList.toggle('hidden');
                button.textContent = content.classList.contains('hidden') 
                    ? 'Leer más' 
                    : 'Leer menos';
            }
        });
    });
}

// Búsqueda en el sitio
function setupSearchFunctionality() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const searchResults = document.getElementById('search-results');

    if (searchButton && searchInput && searchResults) {
        searchButton.addEventListener('click', () => {
            const query = searchInput.value.trim().toLowerCase();
            if (!query) return;

            const allText = document.body.innerText.toLowerCase();
            const occurrences = (allText.match(new RegExp(query, 'g')) || []).length;

            searchResults.classList.remove('hidden');
            searchResults.innerHTML = `Se encontró "${query}" en ${occurrences} lugar(es).`;
        });
    }
}

// Calificación por estrellas
function setupStarRating() {
    const stars = document.querySelectorAll('.star');

    function highlightStars(value) {
        stars.forEach((star, index) => {
            if (index < value) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }

    function clearStars() {
        stars.forEach(star => star.classList.remove('active'));
    }

    stars.forEach(star => {
        star.addEventListener('mouseover', () => {
            const value = parseInt(star.getAttribute('data-value'));
            highlightStars(value);
        });

        star.addEventListener('mouseout', () => {
            clearStars();
        });

        star.addEventListener('click', () => {
            const value = parseInt(star.getAttribute('data-value'));
            highlightStars(value);
        });
    });
}

// Selección de virus en tabla
function setupVirusSelection() {
    const rows = document.querySelectorAll('#virus-table tr[data-virus]');
    const virusInfo = document.getElementById('virus-info');
    const virusTitle = document.getElementById('virus-title');
    const virusDescription = document.getElementById('virus-description');

    rows.forEach(row => {
        row.addEventListener('click', () => {
            const cells = row.getElementsByTagName('td');
            virusTitle.textContent = cells[0].textContent;
            virusDescription.textContent = cells[1].textContent;
            virusInfo.classList.remove('hidden');
        });
    });
}

// Validación de número con NaN()
function validateNumber(input) {
    const number = parseFloat(input);
    if (isNaN(number)) {
        alert("Por favor, ingresa un número válido.");
        return false;
    }
    return true;
}

// Ejemplo de uso del mecanismo de escape
const mensaje = "Jill dijo: \"Tenemos que escapar\" antes de que sea demasiado tarde.";
console.log(mensaje);

// Inicialización de todas las funciones
window.onload = () => {
    // Mostrar popup al cargar
    const popup = document.getElementById('popup');
    const overlay = document.getElementById('overlay');
    if (popup && overlay) {
        popup.style.display = 'block';
        overlay.style.display = 'block';
        startCountdown();
    }

    // Iniciar funcionalidades
    initPage();
    setupPopup();
    toggleTheme();
    setupReadMoreButtons();
    setupSearchFunctionality();
    setupStarRating();
    setupVirusSelection();
};