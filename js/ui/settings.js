// js/ui/settings.js
import { DataService } from '../data/dataService.js';

// DOM elements related to settings
const selectedCategoryNameSpan = document.getElementById('selectedCategoryName');
const propertiesListDiv = document.getElementById('propertiesList');

/**
 * Selects a category and displays its suggested properties.
 * This function is called directly from the HTML.
 * @param {string} categoryId The ID of the selected category.
 */
function selectCategory(categoryId) {
    const category = DataService.getCategories().find(c => c.id === categoryId);
    if (!category) {
        selectedCategoryNameSpan.textContent = 'Categoría no encontrada';
        propertiesListDiv.innerHTML = '<p class="text-[#6C757D]">Seleccione una categoría para ver sus propiedades sugeridas o añada una nueva.</p>';
        return;
    }

    selectedCategoryNameSpan.textContent = category.name;
    propertiesListDiv.innerHTML = ''; // Clears the existing property list

    if (category.suggestedPropertyDefinitionIds.length === 0) {
        propertiesListDiv.innerHTML = '<p class="text-[#6C757D]">Esta categoría no tiene propiedades sugeridas. Puede añadir nuevas.</p>';
        return;
    }

    category.suggestedPropertyDefinitionIds.forEach(propDefId => {
        const propDef = DataService.getPropertyDefinitions().find(pd => pd.id === propDefId);
        if (propDef) {
            const propDiv = document.createElement('div');
            propDiv.className = 'p-2 bg-white border border-[#E0E0E0] rounded-md shadow-sm flex justify-between items-center';
            let allowedValuesText = '';
            if (propDef.type === 'selection' && propDef.allowedValues && propDef.allowedValues.length > 0) {
                allowedValuesText = ` (Valores: ${propDef.allowedValues.join(', ')})`;
            }
            propDiv.innerHTML = `
                <span><strong>${propDef.name}</strong> <span class="text-xs text-[#6C757D]">(Tipo: ${propDef.type})${allowedValuesText}</span></span>
                <button class="text-[#007BFF] hover:text-[#0056b3] text-sm">Editar</button>
            `;
            propertiesListDiv.appendChild(propDiv);
        }
    });
}

// Exports the function so it can be called directly from HTML
export { selectCategory };
