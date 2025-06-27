// js/ui/sales.js
import { DataService } from '../data/dataService.js';

// Aquí se podría implementar la lógica del punto de venta (POS)
// Por ahora, es principalmente HTML estático con un cálculo de total simple.

const salesCartList = document.getElementById('salesCartList');
const salesCartTotal = document.getElementById('salesCartTotal');

/**
 * Función para simular la actualización del carrito de ventas.
 * En una aplicación real, esto se llamaría al agregar/quitar productos.
 */
function updateSalesCart() {
    // Datos mock del carrito, en una app real vendrían de un estado de ventas activo
    const cartItems = [
        { name: 'Remera Básica (M, Rojo)', price: 25.00, quantity: 1 },
        { name: 'Perfume Cítrico (100ml)', price: 80.00, quantity: 1 }
    ];

    salesCartList.innerHTML = '';
    let total = 0;

    cartItems.forEach(item => {
        const li = document.createElement('li');
        li.className = 'flex justify-between items-center';
        li.innerHTML = `<span>${item.name} x${item.quantity}</span> <span class="font-bold">$${item.price.toFixed(2)}</span>`;
        salesCartList.appendChild(li);
        total += item.price * item.quantity;
    });

    salesCartTotal.textContent = `$${total.toFixed(2)}`;
}

// Puedes llamar a esta función si la sección de ventas se activa,
// aunque para esta demo, los valores iniciales son estáticos en el HTML.
// Si se implementara una búsqueda real de productos para añadir al carrito,
// se añadiría más lógica aquí.
// updateSalesCart();

// Exporta funciones si necesitas llamarlas desde fuera de este módulo
export { updateSalesCart };
