// js/ui/cashClosure.js
import { DataService } from '../data/dataService.js';

/**
 * Renderiza la sección de cierre de caja, mostrando el resumen del turno.
 */
function renderCashClosureSection() {
    // Los datos de esta sección son mayormente estáticos para propósitos de demo,
    // pero muestran dónde irían los cálculos dinámicos.
    
    // Simulación de las ventas del usuario actual para un día específico
    const currentSales = DataService.getSales().filter(s => s.userId === 'user003' && s.date.includes('2025-06-26')); // Filtra por fecha y usuario
    const totalSalesAmount = currentSales.reduce((sum, sale) => sum + sale.totalAmount, 0);

    // Simulación de entradas financieras del usuario actual para un día específico
    const currentFinancialEntries = DataService.getFinancialEntries().filter(fe => fe.userId === 'user003' && fe.date.includes('2025-06-26'));
    const totalIncomes = currentFinancialEntries.filter(fe => fe.type === 'ingreso').reduce((sum, fe) => sum + fe.amount, 0);
    const totalExpenses = currentFinancialEntries.filter(fe => fe.type === 'egreso').reduce((sum, fe) => sum + fe.amount, 0);

    const openingBalance = 100.00; // Saldo inicial simulado
    const calculatedBalance = openingBalance + totalSalesAmount + totalIncomes - totalExpenses;

    // Actualiza los elementos DOM con los datos calculados/simulados
    document.querySelector('#cash_closure-section .space-y-2 p:nth-child(2)').textContent = `Usuario: ${DataService.getUsers().find(u => u.id === 'user003')?.username || 'N/A'}`;
    document.querySelector('#cash_closure-section .space-y-2 p:nth-child(3)').textContent = `Fecha/Hora de Apertura: ${'2025-06-27 09:00 AM'}`;
    document.querySelector('#cash_closure-section .space-y-2 p:nth-child(4)').textContent = `Saldo Inicial: $${openingBalance.toFixed(2)}`;
    document.querySelector('#cash_closure-section .space-y-2 p:nth-child(5)').textContent = `Ventas Registradas: $${totalSalesAmount.toFixed(2)}`;
    document.querySelector('#cash_closure-section .space-y-2 p:nth-child(6)').textContent = `Otros Ingresos: $${totalIncomes.toFixed(2)}`;
    document.querySelector('#cash_closure-section .space-y-2 p:nth-child(7)').textContent = `Egresos Registrados: $${totalExpenses.toFixed(2)}`;
    
    // Actualiza el total del carrito en la sección de Ventas (POS) si está visible
    const salesCartTotalElement = document.getElementById('salesCartTotal');
    if (salesCartTotalElement) {
        salesCartTotalElement.textContent = `$${totalSalesAmount.toFixed(2)}`;
    }
    
    document.querySelector('#cash_closure-section .font-bold.text-lg').textContent = `Saldo Calculado: $${calculatedBalance.toFixed(2)}`;
}

export { renderCashClosureSection };
