let db;

// Función para inicializar la página
function initPage() {
    console.log("Página cargada correctamente.");
}

// Manejo del popup de bienvenida
function setupPopup() {
    const closeBtn = document.getElementById('close-popup');
    const popup = document.getElementById('popup');
    const overlay = document.getElementById('overlay');

    if (closeBtn && popup && overlay) {
        closeBtn.onclick = () => {
            popup.style.display = 'none';
            overlay.style.display = 'none';
        };
    }
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

// Operaciones con cadenas
function displayStringOperations() {
    const userInput = document.getElementById('user-input').value.trim();
    if (!userInput) {
        alert("Por favor, ingresa un texto válido.");
        return;
    }

    const resultsContainer = document.getElementById('string-operations-results');
    if (!resultsContainer) return;

    resultsContainer.innerHTML = '';

    const operations = [
        { name: 'Mayúsculas', result: userInput.toUpperCase() },
        { name: 'Minúsculas', result: userInput.toLowerCase() },
        { name: 'Primer carácter', result: userInput.charAt(0) },
        { name: 'Subcadena (0-5)', result: userInput.substring(0, 5) },
        { name: 'Dividir por espacio', result: JSON.stringify(userInput.split(" ")) },
        { name: 'Concatenación', result: userInput.concat(" mundo") }
    ];

    operations.forEach(op => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${op.name}:</strong> ${op.result}`;
        resultsContainer.appendChild(li);
    });
}

// Función para calcular mutación viral
function calculateVirusMutation() {
    const dose = parseFloat(document.getElementById('virus-dose').value);
    const time = parseFloat(document.getElementById('exposure-time').value);
    const resultDiv = document.getElementById('result-mutation');
    const messageDiv = document.getElementById('mutation-message');
    const levelSpan = document.getElementById('mutation-level');

    if (isNaN(dose) || isNaN(time)) {
        alert("Por favor, ingresa valores numéricos válidos.");
        return;
    }

    let mutationLevel = (dose * Math.pow(time, 1.2)) / 5;
    if (mutationLevel > 100) mutationLevel = 100;

    levelSpan.textContent = mutationLevel.toFixed(2);
    resultDiv.classList.remove('hidden');

    let message = "";
    if (mutationLevel <= 25) {
        message = "✔️ Nivel seguro. Sin exposición dañina.";
    } else if (mutationLevel <= 50) {
        message = "⚠️ Exposición moderada. Posible inicio de reacción biológica.";
    } else if (mutationLevel <= 75) {
        message = "❗ Inicio de mutación. Cambios celulares detectados.";
    } else {
        message = "☠️ ¡Mutación avanzada! La Transformacion Es Inevitable.";
    }

    messageDiv.textContent = message;
    messageDiv.classList.remove('hidden');
}

// Inicializar IndexedDB
function initDatabase() {
    const request = indexedDB.open("ResidentEvilDB", 1);

    request.onupgradeneeded = function(event) {
        const db = event.target.result;

        if (!db.objectStoreNames.contains("characters")) {
            const objectStore = db.createObjectStore("characters", { keyPath: "id", autoIncrement: true });
            objectStore.createIndex("name", "name", { unique: false });
            objectStore.createIndex("game", "game", { unique: false });
            objectStore.createIndex("type", "type", { unique: false });
        }
    };

    request.onsuccess = function(event) {
        db = event.target.result;
        console.log("Base de datos cargada correctamente.");
        loadCharacters(); // Cargar personajes existentes
    };

    request.onerror = function(event) {
        console.error("Error al abrir la base de datos.");
    };
}

// Guardar registro
function saveCharacter(event) {
    event.preventDefault();

    const name = document.getElementById('char-name').value.trim();
    const game = document.getElementById('char-game').value;
    const type = document.getElementById('char-type').value;
    const appearances = document.getElementById('char-appearance').value.trim().split(',').map(a => a.trim());
    const isBow = document.getElementById('char-is-bow').checked;

    if (!name || !game || !type) {
        alert("Por favor completa todos los campos obligatorios.");
        return;
    }

    const transaction = db.transaction(["characters"], "readwrite");
    const store = transaction.objectStore("characters");

    const data = {
        name,
        game,
        type,
        appearances,
        isBow
    };

    const request = store.add(data);

    request.onsuccess = function () {
        alert("Personaje guardado exitosamente.");
        clearForm();
        loadCharacters();
    };

    request.onerror = function () {
        alert("Error al guardar el personaje.");
    };
}

// Mostrar registros
function loadCharacters() {
    const resultsDiv = document.getElementById('crud-results');
    resultsDiv.innerHTML = "<h4>Lista de Personajes</h4>";

    const transaction = db.transaction(["characters"], "readonly");
    const store = transaction.objectStore("characters");
    const cursorRequest = store.openCursor();

    cursorRequest.onsuccess = function(event) {
        const cursor = event.target.result;

        if (cursor) {
            const item = cursor.value;

            const div = document.createElement('div');
            div.className = 'character-item';
            div.dataset.id = item.id;
            div.innerHTML = `
                <p><strong>ID:</strong> ${item.id} | <strong>Nombre:</strong> ${item.name} 
                   | <strong>Juego:</strong> ${item.game.toUpperCase()} 
                   | <strong>Tipo:</strong> ${item.type}
                   | <strong>BOW:</strong> ${item.isBow ? 'Sí' : 'No'}
                   | <strong>Apariciones:</strong> ${item.appearances.join(', ')}</p>
                <button onclick="editCharacter(${item.id})">Editar</button>
                <button onclick="confirmDelete(${item.id})">Eliminar</button>
                <hr>
            `;
            resultsDiv.appendChild(div);
            cursor.continue();
        }
    };
}

// Editar registro
function editCharacter(id) {
    const transaction = db.transaction(["characters"], "readonly");
    const store = transaction.objectStore("characters");
    const request = store.get(id);

    request.onsuccess = function(event) {
        const data = event.target.result;

        document.getElementById('char-id').value = data.id;
        document.getElementById('char-name').value = data.name;
        document.getElementById('char-game').value = data.game;
        document.getElementById('char-type').value = data.type;
        document.getElementById('char-appearance').value = data.appearances.join(', ');
        document.getElementById('char-is-bow').checked = data.isBow;

        document.getElementById('save-btn').disabled = true;
        document.getElementById('update-btn').disabled = false;
        document.getElementById('delete-btn').disabled = false;
    };
}

// Actualizar registro
function updateCharacter() {
    const id = parseInt(document.getElementById('char-id').value);
    const name = document.getElementById('char-name').value.trim();
    const game = document.getElementById('char-game').value;
    const type = document.getElementById('char-type').value;
    const appearances = document.getElementById('char-appearance').value.trim().split(',').map(a => a.trim());
    const isBow = document.getElementById('char-is-bow').checked;

    if (!name || !game || !type) {
        alert("Por favor completa todos los campos obligatorios.");
        return;
    }

    const transaction = db.transaction(["characters"], "readwrite");
    const store = transaction.objectStore("characters");

    const data = {
        id,
        name,
        game,
        type,
        appearances,
        isBow
    };

    const request = store.put(data);

    request.onsuccess = function () {
        alert("Personaje actualizado exitosamente.");
        clearForm();
        loadCharacters();
    };

    request.onerror = function () {
        alert("Error al actualizar el personaje.");
    };
}

// Confirmar eliminación
function confirmDelete(id) {
    if (confirm("¿Estás seguro de eliminar este personaje?")) {
        deleteCharacter(id);
    }
}

// Eliminar registro
function deleteCharacter(id) {
    const transaction = db.transaction(["characters"], "readwrite");
    const store = transaction.objectStore("characters");
    const request = store.delete(id);

    request.onsuccess = function () {
        alert("Personaje eliminado exitosamente.");
        loadCharacters();
    };

    request.onerror = function () {
        alert("Error al eliminar el personaje.");
    };
}

// Limpiar formulario
function clearForm() {
    const form = document.getElementById('character-form');
    if (form && typeof form.reset === 'function') {
        form.reset();
    }

    document.getElementById('char-id').value = '';
    document.getElementById('save-btn').disabled = false;
    document.getElementById('update-btn').disabled = true;
    document.getElementById('delete-btn').disabled = true;
}

// Inicialización principal
window.onload = () => {
    // Mostrar popup al cargar
    const popup = document.getElementById('popup');
    const overlay = document.getElementById('overlay');
    if (popup && overlay) {
        popup.style.display = 'block';
        overlay.style.display = 'block';
        startCountdown();
    }

    // Iniciar IndexedDB
    initDatabase();

    // Asignar eventos a los botones del formulario
    const form = document.getElementById('character-form');
    const updateBtn = document.getElementById('update-btn');
    const deleteBtn = document.getElementById('delete-btn');

    if (form) form.addEventListener('submit', saveCharacter);
    if (updateBtn) updateBtn.addEventListener('click', updateCharacter);
    if (deleteBtn) deleteBtn.addEventListener('click', () => {
        const id = parseInt(document.getElementById('char-id').value);
        if (id) confirmDelete(id);
    });

    // Iniciar funcionalidades
    initPage();
    setupPopup();
    toggleTheme();
    setupReadMoreButtons();
    setupSearchFunctionality();
    setupStarRating();
    setupVirusSelection();

    // Eventos adicionales
    document.getElementById('apply-operations-btn')?.addEventListener('click', displayStringOperations);
    document.getElementById('calculate-btn')?.addEventListener('click', calculateVirusMutation);


    // === Consola de Laboratorio: Análisis de Virus ===

// Función para analizar nivel de mutación básico
function analyzeMutation() {
    const doseInput = document.getElementById('dose-input');
    const timeInput = document.getElementById('time-input');
    const resultsDiv = document.getElementById('lab-results');

    if (!doseInput || !timeInput || !resultsDiv) return;

    const dose = parseFloat(doseInput.value);
    const time = parseFloat(timeInput.value);

    if (isNaN(dose) || isNaN(time)) {
        alert("Por favor ingresa valores válidos.");
        return;
    }

    // Operaciones matemáticas básicas
    let mutationLevel = (dose * Math.pow(time, 1.1)) / 4; // Fórmula ficticia
    if (mutationLevel > 100) mutationLevel = 100;

    // Operadores relacionales y lógicos
    let status = "";
    if (mutationLevel <= 25) {
        // AND lógico implícito
        status = "🟢 Seguro";
    } else if (mutationLevel > 25 && mutationLevel <= 75) {
        status = "🟠 Exposición moderada";
    } else if (mutationLevel > 75 || mutationLevel === 100) {
        status = "🔴 ¡Mutación avanzada!";
    }

    // Mostrar resultado
    resultsDiv.innerHTML = `
        <p><strong>Nivel de mutación:</strong> ${mutationLevel.toFixed(2)}%</p>
        <p><strong>Estado:</strong> ${status}</p>
    `;
    resultsDiv.classList.remove('hidden');
}

// Función para simular evolución más compleja
function simulateAdvancedMutation() {
    const dose = parseFloat(document.getElementById('dose-input').value);
    const time = parseFloat(document.getElementById('time-input').value);
    const resultsDiv = document.getElementById('lab-results');

    if (isNaN(dose) || isNaN(time)) {
        alert("Por favor ingresa valores válidos.");
        return;
    }

    // Incremento y decremento
    let base = dose * 1.5;
    let modifier = time % 10;

    base++;      // Incremento
    modifier--;  // Decremento

    // Negación y lógica avanzada
    const isSafe = !(base + modifier >= 80); // Uso de NOT

    // Operadores relacionales y lógicos
    let conclusion = "";
    if (base > 50 && modifier > 5) {
        conclusion = "⚠️ ¡MUTACIÓN EXTREMA DETECTADA!";
    } else if (base > 30 || modifier > 10) {
        conclusion = "❗ Células inestables.";
    } else {
        conclusion = "🟢 Estable, sin riesgos altos.";
    }

    // Mostrar resultados adicionales
    resultsDiv.innerHTML += `
        <hr>
        <p><strong>Carga genética acumulada:</strong> ${base}</p>
        <p><strong>Influencia de factores externos:</strong> ${modifier}</p>
        <p><strong>Conclusión:</strong> ${conclusion}</p>
        <p><strong>¿Es seguro para investigación?</strong> ${isSafe ? 'Sí' : 'No'}</p>
    `;
}

// Asignar eventos si aún no están asignados
document.getElementById('analyze-btn')?.addEventListener('click', analyzeMutation);
document.getElementById('simulate-btn')?.addEventListener('click', simulateAdvancedMutation);
};
