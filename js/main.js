// js/main.js
// Este es el archivo principal de la aplicación.
// Se encarga de inicializar los módulos de datos y la navegación.

// Importa los servicios de datos y la función de inicialización de la navegación.
import { DataService } from './data/dataService.js';
import { initializeNavigation } from './ui/navigation.js'; // Importa la función de inicialización de navegación
import { selectCategory } from './ui/settings.js'; // Importa selectCategory para asignarla globalmente
import { closeModal } from './ui/modals.js'; // Asegúrate de importar closeModal si se usa globalmente

// Función para inicializar la aplicación.
function initializeApp() {
    console.log("Inicializando la aplicación...");

    // 1. Inicializar DataService (carga los datos de mock).
    DataService.initialize();

    // 2. Configurar e inicializar la navegación.
    initializeNavigation();

    // Asignar funciones globales si son llamadas directamente desde HTML (onclick, etc.).
    // Esto es necesario porque los módulos son 'scoped' por defecto con type="module".
    window.selectCategory = selectCategory; // Para la sección de Configuración
    window.closeModal = closeModal;       // Para el botón de cerrar en el modal

    console.log("Aplicación inicializada.");
}

// Inicia la aplicación cuando el DOM esté completamente cargado.
document.addEventListener('DOMContentLoaded', initializeApp);

// Nota: La lógica de `showSection`, `handleHashChange` y `toggleDrawer`
// se ha movido o centralizado en `js/ui/navigation.js` para una mejor modularidad
// y para evitar duplicaciones.
