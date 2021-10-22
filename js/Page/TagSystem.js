// 'use strict';

import sectionRecipesCard from './sectionRecipes.js';
import MessageAlert from './Message.js';
import Utils from '../UtilsElt/UtilsBase.js';
import Ingredients from '../filters/Ingredients.js';
import Appliances from '../filters/Appliances.js';
import Ustensils from '../filters/Ustensils.js';
import Logic from '../UtilsElt/Logic.js';

export default class Tags {
    static hiddenIngredientsFilter = document.querySelector('#ingredientHide');
    static hiddenAppliancesFilter = document.querySelector('#applianceHide');
    static hiddenUstensilesFilter = document.querySelector('#ustensilHide');

    // displays a badge whose selected
    static buildTags(elt, tag) {
        this.pushDownButtonsFilter();
        // this.displayTag(elt);
        this.fillTag(elt, tag);
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
        
        // console.log(elt)
        // console.log(ingredientsList)

        ingredientsList.forEach((ingredient) => {
            if(ingredient.hasAttribute('data-filter') && ingredient.classList.contains('selected')) {
                // ingredientsList.tag.remove();
                return elt.innerHTML += `<div class="ingredientTag" id="tagElt">${tag} <i class='far fa-times-circle' ></i></div>`;
            }
        });

        appliancesList.forEach((appliance) => {
            if(appliance.hasAttribute('data-filter') && appliance.classList.contains('selected')) {
                return elt.innerHTML += `<div class="applianceTag" id="tagElt">${tag} <i class='far fa-times-circle' ></i></div>`;
            }
        });

        ustensilsList.forEach((ustensil) => {
            if(ustensil.hasAttribute('data-filter') && ustensil.classList.contains('selected')) {
                return elt.innerHTML += `<div class="ustensilTag" id="tagElt">${tag} <i class='far fa-times-circle' ></i></div>`;
            }
        })
    }

    // remove the tag
    static hideTag() {
        this.pushUpButtonsFilter();
        let tag = document.getElementById("tagElt");
        tag.remove();
        // return elt.style.display = 'none';

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

    static removeTagsOnClick(event, eltBadge, recipes) {
        let tagToClose = document.querySelectorAll('#tagElt');
        tagToClose.forEach((tag) => {
            tag.addEventListener('click', () => {
                this.resetSection(event, eltBadge, recipes);
            })
        })
    }

    static resetSection(event, eltBadge, recipes) {
        event.target.classList.remove('selected');
        this.hideTag(eltBadge);
        MessageAlert.buildResultMessageWithResult(recipes);
        Utils.clearRecipesSection();
        sectionRecipesCard.buildResult(recipes);
        Utils.clearFilters(document.getElementById('ingredientExample'));
        Ingredients.fillIngredients(Logic.getAllIngredients(recipes));
        Utils.clearFilters(document.getElementById('applianceExample'));
        Appliances.fillAppliances(Logic.getAllAppliances(recipes));
        Utils.clearFilters(document.getElementById('ustensilExample'));
        Ustensils.fillUstensils(Logic.getAllUstensils(recipes));
    }
}