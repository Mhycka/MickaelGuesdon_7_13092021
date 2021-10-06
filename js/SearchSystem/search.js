// 'use strict';

import Logic from '../UtilsElt/Logic.js';
import Utils from '../UtilsElt/UtilsBase.js';

export default class Search {
    static searchMainInput(value) {
        let recipesMatched = [];

        recipesData.forEach(recipe => {
            if (Utils.normalizeText(recipe.name).includes(Utils.normalizeText(value)) || Utils.normalizeText(recipe.description).includes(Utils.normalizeText(value)) || recipe.ingredients.some(elt => Utils.normalizeText(elt.ingredient).includes(value))) {
                recipesMatched.push(recipe);
            };
        });
        return {
            'recipesMatched': recipesMatched,
            'ingredients': Logic.getAllIngredients(recipesMatched),
            'appliances': Logic.getAllAppliances(recipesMatched),
            'ustensils': Logic.getAllUstensils(recipesMatched),
        };
    }

     // search by each input 
    static searchInputFilters(collection, value) {
        let resultInput = [];
        collection.forEach(elt => {
            if (Utils.normalizeText(elt).includes(Utils.normalizeText(value))) {
                resultInput.push(elt);
            };
        });

        return resultInput;
    }

    // ingredients tag
    static searchByIngTags(recipes, tagIng) {
        let resultIng = [];

        recipes.forEach(recipe => {
            if (recipe.ingredients.some(elt => Utils.normalizeText(elt.ingredient).includes(tagIng))) {
                resultIng.push(recipe);
            }
        });

        return resultIng;
    }

     // appliances tag
    static searchByAppTags(recipes, tagApp) {
        let resultApp = [];

        recipes.forEach(recipe => {
            if (Utils.normalizeText(recipe.appliance).includes(tagApp)) {
                resultApp.push(recipe);
            }
        });

        return resultApp;
    }

    // ustensils tag
    static searchByUstTags(recipes, tagUst) {
        let resultUst = [];

        recipes.forEach(recipe => {
            recipe.ustensils.forEach(ust => {
                if (Utils.normalizeText(ust).includes(tagUst)) {
                    resultUst.push(recipe);
                }
            });
        });

        return resultUst;
    }
}