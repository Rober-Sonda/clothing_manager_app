// js/data/dataService.js
import { dataStore } from './dataStore.js';

// Este objeto proporciona métodos para obtener datos del dataStore.
// En una aplicación real, estos métodos interactuarían con consultas a Isar o llamadas a la API.
const DataService = {
    /**
     * Inicializa el servicio de datos. En un entorno real, aquí se configurarían
     * conexiones a bases de datos o se cargarían datos iniciales de una API.
     */
    initialize: function() {
        console.log("DataService inicializado, cargando datos de dataStore.js.");
        // Aquí podrías añadir lógica para cargar datos iniciales si fuera necesario,
        // por ejemplo, desde IndexedDB, LocalStorage, o una API real.
    },
    
    // --- Métodos de Consulta General ---
    getUsers: () => dataStore.users,
    getBrands: () => dataStore.brands, // Nuevo método para obtener marcas
    getProducts: () => dataStore.products,
    getVariants: (productId = null) => {
        if (productId) {
            return dataStore.variants.filter(v => v.productId === productId);
        }
        return dataStore.variants;
    },
    getCategories: () => dataStore.categories,
    getPropertyDefinitions: () => dataStore.propertyDefinitions,
    getSuppliers: () => dataStore.suppliers,
    getSales: () => dataStore.sales,
    getPurchaseOrders: () => dataStore.purchaseOrders,
    getFinancialEntries: () => dataStore.financialEntries,
    getCashRegisterClosures: () => dataStore.cashRegisterClosures,
    getClients: () => dataStore.clients,

    // --- Métodos para obtener elementos específicos por ID ---
    getUserById: (id) => dataStore.users.find(u => u.id === id),
    getProductById: (id) => dataStore.products.find(p => p.id === id),
    getVariantById: (id) => dataStore.variants.find(v => v.id === id),
    getCategoryById: (id) => dataStore.categories.find(c => c.id === id),
    getPropertyDefinitionById: (id) => dataStore.propertyDefinitions.find(pd => pd.id === id),
    getSupplierById: (id) => dataStore.suppliers.find(s => s.id === id),
    getClientById: (id) => dataStore.clients.find(c => c.id === id),
    getBrandById: (id) => dataStore.brands.find(b => b.id === id),

    // Helper para encontrar un producto por ID de variante
    getProductByVariantId: (variantId) => {
        const variant = dataStore.variants.find(v => v.id === variantId);
        return variant ? dataStore.products.find(p => p.id === variant.productId) : null;
    },

    // --- Métodos ABM para Clientes ---

    /**
     * Añade un nuevo cliente al dataStore.
     * @param {object} newClient - El objeto del nuevo cliente (sin ID, se generará uno).
     * @returns {object} El cliente añadido con su ID.
     */
    addClient: (newClient) => {
        // Genera un ID simple para el mock
        const newId = 'cli' + (dataStore.clients.length + 1).toString().padStart(3, '0');
        const clientToAdd = { ...newClient, id: newId, balance: 0.00, transactions: [] };
        dataStore.clients.push(clientToAdd);
        console.log("Cliente añadido:", clientToAdd);
        return clientToAdd;
    },

    /**
     * Actualiza un cliente existente en el dataStore.
     * @param {string} clientId - El ID del cliente a actualizar.
     * @param {object} updatedFields - Un objeto con los campos a actualizar.
     * @returns {object|null} El cliente actualizado, o null si no se encuentra.
     */
    updateClient: (clientId, updatedFields) => {
        const clientIndex = dataStore.clients.findIndex(c => c.id === clientId);
        if (clientIndex > -1) {
            dataStore.clients[clientIndex] = { ...dataStore.clients[clientIndex], ...updatedFields };
            console.log("Cliente actualizado:", dataStore.clients[clientIndex]);
            return dataStore.clients[clientIndex];
        }
        console.warn("Cliente no encontrado para actualizar:", clientId);
        return null;
    },

    /**
     * Elimina un cliente del dataStore.
     * @param {string} clientId - El ID del cliente a eliminar.
     * @returns {boolean} True si el cliente fue eliminado, false en caso contrario.
     */
    deleteClient: (clientId) => {
        const initialLength = dataStore.clients.length;
        dataStore.clients = dataStore.clients.filter(c => c.id !== clientId);
        const wasDeleted = dataStore.clients.length < initialLength;
        if (wasDeleted) {
            console.log("Cliente eliminado:", clientId);
        } else {
            console.warn("Cliente no encontrado para eliminar:", clientId);
        }
        return wasDeleted;
    },

    // --- Métodos para Cuentas Corrientes ---

    /**
     * Añade una transacción a la cuenta corriente de un cliente.
     * @param {string} clientId - El ID del cliente.
     * @param {number} amount - El monto de la transacción (positivo para ingresos, negativo para egresos).
     * @param {string} type - Tipo de transacción (ej., 'compra', 'pago').
     * @param {string} description - Descripción de la transacción.
     * @returns {object|null} El cliente con la cuenta corriente actualizada, o null si no se encuentra el cliente.
     */
    addClientTransaction: (clientId, amount, type, description = '') => {
        const client = DataService.getClientById(clientId);
        if (client) {
            const transaction = {
                date: new Date().toISOString().split('T')[0], // Formato YYYY-MM-DD
                amount: amount,
                type: type,
                description: description
            };
            client.balance += amount;
            client.transactions.push(transaction);
            console.log(`Transacción de ${amount} tipo '${type}' añadida al cliente ${client.name}. Nuevo saldo: ${client.balance}`);
            return client;
        }
        console.warn("Cliente no encontrado para añadir transacción:", clientId);
        return null;
    },

    /**
     * Obtiene el saldo actual de la cuenta corriente de un cliente.
     * @param {string} clientId - El ID del cliente.
     * @returns {number|null} El saldo actual, o null si el cliente no se encuentra.
     */
    getClientCurrentBalance: (clientId) => {
        const client = DataService.getClientById(clientId);
        return client ? client.balance : null;
    },

    /**
     * Obtiene el historial de transacciones de la cuenta corriente de un cliente.
     * @param {string} clientId - El ID del cliente.
     * @returns {Array<object>|null} Un array de transacciones, o null si el cliente no se encuentra.
     */
    getClientTransactionHistory: (clientId) => {
        const client = DataService.getClientById(clientId);
        return client ? client.transactions : null;
    },

    // --- Métodos para el Carrito de Compras Interno (Órdenes de Compra) ---

    /**
     * Añade una variante de producto al carrito de compras interno para órdenes de compra.
     * Si la variante ya existe, incrementa la cantidad.
     * @param {string} variantId - El ID de la variante a añadir.
     * @param {string} supplierId - El ID del proveedor seleccionado para esta variante.
     * @param {number} quantity - La cantidad a añadir.
     * @returns {boolean} True si se añadió/actualizó, false si la variante o proveedor no se encuentra.
     */
    addItemToInternalPurchaseCart: (variantId, supplierId, quantity = 1) => {
        const variant = DataService.getVariants().find(v => v.id === variantId);
        const supplierInfo = dataStore.variantSuppliers[variantId]?.find(vs => vs.supplierId === supplierId);

        if (!variant || !supplierInfo) {
            console.warn("Variante o proveedor no encontrado para añadir al carrito de compra interno.");
            return false;
        }

        const existingItemIndex = dataStore.internalPurchaseCart.findIndex(
            item => item.variantId === variantId && item.supplierId === supplierId
        );

        if (existingItemIndex > -1) {
            dataStore.internalPurchaseCart[existingItemIndex].quantity += quantity;
        } else {
            dataStore.internalPurchaseCart.push({
                variantId: variantId,
                supplierId: supplierId,
                quantity: quantity,
                estimatedCost: supplierInfo.cost // Costo sugerido del proveedor
            });
        }
        console.log("Ítem añadido/actualizado en el carrito de compra interno:", dataStore.internalPurchaseCart);
        return true;
    },

    /**
     * Elimina un ítem del carrito de compras interno.
     * @param {string} variantId - El ID de la variante a eliminar.
     * @param {string} supplierId - El ID del proveedor asociado al ítem.
     * @returns {boolean} True si se eliminó, false si no se encontró.
     */
    removeItemFromInternalPurchaseCart: (variantId, supplierId) => {
        const initialLength = dataStore.internalPurchaseCart.length;
        dataStore.internalPurchaseCart = dataStore.internalPurchaseCart.filter(
            item => !(item.variantId === variantId && item.supplierId === supplierId)
        );
        const wasRemoved = dataStore.internalPurchaseCart.length < initialLength;
        if (!wasRemoved) {
            console.warn("Ítem no encontrado en el carrito de compra interno para eliminar.");
        }
        return wasRemoved;
    },

    /**
     * Obtiene el contenido actual del carrito de compras interno.
     * @returns {Array<object>} Un array de ítems en el carrito.
     */
    getInternalPurchaseCart: () => {
        return [...dataStore.internalPurchaseCart]; // Retorna una copia para evitar mutaciones directas
    },

    /**
     * Vacía el carrito de compras interno.
     */
    clearInternalPurchaseCart: () => {
        dataStore.internalPurchaseCart = [];
        console.log("Carrito de compra interno vaciado.");
    },

    // --- Métodos ABM para Órdenes de Compra (ejemplo) ---
    /**
     * Añade una nueva orden de compra.
     * @param {object} newOrder - La nueva orden de compra a añadir.
     * @returns {object} La orden de compra añadida.
     */
    addPurchaseOrder: (newOrder) => {
        const newId = 'po' + (dataStore.purchaseOrders.length + 1).toString().padStart(3, '0');
        const orderToAdd = {
            ...newOrder,
            id: newId,
            orderDate: new Date().toISOString().split('T')[0],
            status: newOrder.status || 'Pendiente',
            totalEstimatedAmount: newOrder.items.reduce((sum, item) => sum + (item.quantityRequested * item.estimatedCost), 0),
            totalFinalAmount: 0 // Se actualiza al recibir
        };
        dataStore.purchaseOrders.push(orderToAdd);
        console.log("Orden de compra añadida:", orderToAdd);
        return orderToAdd;
    },

    /**
     * Actualiza una orden de compra existente.
     * @param {string} orderId - El ID de la orden de compra a actualizar.
     * @param {object} updatedFields - Campos a actualizar.
     * @returns {object|null} La orden de compra actualizada.
     */
    updatePurchaseOrder: (orderId, updatedFields) => {
        const orderIndex = dataStore.purchaseOrders.findIndex(po => po.id === orderId);
        if (orderIndex > -1) {
            dataStore.purchaseOrders[orderIndex] = { ...dataStore.purchaseOrders[orderIndex], ...updatedFields };
            // Recalcula el total final si los ítems o finalCost cambian
            if (updatedFields.items) {
                dataStore.purchaseOrders[orderIndex].totalFinalAmount = updatedFields.items.reduce((sum, item) => sum + (item.quantityRequested * (item.finalCost || item.estimatedCost)), 0);
            }
            console.log("Orden de compra actualizada:", dataStore.purchaseOrders[orderIndex]);
            return dataStore.purchaseOrders[orderIndex];
        }
        console.warn("Orden de compra no encontrada para actualizar:", orderId);
        return null;
    },

    /**
     * Elimina una orden de compra.
     * @param {string} orderId - El ID de la orden de compra a eliminar.
     * @returns {boolean} True si fue eliminada.
     */
    deletePurchaseOrder: (orderId) => {
        const initialLength = dataStore.purchaseOrders.length;
        dataStore.purchaseOrders = dataStore.purchaseOrders.filter(po => po.id !== orderId);
        return dataStore.purchaseOrders.length < initialLength;
    },

    // --- Métodos de Autenticación (Mock) ---
    /**
     * Simula el login de un usuario.
     * @param {string} username - Nombre de usuario.
     * @param {string} password - Contraseña.
     * @returns {object|null} El objeto de usuario si las credenciales son válidas, de lo contrario null.
     */
    loginUser: (username, password) => {
        const user = dataStore.users.find(u => u.username === username && u.password === password);
        if (user) {
            console.log(`Usuario ${username} logueado con rol: ${user.role}`);
            return user;
        }
        console.warn("Credenciales de login inválidas para:", username);
        return null;
    },

    // Exportar el dataStore directamente para relaciones complejas o para inspección
    dataStore: dataStore
};

export { DataService };
