'use strict';

// import Appliances from '../filters/Appliances.js';
import Logic from '../Utils/Logic.js';
import sectionRecipes from './sectionRecipes.js';
// import Ingredients from '../filters/Ingredients.js';
import Message from './Message.js';
// import Ustensils from '../filters/Ustensils.js';

export default class Builder {
    static init() {
        // Build Section with all Recipes before Search
        sectionRecipes.buildResult(recipesApiResult);
        Message.hideMessage();
        // Ingredients logic
        Ingredients.init(Logic.getAllIngredients(recipesApiResult), recipesApiResult);
        // Appliances logic
        Appliances.init(Logic.getAllAppliances(recipesApiResult), recipesApiResult);
        // Ustensils logic
        Ustensils.init(Logic.getAllUstensils(recipesApiResult), recipesApiResult);
    }

    static initSearch(result) {
        // Build Section after Search
        sectionRecipes.buildResult(result.recipesMatched);
        Message.buildResultMessageWithResult(result.recipesMatched);
        // Ingredients logic
        Ingredients.init(result.ingredients, result.recipesMatched);
        // Appliances logic
        Appliances.init(result.appliances, result.recipesMatched);
        // Ustensils logic
        Ustensils.init(result.ustensils, result.recipesMatched);
    }
}