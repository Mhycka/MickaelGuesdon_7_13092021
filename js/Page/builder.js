// 'use strict';

import Appliances from '../filters/Appliances.js';
import Logic from '../UtilsElt/Logic.js';
import sectionRecipesCard from './sectionRecipes.js';
import Ingredients from '../filters/Ingredients.js';
import MessageAlert from './Message.js';
import Ustensils from '../filters/Ustensils.js';

export default class builder {
    // Build Section before search system
    static init() {
        sectionRecipesCard.buildResult(recipesData);
        MessageAlert.hideMessage();
        Ingredients.init(Logic.getAllIngredients(recipesData), recipesData);
        Appliances.init(Logic.getAllAppliances(recipesData), recipesData);
        Ustensils.init(Logic.getAllUstensils(recipesData), recipesData);
    }

    // Build Section after search system
    static initSearch(result) {
        sectionRecipesCard.buildResult(result.recipesMatched);
        MessageAlert.buildResultMessageWithResult(result.recipesMatched);
        Ingredients.init(result.ingredients, result.recipesMatched);
        Appliances.init(result.appliances, result.recipesMatched);
        Ustensils.init(result.ustensils, result.recipesMatched);
    }
}