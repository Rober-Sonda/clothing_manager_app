// js/ui/clientABM.js
import { DataService } from '../data/dataService.js';
import { renderClientsTable } from './clients.js'; // Importa para volver a renderizar la tabla de clientes

// Elementos DOM del modal ABM de clientes
const clientABMModal = document.getElementById('clientABMModal');
const clientABMModalTitle = document.getElementById('clientABMModalTitle');
const clientABMForm = document.getElementById('clientABMForm');
const clientIdInput = document.getElementById('client-id-input');
const clientNameInput = document.getElementById('client-name-input');
const clientContactInput = document.getElementById('client-contact-input');
const clientNotesInput = document.getElementById('client-notes-input');
const clientBalanceDisplay = document.getElementById('client-balance-display');
const clientTransactionsHistory = document.getElementById('client-transactions-history');
const addTransactionBtn = document.getElementById('add-transaction-btn');
const transactionAmountInput = document.getElementById('transaction-amount-input');
const transactionTypeSelect = document.getElementById('transaction-type-select');
const transactionDescriptionInput = document.getElementById('transaction-description-input');
const saveClientBtn = document.getElementById('save-client-btn');
const deleteClientBtn = document.getElementById('delete-client-btn');

let currentClientId = null; // Para saber si estamos editando o creando

/**
 * Configura los listeners de eventos para el ABM de clientes.
 */
function setupClientABMListeners() {
    if (clientABMForm) {
        clientABMForm.addEventListener('submit', handleSaveClient);
    }
    if (deleteClientBtn) {
        deleteClientBtn.addEventListener('click', handleDeleteClient);
    }
    if (addTransactionBtn) {
        addTransactionBtn.addEventListener('click', handleAddTransaction);
    }
    // Listener para el botón "Nuevo Cliente" en la sección de clientes
    const addClientButton = document.getElementById('add-client-btn');
    if (addClientButton) {
        addClientButton.addEventListener('click', () => openClientABMModal());
    }
    console.log("Listeners de ABM de clientes configurados.");
}

/**
 * Abre el modal de ABM de clientes para crear o editar.
 * @param {string|null} clientId - El ID del cliente a editar, o null para crear uno nuevo.
 */
function openClientABMModal(clientId = null) {
    clientABMForm.reset(); // Limpia el formulario
    clientTransactionsHistory.innerHTML = ''; // Limpia el historial de transacciones
    clientBalanceDisplay.textContent = '$0.00'; // Resetea el saldo

    currentClientId = clientId;

    if (clientId) {
        clientABMModalTitle.textContent = 'Editar Cliente';
        saveClientBtn.textContent = 'Guardar Cambios';
        deleteClientBtn.classList.remove('hidden');

        const client = DataService.getClientById(clientId);
        if (client) {
            clientIdInput.value = client.id;
            clientNameInput.value = client.name;
            clientContactInput.value = client.contact;
            clientNotesInput.value = client.notes || '';
            clientBalanceDisplay.textContent = `$${client.balance.toFixed(2)}`;
            renderClientTransactions(client.transactions);
        }
    } else {
        clientABMModalTitle.textContent = 'Nuevo Cliente';
        saveClientBtn.textContent = 'Crear Cliente';
        deleteClientBtn.classList.add('hidden');
    }

    clientABMModal.classList.remove('hidden', 'opacity-0');
    clientABMModal.classList.add('opacity-100');
}

/**
 * Cierra el modal de ABM de clientes.
 */
function closeClientABMModal() {
    clientABMModal.classList.add('opacity-0');
    clientABMModal.classList.add('hidden'); // Ocultar después de la transición
    setTimeout(() => {
        clientABMModal.classList.add('hidden');
    }, 300); // Coincide con la duración de la transición en CSS
}

/**
 * Maneja el envío del formulario para guardar un cliente (crear o actualizar).
 * @param {Event} event - El evento de envío del formulario.
 */
function handleSaveClient(event) {
    event.preventDefault(); // Previene el envío del formulario tradicional

    const clientData = {
        name: clientNameInput.value,
        contact: clientContactInput.value,
        notes: clientNotesInput.value,
        rating: 0 // Valor inicial o se obtiene de la UI si se añade
    };

    if (currentClientId) {
        DataService.updateClient(currentClientId, clientData);
    } else {
        DataService.addClient(clientData);
    }

    renderClientsTable(); // Vuelve a renderizar la tabla de clientes
    closeClientABMModal();
}

/**
 * Maneja la eliminación de un cliente.
 */
function handleDeleteClient() {
    if (currentClientId && confirm('¿Estás seguro de que quieres eliminar este cliente?')) { // Nota: confirm() solo para mock, usar modal custom
        DataService.deleteClient(currentClientId);
        renderClientsTable();
        closeClientABMModal();
    }
}

/**
 * Maneja la adición de una transacción a la cuenta corriente del cliente.
 */
function handleAddTransaction() {
    if (!currentClientId) {
        console.warn("No se puede agregar transacción sin un cliente seleccionado.");
        return;
    }

    const amount = parseFloat(transactionAmountInput.value);
    const type = transactionTypeSelect.value;
    const description = transactionDescriptionInput.value;

    if (isNaN(amount) || amount === 0) {
        alert("Por favor, introduce un monto válido."); // Nota: alert() solo para mock
        return;
    }

    // Si el tipo es 'compra', el monto se suma al balance (es un débito para el cliente)
    // Si el tipo es 'pago', el monto se resta del balance (es un crédito para el cliente)
    const finalAmount = (type === 'compra') ? amount : -amount;

    const updatedClient = DataService.addClientTransaction(currentClientId, finalAmount, type, description);
    if (updatedClient) {
        clientBalanceDisplay.textContent = `$${updatedClient.balance.toFixed(2)}`;
        renderClientTransactions(updatedClient.transactions);
        transactionAmountInput.value = '';
        transactionDescriptionInput.value = '';
        renderClientsTable(); // Actualiza la tabla principal de clientes
    }
}

/**
 * Renderiza el historial de transacciones en el modal.
 * @param {Array<object>} transactions - Array de transacciones del cliente.
 */
function renderClientTransactions(transactions) {
    clientTransactionsHistory.innerHTML = '';
    if (transactions && transactions.length > 0) {
        transactions.forEach(t => {
            const transactionEl = document.createElement('div');
            transactionEl.className = 'flex justify-between items-center py-1 border-b border-[#F0F2F5] last:border-b-0';
            const amountClass = t.amount >= 0 ? 'text-[#28A745]' : 'text-[#DC3545]'; // Verde para ingresos (pagos), rojo para egresos (compras)
            transactionEl.innerHTML = `
                <span>${t.date} - ${t.description || t.type}:</span>
                <span class="font-bold ${amountClass}">$${t.amount.toFixed(2)}</span>
            `;
            clientTransactionsHistory.appendChild(transactionEl);
        });
    } else {
        clientTransactionsHistory.innerHTML = '<p class="text-[#6C757D]">No hay transacciones.</p>';
    }
}

export { setupClientABMListeners, openClientABMModal, closeClientABMModal };
