// js/ui/purchaseOrdersABM.js
import { DataService } from '../data/dataService.js';
import { getProductByVariantId } from '../data/dataService.js'; // Importar helper

const purchaseOrdersTableBody = document.getElementById('purchaseOrdersTableBody');
const internalPurchaseCartList = document.getElementById('internalPurchaseCartList');
const internalPurchaseCartTotal = document.getElementById('internalPurchaseCartTotal');
const generatePurchaseOrdersBtn = document.getElementById('generate-purchase-orders-btn');
const newPurchaseOrderBtn = document.getElementById('new-purchase-order-btn');

/**
 * Configura los listeners para la sección de Órdenes de Compra y el carrito interno.
 */
function setupPurchaseOrderABMListeners() {
    if (generatePurchaseOrdersBtn) {
        generatePurchaseOrdersBtn.addEventListener('click', handleGeneratePurchaseOrders);
    }
    if (newPurchaseOrderBtn) {
        newPurchaseOrderBtn.addEventListener('click', handleNewPurchaseOrderClick);
    }
    console.log("Listeners de ABM de Órdenes de Compra configurados.");
}

/**
 * Renderiza la tabla de órdenes de compra existentes.
 */
function renderPurchaseOrdersTable() {
    purchaseOrdersTableBody.innerHTML = '';
    const orders = DataService.getPurchaseOrders();
    const suppliers = DataService.getSuppliers();

    if (orders.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `<td colspan="7" class="table-cell text-center text-sm text-[#6C757D] py-4">No hay órdenes de compra registradas.</td>`;
        purchaseOrdersTableBody.appendChild(row);
        return;
    }

    orders.forEach(order => {
        const supplier = suppliers.find(s => s.id === order.supplierId);
        const row = document.createElement('tr');
        row.className = 'hover:bg-[#F8F9FA] cursor-pointer border-b border-[#E0E0E0] last:border-b-0';
        row.innerHTML = `
            <td class="table-cell text-xs font-mono text-[#6C757D]">${order.id}</td>
            <td class="table-cell text-sm font-medium text-[#333333]">${supplier ? supplier.name : 'N/A'}</td>
            <td class="table-cell text-sm text-[#333333]">${order.orderDate}</td>
            <td class="table-cell text-sm text-[#333333]">${order.status}</td>
            <td class="table-cell text-sm font-semibold text-[#6F42C1]">$ ${order.totalEstimatedAmount.toFixed(2)}</td>
            <td class="table-cell text-sm font-semibold text-[#28A745]">$ ${order.totalFinalAmount.toFixed(2)}</td>
            <td class="table-cell text-sm">
                <button class="px-3 py-1 bg-[#007BFF]/10 text-[#007BFF] rounded-md hover:bg-[#007BFF]/20 transition-colors text-xs mr-2" onclick="editPurchaseOrder('${order.id}')">Editar</button>
                <button class="px-3 py-1 bg-[#DC3545]/10 text-[#DC3545] rounded-md hover:bg-[#DC3545]/20 transition-colors text-xs" onclick="deletePurchaseOrder('${order.id}')">Eliminar</button>
            </td>
        `;
        purchaseOrdersTableBody.appendChild(row);
    });
}

/**
 * Renderiza el carrito de compras interno para generar órdenes.
 */
function renderInternalPurchaseCart() {
    internalPurchaseCartList.innerHTML = '';
    const cartItems = DataService.getInternalPurchaseCart();
    let totalEstimated = 0;

    if (cartItems.length === 0) {
        internalPurchaseCartList.innerHTML = '<li class="text-[#6C757D]">El carrito está vacío. Agrega ítems desde la vista de Inventario.</li>';
    } else {
        cartItems.forEach(item => {
            const variant = DataService.getVariantById(item.variantId);
            const product = variant ? getProductByVariantId(variant.id) : null;
            const supplier = DataService.getSupplierById(item.supplierId);
            const itemTotal = item.quantity * item.estimatedCost;
            totalEstimated += itemTotal;

            if (variant && product && supplier) {
                const li = document.createElement('li');
                li.className = 'flex justify-between items-center py-1 border-b border-[#F0F2F5] last:border-b-0';
                li.innerHTML = `
                    <span>${product.name} (${variant.color || ''}, ${variant.size || ''}) x${item.quantity} de ${supplier.name}</span>
                    <span class="font-bold">$${itemTotal.toFixed(2)} 
                        <button class="ml-2 text-[#DC3545] hover:text-[#a71d2a] text-sm" onclick="removeItemFromInternalPurchaseCart('${item.variantId}', '${item.supplierId}')">&times;</button>
                    </span>
                `;
                internalPurchaseCartList.appendChild(li);
            }
        });
    }
    internalPurchaseCartTotal.textContent = `$${totalEstimated.toFixed(2)}`;
}

