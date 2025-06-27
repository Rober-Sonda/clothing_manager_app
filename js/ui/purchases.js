// js/ui/purchases.js
import { DataService } from '../data/dataService.js';

const purchaseOrdersTableBody = document.getElementById('purchaseOrdersTableBody');

/**
 * Renderiza la tabla de órdenes de compra.
 */
function renderPurchaseOrdersTable() {
    purchaseOrdersTableBody.innerHTML = ''; // Limpia la tabla existente
    const orders = DataService.getPurchaseOrders();

    orders.forEach(order => {
        const supplier = DataService.getSupplierById(order.supplierId);
        const row = document.createElement('tr');
        row.className = 'hover:bg-[#F8F9FA] cursor-pointer border-b border-[#E0E0E0] last:border-b-0';
        row.innerHTML = `
            <td class="table-cell text-xs font-mono text-[#6C757D]">${order.id}</td>
            <td class="table-cell text-sm font-medium text-[#333333]">${supplier ? supplier.name : 'Desconocido'}</td>
            <td class="table-cell text-sm text-[#333333]">${order.orderDate}</td>
            <td class="table-cell text-sm font-medium ${order.status === 'Pendiente' ? 'text-[#FFC107]' : 'text-[#28A745]'}">${order.status}</td>
            <td class="table-cell text-sm font-semibold text-[#007BFF]">$ ${order.totalEstimatedAmount.toFixed(2)}</td>
            <td class="table-cell">
                <button class="text-[#007BFF] hover:text-[#0056b3] text-sm">Ver Detalle</button>
            </td>
        `;
        purchaseOrdersTableBody.appendChild(row);
    });
}

export { renderPurchaseOrdersTable };
