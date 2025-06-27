// js/ui/ratings.js
import { DataService } from '../data/dataService.js';

// Elementos DOM para las listas de calificaciones
const productRatingsList = document.getElementById('productRatingsList');
const supplierRatingsList = document.getElementById('supplierRatingsList');
const clientRatingsList = document.getElementById('clientRatingsList');

/**
 * Renderiza las secciones de calificaciones para productos, proveedores y clientes.
 */
function renderRatingsSection() {
    console.log("Renderizando sección de calificaciones...");

    // Calificaciones de Productos
    productRatingsList.innerHTML = '';
    const products = DataService.getProducts();
    if (products.length === 0) {
        productRatingsList.innerHTML = '<li class="text-[#6C757D]">No hay productos para calificar.</li>';
    } else {
        products.sort((a,b) => b.rating - a.rating).forEach(product => {
            const li = document.createElement('li');
            li.className = 'flex items-center justify-between py-1 border-b border-[#F0F2F5] last:border-b-0';
            li.innerHTML = `
                <span class="text-[#333333]">${product.name}</span>
                <span class="font-bold text-[#FFC107]">${'⭐'.repeat(product.rating || 0)} (${product.rating || 0}/5)</span>
            `;
            productRatingsList.appendChild(li);
        });
    }

    // Calificaciones de Proveedores
    supplierRatingsList.innerHTML = '';
    const suppliers = DataService.getSuppliers();
    if (suppliers.length === 0) {
        supplierRatingsList.innerHTML = '<li class="text-[#6C757D]">No hay proveedores para calificar.</li>';
    } else {
        suppliers.sort((a,b) => b.rating - a.rating).forEach(supplier => {
            const li = document.createElement('li');
            li.className = 'flex items-center justify-between py-1 border-b border-[#F0F2F5] last:border-b-0';
            li.innerHTML = `
                <span class="text-[#333333]">${supplier.name}</span>
                <span class="font-bold text-[#FFC107]">${'⭐'.repeat(supplier.rating || 0)} (${supplier.rating || 0}/5)</span>
            `;
            supplierRatingsList.appendChild(li);
        });
    }

    // Calificaciones de Clientes
    clientRatingsList.innerHTML = '';
    const clients = DataService.getClients();
    if (clients.length === 0) {
        clientRatingsList.innerHTML = '<li class="text-[#6C757D]">No hay clientes para calificar.</li>';
    } else {
        clients.sort((a,b) => b.rating - a.rating).forEach(client => {
            const li = document.createElement('li');
            li.className = 'flex items-center justify-between py-1 border-b border-[#F0F2F5] last:border-b-0';
            li.innerHTML = `
                <span class="text-[#333333]">${client.name}</span>
                <span class="font-bold text-[#FFC107]">${'⭐'.repeat(client.rating || 0)} (${client.rating || 0}/5)</span>
            `;
            clientRatingsList.appendChild(li);
        });
    }
}

// Exporta la función para que pueda ser llamada por otros módulos (ej. navigation.js)
export { renderRatingsSection };
