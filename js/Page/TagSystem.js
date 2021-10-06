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
            this.resetSection(event, eltBadge, recipes);
            location.reload();

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