// js/ui/salesPOS.js
// Este módulo manejará la lógica específica de la UI del Punto de Venta (POS).

// Importa DataService para interactuar con los datos.
import { DataService } from '../data/dataService.js';

// Elementos DOM del POS
const salesCartList = document.getElementById('salesCartList');
const salesCartTotal = document.getElementById('salesCartTotal');
const processSaleBtn = document.querySelector('#sales-section button.bg-[#28A745]'); // Botón "Procesar Venta"
const salesProductSearchInput = document.querySelector('#sales-section input[type="text"]'); // Campo de búsqueda de productos en POS

let currentSalesCart = []; // Carrito de ventas temporal para la sesión actual del POS

/**
 * Inicializa los listeners específicos de la UI del POS.
 */
function setupSalesPOSListeners() {
    if (processSaleBtn) {
        processSaleBtn.addEventListener('click', handleProcessSale);
    }
    if (salesProductSearchInput) {
        salesProductSearchInput.addEventListener('keypress', handleProductSearchEnter);
        // Podríamos añadir un listener 'input' más complejo para búsqueda en tiempo real
    }
    renderSalesCart(); // Renderiza el carrito vacío al inicio
    console.log("Listeners de POS de ventas configurados.");
}

/**
 * Maneja la búsqueda de productos en el POS al presionar Enter.
 * Simula la adición de un producto al carrito.
 */
function handleProductSearchEnter(event) {
    if (event.key === 'Enter') {
        const searchTerm = salesProductSearchInput.value.trim();
        if (searchTerm) {
            // Simula la búsqueda y añade la primera variante encontrada
            const foundVariant = DataService.getVariants().find(
                v => v.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                     DataService.getProductByVariantId(v.id)?.name.toLowerCase().includes(searchTerm.toLowerCase())
            );

            if (foundVariant) {
                addItemToSalesCart(foundVariant.id, 1);
                salesProductSearchInput.value = ''; // Limpia el input
            } else {
                alert("Producto no encontrado."); // Nota: alert() solo para mock
            }
        }
    }
}

/**
 * Añade un ítem al carrito de ventas.
 * @param {string} variantId - ID de la variante del producto.
 * @param {number} quantity - Cantidad a añadir.
 */
function addItemToSalesCart(variantId, quantity) {
    const variant = DataService.getVariantById(variantId);
    if (!variant) {
        console.warn("Variante no encontrada:", variantId);
        return;
    }

    const existingItemIndex = currentSalesCart.findIndex(item => item.variantId === variantId);

    if (existingItemIndex > -1) {
        currentSalesCart[existingItemIndex].quantity += quantity;
    } else {
        currentSalesCart.push({
            variantId: variantId,
            quantity: quantity,
            price: variant.price // Precio de venta de la variante
        });
    }
    renderSalesCart();
}

/**
 * Renderiza los ítems en el carrito de ventas y actualiza el total.
 */
function renderSalesCart() {
    salesCartList.innerHTML = '';
    let total = 0;

    if (currentSalesCart.length === 0) {
        salesCartList.innerHTML = '<li class="text-[#6C757D]">El carrito está vacío.</li>';
    } else {
        currentSalesCart.forEach(item => {
            const variant = DataService.getVariantById(item.variantId);
            const product = variant ? DataService.getProductByVariantId(variant.id) : null;
            if (variant && product) {
                const itemTotal = item.quantity * item.price;
                total += itemTotal;

                const li = document.createElement('li');
                li.className = 'flex justify-between items-center py-1 border-b border-[#F0F2F5] last:border-b-0';
                li.innerHTML = `
                    <span>${product.name} (${variant.color || ''}, ${variant.size || ''}) x${item.quantity}</span>
                    <span class="font-bold">$${itemTotal.toFixed(2)}
                        <button class="ml-2 text-[#DC3545] hover:text-[#a71d2a] text-sm" onclick="removeItemFromSalesCart('${item.variantId}')">&times;</button>
                    </span>
                `;
                salesCartList.appendChild(li);
            }
        });
    }
    salesCartTotal.textContent = `$${total.toFixed(2)}`;
}

/**
 * Elimina un ítem del carrito de ventas.
 * @param {string} variantId - ID de la variante a eliminar.
 */
window.removeItemFromSalesCart = (variantId) => { // Expuesto globalmente para onclick
    currentSalesCart = currentSalesCart.filter(item => item.variantId !== variantId);
    renderSalesCart();
};

/**
 * Maneja el procesamiento de la venta.
 */
function handleProcessSale() {
    if (currentSalesCart.length === 0) {
        alert("El carrito de ventas está vacío."); // Nota: alert() solo para mock
        return;
    }

    const totalAmount = parseFloat(salesCartTotal.textContent.replace('$', ''));
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    const currentUserId = 'user003'; // Asumimos un vendedor logueado para el mock

    const newSale = {
        userId: currentUserId,
        date: new Date().toISOString().split('T')[0] + ' ' + new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }),
        totalAmount: totalAmount,
        paymentMethod: paymentMethod,
        items: currentSalesCart.map(item => ({
            variantId: item.variantId,
            quantity: item.quantity,
            price: item.price
        }))
    };

    // Aquí se llamaría a DataService.addSale(newSale) en una implementación completa
    console.log("Procesando venta:", newSale);
    DataService.getSales().push(newSale); // Añade al mock directamente

    // Actualiza el stock de variantes (mock)
    newSale.items.forEach(soldItem => {
        const variant = DataService.getVariantById(soldItem.variantId);
        if (variant) {
            variant.stock -= soldItem.quantity;
            console.log(`Stock de ${variant.sku} actualizado a ${variant.stock}`);
        }
    });

    alert(`Venta procesada exitosamente. Total: $${totalAmount.toFixed(2)}`); // Nota: alert() solo para mock
    currentSalesCart = []; // Vacía el carrito
    renderSalesCart(); // Vuelve a renderizar el carrito (vacío)
    // También se podría renderizar la tabla de inventario si estuviera visible
}

export { setupSalesPOSListeners };
