// js/ui/modals.js
import { DataService } from '../data/dataService.js';

const productModal = document.getElementById('productModal');
let variantSalesHistoryChartInstance;

/**
 * Opens the product detail modal and populates it with variant information.
 * @param {string} variantId The ID of the product variant to display.
 */
function openModal(variantId) {
    const variant = DataService.getVariants().find(v => v.id === variantId);
    const product = DataService.getProducts().find(p => p.id === variant.productId);

    if (!variant || !product) {
        console.error('Variante o producto no encontrado para el ID:', variantId);
        return;
    }

    const modalProductName = document.getElementById('modalProductName');
    const modalProductCategory = document.getElementById('modalProductCategory');
    const modalProductImage = document.getElementById('modalProductImage');
    const modalProductDetails = document.getElementById('modalProductDetails');
    const modalProductSuppliers = document.getElementById('modalProductSuppliers');
    
    // Populates product information in the modal
    modalProductName.textContent = `${product.name} - ${variant.color || ''} ${variant.size && variant.size !== 'N/A' ? variant.size : ''}`.trim();
    modalProductCategory.textContent = DataService.getCategories()
        .filter(c => product.categoryIds.includes(c.id))
        .map(c => c.name)
        .join(', ');
    modalProductImage.src = variant.image || product.imagePaths[0] || 'https://placehold.co/600x400/F8F9FA/6C757D?text=Imagen+No+Disponible';

    // Builds HTML for product details
    let detailsHtml = `<p><strong>SKU:</strong> ${variant.sku}</p>`;
    detailsHtml += `<p><strong>Precio:</strong> $${variant.price.toFixed(2)}</p>`;
    detailsHtml += `<p><strong>Stock:</strong> ${variant.stock} unidades</p>`;
    detailsHtml += `<p><strong>Costo:</strong> $${variant.costPrice.toFixed(2)}</p>`;
    detailsHtml += `<p><strong>Descripción:</strong> ${product.description || 'N/A'}</p>`;
    
    // Adds dynamic properties
    // Note: In a real application, 'product.properties' and 'variant.variantProperties'
    // would hold more complex data; here they are only simulated.
    const allProperties = []; // No dynamic properties in the current mock, this would be if you had them.
    // Example of how you could add them if you had them:
    // if (variant.material) allProperties.push({ propertyDefinitionId: 'prop_material', value: variant.material });
    // if (variant.season) allProperties.push({ propertyDefinitionId: 'prop_temporada', value: variant.season });
    // etc.

    allProperties.forEach(prop => {
        const propDef = DataService.getPropertyDefinitions().find(pd => pd.id === prop.propertyDefinitionId);
        if (propDef) {
            detailsHtml += `<p><strong>${propDef.name}:</strong> ${prop.value}</p>`;
        }
    });

    modalProductDetails.innerHTML = detailsHtml;

    // Populates the supplier list
    const supplierNames = (DataService.dataStore.variantSuppliers[variantId] || []) // Direct access to the mock dataStore for this relationship
        .map(supId => {
            const supplier = DataService.getSupplierById(supId);
            return `<li>${supplier ? supplier.name : 'Desconocido'}</li>`;
        }).join('') || '<li>No asignado</li>';
    modalProductSuppliers.innerHTML = supplierNames;

    // Chart for variant sales history
    const variantSalesCtx = document.getElementById('variantSalesHistoryChart').getContext('2d');
    if (variantSalesHistoryChartInstance) {
        variantSalesHistoryChartInstance.destroy(); // Destroys the previous instance if it exists
    }
    variantSalesHistoryChartInstance = new Chart(variantSalesCtx, {
        type: 'bar',
        data: {
            labels: ['Mes 1', 'Mes 2', 'Mes 3', 'Mes 4', 'Mes 5', 'Mes 6'],
            datasets: [{
                label: 'Unidades Vendidas',
                data: variant.salesHistory,
                backgroundColor: '#007BFF' // Accent color
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y + ' unidades';
                        }
                    }
                }
            }
        }
    });

    // Displays the modal with a small delay for the transition
    productModal.classList.remove('hidden');
    setTimeout(() => {
        productModal.classList.add('modal-active');
    }, 10);
}

/**
 * Closes the product detail modal.
 */
function closeModal() {
    productModal.classList.remove('modal-active');
    setTimeout(() => {
        productModal.classList.add('hidden');
    }, 300); // Waits for the transition to finish
}

// Exports functions so they can be used in other modules (e.g., inventory.js)
export { openModal, closeModal };
