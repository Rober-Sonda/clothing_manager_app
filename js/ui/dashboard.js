// js/ui/dashboard.js
import { DataService } from '../data/dataService.js';

let salesTrendChartInstance;
let topProductsChartInstance;

/**
 * Inicializa los gráficos de la sección Dashboard.
 * Destruye las instancias de gráficos existentes antes de crear nuevas para evitar duplicados.
 */
function initializeDashboardCharts() {
    // Destruye gráficos existentes para prevenir duplicación en el re-render
    if (salesTrendChartInstance) salesTrendChartInstance.destroy();
    if (topProductsChartInstance) topProductsChartInstance.destroy();

    const salesTrendCtx = document.getElementById('salesTrendChart').getContext('2d');
    salesTrendChartInstance = new Chart(salesTrendCtx, {
        type: 'line',
        data: {
            labels: ['Jun 20', 'Jun 21', 'Jun 22', 'Jun 23', 'Jun 24', 'Jun 25', 'Jun 26'],
            datasets: [{
                label: 'Ventas',
                data: [800, 1200, 1500, 1300, 1800, 1600, 1900],
                borderColor: '#007BFF', /* AppColors.primary */
                backgroundColor: 'rgba(0, 123, 255, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
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

    const topProductsCtx = document.getElementById('topProductsChart').getContext('2d');
    topProductsChartInstance = new Chart(topProductsCtx, {
        type: 'bar',
        data: {
            labels: ['Remera Básica', 'Perfume Cítrico', 'Reloj Cronógrafo', 'Pantalón Cargo', 'Zapatillas'],
            datasets: [{
                label: 'Unidades Vendidas',
                data: [120, 85, 70, 65, 50],
                backgroundColor: ['#007BFF', '#28A745', '#FFC107', '#DC3545', '#6F42C1'],
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y', // Hace que las barras sean horizontales
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.x + ' unidades';
                        }
                    }
                }
            }
        }
    });
}

export { initializeDashboardCharts };
