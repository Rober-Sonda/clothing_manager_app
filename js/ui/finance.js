// js/ui/finance.js
import { DataService } from '../data/dataService.js';

let financeChartInstance;
let expensesChartInstance;

/**
 * Initializes the charts for the Finance section.
 * Destroys existing chart instances before creating new ones to prevent duplicates.
 */
function initializeFinanceCharts() {
    // Destroy existing charts to prevent duplication on re-render
    if (financeChartInstance) financeChartInstance.destroy();
    if (expensesChartInstance) expensesChartInstance.destroy();

    const financeCtx = document.getElementById('financeChart').getContext('2d');
    financeChartInstance = new Chart(financeCtx, {
        type: 'bar',
        data: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
            datasets: [
                { label: 'Ingresos', data: [12000, 19000, 15000, 21000, 18000, 24000], backgroundColor: '#28A745' },
                { label: 'Egresos', data: [8000, 11000, 9500, 12000, 10000, 13000], backgroundColor: '#DC3545' }
            ]
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
                            return context.dataset.label + ': $' + context.parsed.y.toFixed(2);
                        }
                    }
                }
            }
        }
    });

    const expensesCtx = document.getElementById('expensesChart').getContext('2d');
    expensesChartInstance = new Chart(expensesCtx, {
        type: 'doughnut',
        data: {
            labels: ['Alquiler', 'Salarios', 'Compras', 'Servicios', 'Marketing'],
            datasets: [{
                data: [4000, 6000, 8500, 1500, 1000],
                backgroundColor: ['#DC3545', '#FFC107', '#6F42C1', '#007BFF', '#28A745']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            // Displays the category name, value, and percentage
                            const total = context.dataset.data.reduce((acc, value) => acc + value, 0);
                            const percentage = ((context.parsed / total) * 100).toFixed(1);
                            return `${context.label}: $${context.parsed.toFixed(2)} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

export { initializeFinanceCharts };
