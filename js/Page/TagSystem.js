// 'use strict';

import sectionRecipesCard from './sectionRecipes.js';
import MessageAlert from './Message.js';
import Utils from '../UtilsElt/UtilsBase.js';
import Ingredients from '../filters/Ingredients.js';
import Appliances from '../filters/Appliances.js';
import Ustensils from '../filters/Ustensils.js';
import Logic from '../UtilsElt/Logic.js';

export default class Tags {
    static hiddenIngredientsFilter = document.querySelector('#ingredientsHide');
    static hiddenAppliancesFilter = document.querySelector('#appliancesHide');
    static hiddenUstensilesFilter = document.querySelector('#ustensilesHide');

    // displays a badge whose selected
    static buildTags(elt, tag, recipes) {
        this.pushDownButtonsFilter();
        // this.displayTag(elt);
        this.fillTag(elt, tag, recipes);
        return this;
    }

    // static displayTag(elt) {
    //     if(elt.style.display ='none') {
    //         return elt.style.display = 'flex';
    //     }
    // }

    // fill in the selected tag
    static fillTag(elt, tag) {
        let ingredientsList = document.querySelectorAll('.listUlIng > li');
        let appliancesList = document.querySelectorAll('.listUlApp > li');
        let ustensilsList = document.querySelectorAll('.listUlUst > li');

        ingredientsList.forEach((ingredient) => {
            if(ingredient.hasAttribute('data-filter') && ingredient.classList.contains('selected')) {
                return elt.innerHTML += `<div class="ingredientTag">${tag} <i class='far fa-times-circle'></i></div>`;
    
            }
        });

        appliancesList.forEach((appliance) => {
            if(appliance.hasAttribute('data-filter') && appliance.classList.contains('selected')) {
                return elt.innerHTML += `<div class="appliancesTag">${tag} <i class='far fa-times-circle'></i></div>`;
            }
            
        });

        ustensilsList.forEach((ustensil) => {
            if(ustensil.hasAttribute('data-filter') && ustensil.classList.contains('selected')) {
                return elt.innerHTML += `<div class="ustensilsTag">${tag} <i class='far fa-times-circle'></i></div>`;
            }
        })

    }

    // remove the tag
    static hideTag(elt) {
        this.pushUpButtonsFilter();
        return elt.style.display = 'none';
    }

    static pushDownButtonsFilter() {
        this.hiddenIngredientsFilter.style.top = '0rem';
        this.hiddenAppliancesFilter.style.top = '0rem';
        this.hiddenUstensilesFilter.style.top = '0rem';
    }

    static pushUpButtonsFilter() {
        this.hiddenIngredientsFilter.style.top = '0rem';
        this.hiddenAppliancesFilter.style.top = '0rem';
        this.hiddenUstensilesFilter.style.top = '0rem';
    }

    static removeTagsOnClick(tag, event, eltBadge, recipes) {
        tag.addEventListener('click', () => {
            // console.log(selected)
            this.resetSection(event, eltBadge, recipes);

            // location.reload();
        })
    }

    static resetSection(event, eltBadge, recipes) {
        event.target.classList.remove('selected');
        this.hideTag(eltBadge);
        MessageAlert.buildResultMessageWithResult(recipes);
        Utils.clearRecipesSection();
        sectionRecipesCard.buildResult(recipes);
        Utils.clearFilters(document.getElementById('ingredientsExample'));
        Ingredients.fillIngredients(Logic.getAllIngredients(recipes));
        Utils.clearFilters(document.getElementById('appliancesExample'));
        Appliances.fillAppliances(Logic.getAllAppliances(recipes));
        Utils.clearFilters(document.getElementById('ustensilesExample'));
        Ustensils.fillUstensils(Logic.getAllUstensils(recipes));
    }
}