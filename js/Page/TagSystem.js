'use strict';

import sectionRecipes from './sectionRecipes';
import Message from './Message';
import Utils from '../Utils/UtilsBase';
import Ingredients from '../filters/Ingredients';
import Appliances from '../filters/Appliances';
import Ustensils from '../filters/Ustensils';
import Logic from '../Utils/Logic';

export default class Tags {
    static hiddenIngredientsFilter = document.querySelector('#hiddenIngredientsFilter');
    static hiddenAppareilFilter = document.querySelector('#hiddenAppareilFilter');
    static hiddenUstensilesFilter = document.querySelector('#hiddenUstensilesFilter');

    // displays a badge containing the tag of the ingredient/appliance/ustensil that the user has selected
    static buildTags(elt, tag) {
        this.pushDownButtonsFilter();
        this.displayTag(elt);
        this.fillTag(elt, tag);
        return this;
    }

    static displayTag(elt) {
        return elt.style.display = 'flex';
    }

    // fill in the selected tag
    static fillTag(elt, tag) {
        return elt.innerHTML = tag + ` <i class='far fa-times-circle'></i>`;
    }

    // remove the tag and replace the ingredient/appliance/ustensil buttons
    static hideTag(elt) {
        this.pushUpButtonsFilter();

        return elt.style.display = 'none';
    }

    // push down the ingredient/appliance/ustensil buttons
    static pushDownButtonsFilter() {
        this.hiddenIngredientsFilter.style.top = '20rem';
        this.hiddenAppareilFilter.style.top = '20rem';
        this.hiddenUstensilesFilter.style.top = '20rem';
    }

    // push up the ingredient/appliance/ustensil buttons
    static pushUpButtonsFilter() {
        this.hiddenIngredientsFilter.style.top = '16.2rem';
        this.hiddenAppareilFilter.style.top = '16.2rem';
        this.hiddenUstensilesFilter.style.top = '16.2rem';
    }

    static removeTagsOnClick(tag, event, eltBadge, recipes) {
        tag.addEventListener('click', () => {
            this.resetSection(event, eltBadge, recipes);
        })
    }

    static resetSection(event, eltBadge, recipes) {
        event.target.classList.remove('selected');
        this.hideTag(eltBadge);
        Message.buildResultMessageWithResult(recipes);
        Utils.clearRecipesSection();
        sectionRecipes.buildResult(recipes);
        Utils.clearFilters(document.getElementById('ingredientsExample'));
        Ingredients.fillIngredients(Logic.getAllIngredients(recipes));
        Utils.clearFilters(document.getElementById('appareilExample'));
        Appliances.fillAppliances(Logic.getAllAppliances(recipes));
        Utils.clearFilters(document.getElementById('ustensilesExample'));
        Ustensils.fillUstensils(Logic.getAllUstensils(recipes));
    }
}