/**
 * Maneja el clic en "Nueva Orden de Compra" (abrirá un modal o formulario si existiera).
 */
function handleNewPurchaseOrderClick() {
    alert("Funcionalidad 'Nueva Orden de Compra' no implementada. Usa 'Generar Órdenes de Compra' desde el carrito interno.");
    // Aquí se podría abrir un modal para crear una orden de compra vacía o desde cero
}

/**
 * Genera órdenes de compra separadas por proveedor a partir del carrito interno.
 */
function handleGeneratePurchaseOrders() {
    const cartItems = DataService.getInternalPurchaseCart();
    if (cartItems.length === 0) {
        alert("El carrito de compra interno está vacío. Agrega productos primero.");
        return;
    }

    // Agrupa los ítems del carrito por proveedor
    const ordersBySupplier = {};
    cartItems.forEach(item => {
        if (!ordersBySupplier[item.supplierId]) {
            ordersBySupplier[item.supplierId] = {
                supplierId: item.supplierId,
                items: []
            };
        }
        ordersBySupplier[item.supplierId].items.push({
            variantId: item.variantId,
            quantityRequested: item.quantity,
            estimatedCost: item.estimatedCost
        });
    });

    let generatedCount = 0;
    for (const supplierId in ordersBySupplier) {
        const orderData = ordersBySupplier[supplierId];
        DataService.addPurchaseOrder(orderData);
        generatedCount++;
    }

    DataService.clearInternalPurchaseCart(); // Vacía el carrito después de generar las órdenes
    renderPurchaseOrdersTable(); // Vuelve a renderizar la tabla de órdenes
    renderInternalPurchaseCart(); // Vuelve a renderizar el carrito (ahora vacío)
    alert(`Se generaron ${generatedCount} órdenes de compra.`); // Nota: alert() solo para mock
}

/**
 * Función global para eliminar un ítem del carrito interno (llamado desde HTML).
 */
window.removeItemFromInternalPurchaseCart = (variantId, supplierId) => {
    DataService.removeItemFromInternalPurchaseCart(variantId, supplierId);
    renderInternalPurchaseCart(); // Vuelve a renderizar el carrito
};

/**
 * Función global para editar una orden de compra (llamado desde HTML).
 * En una implementación real, esto abriría un modal de edición.
 */
window.editPurchaseOrder = (orderId) => {
    const order = DataService.getPurchaseOrders().find(o => o.id === orderId);
    if (order) {
        alert(`Editando Orden de Compra: ${order.id}\nEstado: ${order.status}\nProveedor: ${DataService.getSupplierById(order.supplierId)?.name || 'N/A'}\n(Esta funcionalidad de edición detallada requiere un modal o formulario dedicado)`);
        // Aquí iría la lógica para abrir un modal o formulario de edición detallada
        // con los datos de la orden.
    }
};

/**
 * Función global para eliminar una orden de compra (llamado desde HTML).
 */
window.deletePurchaseOrder = (orderId) => {
    if (confirm(`¿Estás seguro de que quieres eliminar la Orden de Compra ${orderId}?`)) { // Nota: confirm() solo para mock
        DataService.deletePurchaseOrder(orderId);
        renderPurchaseOrdersTable();
    }
};


export { setupPurchaseOrderABMListeners, renderPurchaseOrdersTable, renderInternalPurchaseCart };
