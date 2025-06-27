// js/ui/clients.js
import { DataService } from '../data/dataService.js';
import { openClientABMModal } from './clientABM.js'; // Importa la función para abrir el modal ABM

// Elementos DOM de la sección de clientes
const clientsTableBody = document.getElementById('clientsTableBody');

/**
 * Renderiza la tabla de clientes en la sección de Clientes.
 */
function renderClientsTable() {
    clientsTableBody.innerHTML = ''; // Limpia la tabla existente
    const clients = DataService.getClients(); // Obtiene los datos de clientes

    if (clients.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `<td colspan="6" class="table-cell text-center text-sm text-[#6C757D] py-4">No hay clientes registrados.</td>`;
        clientsTableBody.appendChild(row);
        return;
    }

    // Ordena los clientes por nombre
    clients.sort((a, b) => a.name.localeCompare(b.name));

    clients.forEach(client => {
        const row = document.createElement('tr');
        row.className = 'hover:bg-[#F8F9FA] cursor-pointer border-b border-[#E0E0E0] last:border-b-0';
        // Asigna un event listener a cada fila para abrir el modal de detalles/ABM del cliente
        // Esto permite hacer clic en cualquier parte de la fila para ver/editar.
        row.onclick = () => openClientABMModal(client.id);

        const balanceClass = client.balance > 0 ? 'text-[#28A745]' : (client.balance < 0 ? 'text-[#DC3545]' : 'text-[#333333]');
        // Mostrar estrellas llenas y vacías para la calificación
        const ratingStars = '⭐'.repeat(client.rating || 0) + '☆'.repeat(5 - (client.rating || 0));

        row.innerHTML = `
            <td class="table-cell text-xs font-mono text-[#6C757D]">${client.id}</td>
            <td class="table-cell text-sm font-medium text-[#333333]">${client.name}</td>
            <td class="table-cell text-sm text-[#333333]">${client.contact || 'N/A'}</td>
            <td class="table-cell text-sm font-semibold ${balanceClass}">$ ${client.balance.toFixed(2)}</td>
            <td class="table-cell text-sm text-[#FFC107]">${ratingStars}</td>
            <td class="table-cell text-sm">
                <div class="flex items-center space-x-4"> <!-- Aumentado de space-x-2 a space-x-4 para más separación -->
                    <!-- Botón/Icono para Editar -->
                    <button class="text-[#007BFF] hover:text-[#0056b3] transition-colors p-1 rounded-md" 
                            title="Editar Cliente"
                            onclick="event.stopPropagation(); openClientABMModal('${client.id}')">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-7-9l4 4m-4-4l-9 9V17h4l9-9zm0 0L21 3"></path></svg>
                    </button>
                    <!-- Botón para Ver Cuenta -->
                    <button class="px-3 py-1 bg-[#28A745]/10 text-[#28A745] rounded-md hover:bg-[#28A745]/20 transition-colors text-xs whitespace-nowrap" 
                            onclick="event.stopPropagation(); openClientABMModal('${client.id}')">
                        Ver Cuenta
                    </button>
                </div>
            </td>
        `;
        clientsTableBody.appendChild(row);
    });
}

// Exporta la función para que pueda ser llamada por otros módulos (ej. navigation.js)
export { renderClientsTable };
