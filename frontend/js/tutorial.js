// Seleccionar elementos del carrusel
const tutorials = document.querySelectorAll('.tutorial');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const menuBtn = document.getElementById('menuBtn');

// Variables del carrusel
let currentIndex = 0;
const totalTutorials = tutorials.length;

// Función para mostrar un tutorial específico
function showTutorial(index) {
    tutorials.forEach(tutorial => {
        tutorial.style.display = 'none';
    });
    tutorials[index].style.display = 'block';
}

// Función para ir al tutorial anterior
function prevTutorial() {
    currentIndex = (currentIndex - 1 + totalTutorials) % totalTutorials;
    showTutorial(currentIndex);
}

// Función para ir al tutorial siguiente
function nextTutorial() {
    currentIndex = (currentIndex + 1) % totalTutorials;
    showTutorial(currentIndex);
}

// Event listeners
prevBtn.addEventListener('click', prevTutorial);
nextBtn.addEventListener('click', nextTutorial);

// Botón para volver al menú principal
menuBtn.addEventListener('click', () => {
    window.location.href = 'menuPrincipal.html';
});

// Inicializar
showTutorial(currentIndex);
