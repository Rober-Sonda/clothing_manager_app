// js/ui/inventory.js
import { DataService } from '../data/dataService.js';
import { openModal } from './modals.js'; // Importa la función openModal desde modals.js

// Elementos DOM de la sección de inventario
const inventoryTableBody = document.getElementById('inventoryTableBody');
const inventorySearch = document.getElementById('inventorySearch');
const categoryFilter = document.getElementById('categoryFilter');

/**
 * Renderiza la tabla de inventario basándose en el filtro de búsqueda y categoría.
 * @param {string} searchTerm Término de búsqueda para filtrar por nombre o SKU.
 * @param {string} categoryId ID de la categoría para filtrar productos.
 */
function renderInventoryTable(searchTerm = '', categoryId = 'all') {
    inventoryTableBody.innerHTML = ''; // Limpia la tabla existente
    const allVariants = DataService.getVariants();
    const allProducts = DataService.getProducts();
    const allCategories = DataService.getCategories();

    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    // Filtra las variantes
    const filteredVariants = allVariants.filter(variant => {
        const product = allProducts.find(p => p.id === variant.productId);
        if (!product) return false;

        // Filtro por término de búsqueda (nombre del producto o SKU de la variante)
        const matchesSearch = product.name.toLowerCase().includes(lowerCaseSearchTerm) ||
                              variant.sku.toLowerCase().includes(lowerCaseSearchTerm);

        // Filtro por categoría
        const matchesCategory = categoryId === 'all' || product.categoryIds.includes(categoryId);

        return matchesSearch && matchesCategory;
    });

    if (filteredVariants.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `<td colspan="6" class="table-cell text-center text-sm text-[#6C757D] py-4">No se encontraron productos con los filtros aplicados.</td>`;
        inventoryTableBody.appendChild(row);
        return;
    }

    // Ordena las variantes por el nombre del producto
    filteredVariants.sort((a, b) => {
        const productNameA = allProducts.find(p => p.id === a.productId)?.name || '';
        const productNameB = allProducts.find(p => p.id === b.productId)?.name || '';
        return productNameA.localeCompare(productNameB);
    });


    // Crea las filas de la tabla para las variantes filtradas
    filteredVariants.forEach(variant => {
        const product = allProducts.find(p => p.id === variant.productId);
        const categoriesText = product ? allCategories
            .filter(cat => product.categoryIds.includes(cat.id))
            .map(cat => cat.name)
            .join(', ') : 'N/A';

        const row = document.createElement('tr');
        row.className = 'hover:bg-[#F8F9FA] cursor-pointer border-b border-[#E0E0E0] last:border-b-0';
        // Asigna un event listener a cada fila para abrir el modal de detalles
        row.onclick = () => openModal(variant.id);

        row.innerHTML = `
            <td class="table-cell text-xs font-mono text-[#6C757D]">${variant.sku}</td>
            <td class="table-cell text-sm font-medium text-[#333333]">${product ? product.name : 'N/A'}</td>
            <td class="table-cell text-sm text-[#333333]">${variant.color || 'N/A'}</td>
            <td class="table-cell text-sm text-[#333333]">${variant.size || 'N/A'}</td>
            <td class="table-cell text-sm text-center font-semibold ${variant.stock <= variant.minStockQuantity ? 'text-[#DC3545]' : 'text-[#333333]'}">${variant.stock}</td>
            <td class="table-cell text-sm font-semibold text-[#28A745]">$ ${variant.price.toFixed(2)}</td>
        `;
        inventoryTableBody.appendChild(row);
    });
}

/**
 * Configura los listeners de eventos para la búsqueda y el filtro de categorías en el inventario.
 * También rellena el filtro de categorías dinámicamente.
 */
function setupInventoryListeners() {
    // Rellena el filtro de categorías
    const categories = DataService.getCategories();
    categoryFilter.innerHTML = '<option value="all">Todas las categorías</option>';
    categories.filter(cat => !cat.parentId).forEach(cat => { // Solo categorías de nivel superior
        categoryFilter.innerHTML += `<option value="${cat.id}">${cat.name}</option>`;
    });

    // Listener para el campo de búsqueda
    inventorySearch.addEventListener('input', () => {
        renderInventoryTable(inventorySearch.value, categoryFilter.value);
    });

    // Listener para el filtro de categoría
    categoryFilter.addEventListener('change', () => {
        renderInventoryTable(inventorySearch.value, categoryFilter.value);
    });
}

// Exporta las funciones para que puedan ser utilizadas por otros módulos (ej. navigation.js)
export { renderInventoryTable, setupInventoryListeners };
