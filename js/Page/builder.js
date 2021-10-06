// 'use strict';

import Appliances from '../filters/Appliances.js';

import Logic from '../UtilsElt/Logic.js';
import sectionRecipesCard from './sectionRecipes.js';
import Ingredients from '../filters/Ingredients.js';
import MessageAlert from './Message.js';
import Ustensils from '../filters/Ustensils.js';

export default class builder {
    static init() {
        // Build Section with all Recipes before Search
        sectionRecipesCard.buildResult(recipesData);
        MessageAlert.hideMessage();
        // Ingredients logic
        Ingredients.init(Logic.getAllIngredients(recipesData), recipesData);
        // Appliances logic
        Appliances.init(Logic.getAllAppliances(recipesData), recipesData);
        // Ustensils logic
        Ustensils.init(Logic.getAllUstensils(recipesData), recipesData);
    }

    static initSearch(result) {
        // Build Section after Search
        sectionRecipesCard.buildResult(result.recipesMatched);
        MessageAlert.buildResultMessageWithResult(result.recipesMatched);
        // Ingredients logic
        Ingredients.init(result.ingredients, result.recipesMatched);
        // Appliances logic
        Appliances.init(result.appliances, result.recipesMatched);
        // Ustensils logic
        Ustensils.init(result.ustensils, result.recipesMatched);
    }
}