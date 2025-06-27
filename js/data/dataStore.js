// js/data/dataStore.js
// Este objeto contiene todos los datos mock. En una aplicación real,
// estos datos serían obtenidos de una base de datos real (ej., Isar) o una API.
const dataStore = {
    users: [
        { id: 'user001', username: 'admin', password: 'adminpassword', role: 'Administrador' }, // Añadido password para mock
        { id: 'user002', username: 'gerente', password: 'managerpassword', role: 'Gerente' },
        { id: 'user003', username: 'vendedor', password: 'salespassword', role: 'Vendedor' },
    ],
    brands: [ // Nueva colección de marcas
        { id: 'brand01', name: 'Estilo Urbano', logoPath: 'https://placehold.co/100x50/e2e8f0/4a5568?text=Marca1' },
        { id: 'brand02', name: 'Elegancia Clásica', logoPath: 'https://placehold.co/100x50/e2e8f0/4a5568?text=Marca2' },
        { id: 'brand03', name: 'Aroma Divino', logoPath: 'https://placehold.co/100x50/e2e8f0/4a5568?text=Marca3' },
    ],
    products: [
        { id: 'prod001', name: 'Remera Básica', description: 'Remera de algodón 100% corte clásico.', brandId: 'brand01', categoryIds: ['cat01', 'cat01-1'], imagePaths: ['https://placehold.co/600x400/e2e8f0/4a5568?text=Remera+Básica'], rating: 5 },
        { id: 'prod002', name: 'Reloj Cronógrafo', description: 'Reloj elegante con cronógrafo y correa de cuero.', brandId: 'brand02', categoryIds: ['cat02', 'cat02-1'], imagePaths: ['https://placehold.co/600x400/e2e8f0/4a5568?text=Reloj'], rating: 4 },
        { id: 'prod003', name: 'Perfume Cítrico', description: 'Fragancia fresca con notas de limón y bergamota.', brandId: 'brand03', categoryIds: ['cat03'], imagePaths: ['https://placehold.co/600x400/e2e8f0/4a5568?text=Perfume'], rating: 5 },
        { id: 'prod004', name: 'Pantalón Cargo', description: 'Pantalón estilo cargo de gabardina resistente.', brandId: 'brand01', categoryIds: ['cat01', 'cat01-2'], imagePaths: ['https://placehold.co/600x400/e2e8f0/4a5568?text=Pantalón'], rating: 4 }
    ],
    variants: [
        { id: 'var001', productId: 'prod001', sku: 'REM-BAS-M-ROJ', color: 'Rojo', size: 'M', season: 'Verano 2025', stock: 50, price: 25.00, costPrice: 10.00, image: 'https://placehold.co/600x400/ef4444/ffffff?text=Remera+Roja', salesHistory: [12, 19, 3, 5, 2, 3] },
        { id: 'var002', productId: 'prod001', sku: 'REM-BAS-L-AZU', color: 'Azul', size: 'L', season: 'Verano 2025', stock: 30, price: 25.00, costPrice: 10.00, image: 'https://placehold.co/600x400/3b82f6/ffffff?text=Remera+Azul', salesHistory: [8, 15, 7, 5, 6, 4] },
        { id: 'var003', productId: 'prod001', sku: 'REM-BAS-S-NEG', color: 'Negro', size: 'S', season: 'Verano 2025', stock: 8, price: 25.00, costPrice: 11.00, image: 'https://placehold.co/600x400/1f2937/ffffff?text=Remera+Negra', salesHistory: [4, 3, 5, 2, 1, 0] },
        { id: 'var004', productId: 'prod002', sku: 'REL-CRO-NEG', color: 'Negro', size: 'Única', material: 'Cuero', mechanism: 'Cuarzo', stock: 15, price: 150.00, costPrice: 70.00, image: 'https://placehold.co/600x400/374151/ffffff?text=Reloj+Negro', salesHistory: [4, 3, 5, 2, 1, 0] },
        { id: 'var005', productId: 'prod003', sku: 'PER-CIT-100', color: 'N/A', size: '100ml', fragrance: 'Cítrica', stock: 40, price: 80.00, costPrice: 35.00, image: 'https://placehold.co/600x400/facc15/ffffff?text=Perfume', salesHistory: [10, 12, 15, 11, 13, 14] },
        { id: 'var006', productId: 'prod004', sku: 'PANT-CARGO-32', color: 'Verde', size: '32', stock: 20, price: 60.00, costPrice: 25.00, image: 'https://placehold.co/600x400/4CAF50/ffffff?text=Pantalón+Verde', salesHistory: [7, 8, 5, 9, 6, 10] }
    ],
    categories: [
        { id: 'cat01', name: 'Ropa', parentId: null, suggestedPropertyDefinitionIds: ['prop_talla', 'prop_color', 'prop_temporada', 'prop_tela'] },
        { id: 'cat01-1', name: 'Remeras', parentId: 'cat01', suggestedPropertyDefinitionIds: ['prop_talla', 'prop_color', 'prop_tipo_manga'] },
        { id: 'cat01-2', name: 'Pantalones', parentId: 'cat01', suggestedPropertyDefinitionIds: ['prop_talla', 'prop_color', 'prop_corte'] },
        { id: 'cat02', name: 'Accesorios', parentId: null, suggestedPropertyDefinitionIds: ['prop_material', 'prop_color'] },
        { id: 'cat02-1', name: 'Relojes', parentId: 'cat02', suggestedPropertyDefinitionIds: ['prop_material', 'prop_mecanismo', 'prop_resistencia_agua'] },
        { id: 'cat03', name: 'Perfumes', parentId: null, suggestedPropertyDefinitionIds: ['prop_fragancia', 'prop_volumen'] }
    ],
    propertyDefinitions: [
        { id: 'prop_talla', name: 'Talla', type: 'selection', allowedValues: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], isGlobal: true },
        { id: 'prop_color', name: 'Color', type: 'text', allowedValues: [], isGlobal: true },
        { id: 'prop_temporada', name: 'Temporada', type: 'selection', allowedValues: ['Primavera-Verano', 'Otoño-Invierno', 'Todo el año'], isGlobal: true },
        { id: 'prop_tela', name: 'Tipo de Tela', type: 'selection', allowedValues: ['Algodón', 'Lino', 'Poliéster', 'Gabardina'], isGlobal: false },
        { id: 'prop_tipo_manga', name: 'Tipo de Manga', type: 'selection', allowedValues: ['Corta', 'Larga', '3/4', 'Sin Mangas'], isGlobal: false },
        { id: 'prop_corte', name: 'Corte', type: 'selection', allowedValues: ['Slim Fit', 'Regular Fit', 'Relaxed Fit', 'Bootcut'], isGlobal: false },
        { id: 'prop_material', name: 'Material', type: 'text', allowedValues: [], isGlobal: true },
        { id: 'prop_mecanismo', name: 'Mecanismo', type: 'selection', allowedValues: ['Cuarzo', 'Automático', 'Manual'], isGlobal: false },
        { id: 'prop_resistencia_agua', name: 'Resistencia al Agua', type: 'text', allowedValues: [], isGlobal: false },
        { id: 'prop_fragancia', name: 'Fragancia', type: 'text', allowedValues: [], isGlobal: false },
        { id: 'prop_volumen', name: 'Volumen', type: 'text', allowedValues: [], isGlobal: false }
    ],
    suppliers: [
        { id: 'sup01', name: 'Textiles del Sur', rating: 5, contact: 'info@textiles.com' },
        { id: 'sup02', name: 'Importadora Swiss', rating: 4, contact: 'ventas@swiss.com' },
        { id: 'sup03', name: 'Aromas del Mundo', rating: 5, contact: 'contacto@aromas.com' }
    ],
    variantSuppliers: { // Relación que indica qué proveedores ofrecen qué variantes
        'var001': [{ supplierId: 'sup01', cost: 10.00 }, { supplierId: 'sup02', cost: 10.50 }],
        'var002': [{ supplierId: 'sup01', cost: 10.00 }],
        'var003': [{ supplierId: 'sup01', cost: 11.00 }],
        'var004': [{ supplierId: 'sup02', cost: 70.00 }],
        'var005': [{ supplierId: 'sup03', cost: 35.00 }],
        'var006': [{ supplierId: 'sup01', cost: 25.00 }],
    },
    clients: [
        { id: 'cli001', name: 'Juan Pérez', contact: 'juan@example.com', balance: 50.00, rating: 5, transactions: [
            {date: '2025-06-01', amount: 150.00, type: 'compra', description: 'Compra Varias Remeras'},
            {date: '2025-06-15', amount: -100.00, type: 'pago', description: 'Pago Parcial'}
        ] },
        { id: 'cli002', name: 'María García', contact: 'maria@example.com', balance: -20.00, rating: 4, transactions: [
            {date: '2025-06-05', amount: 80.00, type: 'compra', description: 'Compra Perfume'}
        ] },
        { id: 'cli003', name: 'Carlos Ruíz', contact: 'carlos@example.com', balance: 0.00, rating: 3, transactions: [] },
    ],
    purchaseOrders: [
        { id: 'po001', supplierId: 'sup01', orderDate: '2025-06-10', status: 'Recibido', totalEstimatedAmount: 200.00, totalFinalAmount: 210.00, items: [
            { variantId: 'var001', quantityRequested: 10, estimatedCost: 10.00, finalCost: 10.00 },
            { variantId: 'var002', quantityRequested: 5, estimatedCost: 10.00, finalCost: 11.00 } // Simula un cambio de costo
        ] },
        { id: 'po002', supplierId: 'sup02', orderDate: '2025-06-15', status: 'Pendiente', totalEstimatedAmount: 70.00, totalFinalAmount: 0.00, items: [
            { variantId: 'var004', quantityRequested: 1, estimatedCost: 70.00, finalCost: 0.00 }
        ] },
    ],
    sales: [
        { id: 'sale001', userId: 'user003', date: '2025-06-26 10:30', totalAmount: 105.00, paymentMethod: 'Efectivo', items: [
            { variantId: 'var001', quantity: 1, price: 25.00 },
            { variantId: 'var005', quantity: 1, price: 80.00 }
        ] },
        { id: 'sale002', userId: 'user003', date: '2025-06-26 11:45', totalAmount: 25.00, paymentMethod: 'Tarjeta', items: [
            { variantId: 'var002', quantity: 1, price: 25.00 }
        ] },
    ],
    financialEntries: [
        { id: 'fe001', date: '2025-06-01', type: 'egreso', category: 'Alquiler', amount: 1500, description: 'Alquiler local', isFixedExpense: true, userId: 'user001' },
        { id: 'fe002', date: '2025-06-26', type: 'ingreso', category: 'ventas', amount: 105.00, description: 'Venta #001', relatedSaleId: 'sale001', userId: 'user003' },
    ],
    cashRegisterClosures: [
        // Simulación de un cierre anterior
        { id: 'crc001', userId: 'user003', closureDate: '2025-06-26 18:00', openingBalance: 100.00, closingBalance: 200.00, calculatedSalesAmount: 150.00, calculatedIncomeAmount: 0.00, calculatedExpenseAmount: 50.00, cashIn: 150.00, cashOut: 50.00, cashDifference: 0.00, paymentMethodBreakdown: {'Efectivo': 100, 'Tarjeta': 50}, notes: 'Cierre normal del día' },
    ],
    // Carrito de compras interno para Órdenes de Compra (se limpia al generar la orden)
    internalPurchaseCart: []
};

export { dataStore };
