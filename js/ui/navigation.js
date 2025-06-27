// js/ui/navigation.js
// Este módulo maneja toda la lógica de navegación de la interfaz de usuario.

// Importa los módulos de UI específicos que se deben inicializar para cada sección.
import { initializeDashboardCharts } from './dashboard.js';
import { renderInventoryTable, setupInventoryListeners } from './inventory.js';
import { renderPurchaseOrdersTable } from './purchases.js';
import { renderClientsTable } from './clients.js';
import { renderRatingsSection } from './ratings.js';
import { renderCashClosureSection } from './cashClosure.js';
import { initializeFinanceCharts } from './finance.js';
import { initializeArchitectureSection } from './architecture.js';

// Elementos DOM para la navegación
const navLinks = document.querySelectorAll('.nav-link');
const viewSections = document.querySelectorAll('.view-content');
const currentPageTitle = document.getElementById('current-page-title');
const sidebar = document.getElementById('sidebar');
const menuToggleBtn = document.getElementById('menu-toggle-btn');
const drawerBackdrop = document.getElementById('drawer-backdrop');

/**
 * Muestra la sección correspondiente al hash de la URL y oculta las demás.
 * También actualiza el título de la página y llama a las funciones de inicialización
 * de gráficos y tablas específicas de cada sección.
 */
function showSection() {
    // Obtiene el hash actual de la URL, por defecto es '#dashboard'.
    const hash = window.location.hash || '#dashboard';
    // Convierte el hash en un ID de sección HTML (ej., '#dashboard' -> 'dashboard-section').
    const targetSectionId = hash.substring(1) + '-section';

    // Oculta todas las secciones para asegurar que solo se vea la activa.
    viewSections.forEach(section => {
        section.classList.add('hidden');
    });

    let pageTitle = "Tienda Admin"; // Título por defecto de la página.
    let sectionToShow = document.getElementById(targetSectionId);

    // Si la sección objetivo no existe en el HTML, redirige al dashboard.
    if (!sectionToShow) {
        sectionToShow = document.getElementById('dashboard-section');
        window.location.hash = '#dashboard'; // Asegura que el hash en la URL también sea '#dashboard'.
        // Actualiza el hash para el switch case, ya que se ha redefinido la sección.
        hash = '#dashboard';
    }

    // Determina el título de la página y llama a las funciones de inicialización
    // específicas de la sección activa. Esto asegura que los datos y gráficos
    // se rendericen cada vez que se navega a una sección.
    switch(hash) {
        case '#dashboard':
            pageTitle = 'Resumen';
            initializeDashboardCharts();
            break;
        case '#inventory':
            pageTitle = 'Inventario';
            renderInventoryTable();
            setupInventoryListeners(); // Configura los listeners de búsqueda/filtro y modal.
            break;
        case '#sales':
            pageTitle = 'Gestión de Ventas (POS)';
            renderCashClosureSection(); // Renderiza la sección de cierre de caja (o datos de POS).
            break;
        case '#purchases':
            pageTitle = 'Gestión de Compras';
            renderPurchaseOrdersTable();
            break;
        case '#clients':
            pageTitle = 'Gestión de Clientes';
            renderClientsTable();
            break;
        case '#ratings':
            pageTitle = 'Sistema de Calificaciones';
            renderRatingsSection();
            break;
        case '#cash_closure':
            pageTitle = 'Cierre de Caja';
            renderCashClosureSection();
            break;
        case '#finance':
            pageTitle = 'Finanzas';
            initializeFinanceCharts();
            break;
        case '#settings':
            pageTitle = 'Configuración de Atributos';
            // La función 'selectCategory' no se llama aquí, ya que se espera
            // que el usuario haga clic en una categoría en la sección de configuración.
            break;
        case '#architecture':
            pageTitle = 'Arquitectura del Sistema';
            initializeArchitectureSection(); // Inicializa la sección de arquitectura.
            break;
    }

    // Muestra la sección que debe estar visible.
    sectionToShow.classList.remove('hidden');
    // Actualiza el título en el encabezado de la página.
    currentPageTitle.textContent = pageTitle;

    // Marca el enlace de navegación activo en la barra lateral con la clase 'active'.
    navLinks.forEach(link => {
        if (link.getAttribute('href') === hash) {
            link.classList.add('active'); // Clase CSS para el estilo del enlace activo.
        } else {
            link.classList.remove('active');
        }
    });

    // Cierra el cajón de navegación móvil si está abierto, para una mejor experiencia de usuario.
    closeDrawer();
}

/**
 * Alterna la visibilidad del cajón de navegación móvil y su fondo (`drawer-backdrop`).
 * Maneja las clases CSS para la animación de apertura/cierre.
 */
function toggleDrawer() {
    sidebar.classList.toggle('active'); // Alterna la clase 'active' en el sidebar.
    if (sidebar.classList.contains('active')) {
        drawerBackdrop.classList.remove('hidden'); // Muestra el fondo.
        // Pequeño retraso para que la transición de opacidad se aplique suavemente.
        setTimeout(() => {
            drawerBackdrop.classList.add('opacity-50');
        }, 10);
    } else {
        drawerBackdrop.classList.remove('opacity-50'); // Inicia la transición de opacidad a 0.
        // Espera a que la transición termine antes de ocultar el fondo completamente.
        setTimeout(() => {
            drawerBackdrop.classList.add('hidden');
        }, 300); // Coincide con la duración de la transición en el CSS.
    }
}

/**
 * Cierra el cajón de navegación móvil y oculta el fondo.
 */
function closeDrawer() {
    sidebar.classList.remove('active');
    drawerBackdrop.classList.remove('opacity-50');
    drawerBackdrop.classList.add('hidden');
}

/**
 * Inicializa los listeners de eventos para toda la navegación de la aplicación.
 * Esta función es el punto de entrada para configurar la interactividad de la UI.
 */
function initializeNavigation() {
    // Escucha los clics en todos los enlaces de navegación.
    // El comportamiento por defecto de cambiar el hash de la URL es suficiente,
    // ya que el listener de 'hashchange' se encarga de mostrar la sección correcta.
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            // No es necesario event.preventDefault() aquí a menos que quieras
            // controlar completamente la navegación sin el cambio de hash de la URL.
            // Para una SPA con hashes, dejar que el hash cambie es lo esperado.
        });
    });

    // Escucha los cambios en el hash de la URL. Cada vez que el hash cambia,
    // se llama a 'showSection' para actualizar la vista.
    window.addEventListener('hashchange', showSection);

    // Configura los listeners para el botón de alternar menú móvil y el fondo del cajón.
    if (menuToggleBtn && sidebar && drawerBackdrop) {
        menuToggleBtn.addEventListener('click', toggleDrawer);
        drawerBackdrop.addEventListener('click', closeDrawer);
    }

    // Llama a 'showSection' una vez al cargar la página inicialmente
    // para mostrar la sección correcta basada en el hash inicial (o el dashboard).
    showSection();
}

// Exporta la función de inicialización para que pueda ser llamada desde main.js.
export { initializeNavigation };
