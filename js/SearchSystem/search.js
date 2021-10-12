// 'use strict';

import Logic from '../UtilsElt/Logic.js';
import Utils from '../UtilsElt/UtilsBase.js';

export default class Search {
    static searchMainInput(value) {
        let recipesMatchedArray = [];
        // recipesData.forEach(recipe => {
        //     if (Utils.normalizeText(recipe.name).includes(Utils.normalizeText(value)) || Utils.normalizeText(recipe.description).includes(Utils.normalizeText(value)) || recipe.ingredients.some(elt => Utils.normalizeText(elt.ingredient).includes(value))) {
        //         recipesMatchedArray.push(recipe);
        //     };
        // });
        for (const recipe of recipesData){
            if (Utils.normalizeText(recipe.name).includes(Utils.normalizeText(value)) || Utils.normalizeText(recipe.description).includes(Utils.normalizeText(value)) || recipe.ingredients.some(elt => Utils.normalizeText(elt.ingredient).includes(value))) {
                recipesMatchedArray.push(recipe);
            }
        }
        return {
            'recipesMatchedArray': recipesMatchedArray,
            'ingredients': Logic.getAllIngredients(recipesMatchedArray),
            'appliances': Logic.getAllAppliances(recipesMatchedArray),
            'ustensils': Logic.getAllUstensils(recipesMatchedArray),
        };
    }
    

        
    

     // search by each input 
    static searchInputFilters(collection, value) {
        let resultInput = [];
        // collection.forEach(elt => {
        //     if (Utils.normalizeText(elt).includes(Utils.normalizeText(value))) {
        //         resultInput.push(elt);
        //     };
        // });
        for (const elt of collection){
            if (Utils.normalizeText(elt).includes(Utils.normalizeText(value))) {
                resultInput.push(elt);
            }
        }
        return resultInput;
    }

    // ingredients tag
    static searchByIngTags(recipes, tagIng) {
        let resultIngredients = [];
        // console.log(tagIng)
        // console.log(recipes)

        // recipes.forEach(recipe => {
        //     if (recipe.ingredients.some(elt => Utils.normalizeText(elt.ingredient).includes(tagIng))) {
        //         resultIngredients.push(recipe);
        //     }
        // });
        // console.log(recipes.length , tagIng)

        for(const recipe of recipes){
            // console.log(recipe)


            //For par rapport au Tag (1 - 2...)
                //recipe.ingredients.include(tag)
                    //PUSH (AREFLEICHIR)



            for(const elt of recipe.ingredients){
                let test = Utils.normalizeText(elt.ingredient);
                if( tagIng.includes(test)){
                    // console.log(test )
                    resultIngredients.push(recipe);
                }
                

                // if (Utils.normalizeText(elt.ingredient).includes(tagIng) ) {
               
                //         resultIngredients.push(recipe);
                //     }
            }

            // recipe.ingredients.some(elt => {
                
            // })
            // if (recipe.ingredients.some(elt => Utils.normalizeText(elt.ingredient).includes(tagIng) )) {
               
            //     resultIngredients.push(recipe);
            // }
        }
        
        return resultIngredients;
    }

     // appliances tag
    static searchByAppTags(recipes, tagApp) {
        let resultAppliances = [];
        // recipes.forEach(recipe => {
        //     if (Utils.normalizeText(recipe.appliance).includes(tagApp)) {
        //         resultAppliances.push(recipe);
        //     }
        // });
        for(const recipe of recipes) {
            if (Utils.normalizeText(recipe.appliance).includes(tagApp)) {
                resultAppliances.push(recipe);
            }
        }
        return resultAppliances;
    }

    // ustensils tag
    static searchByUstTags(recipes, tagUst) {
        let resultUstensils = [];

        // recipes.forEach(recipe => {
        //     recipe.ustensils.forEach(ust => {
        //         if (Utils.normalizeText(ust).includes(tagUst)) {
        //             resultUstensils.push(recipe);
        //         }
        //     });
        // });
        for(const recipe of recipes){
            for(const ust of recipe.ustensils) {
                if (Utils.normalizeText(ust).includes(tagUst)) {
                    resultUstensils.push(recipe);
                }
            }
        }
        return resultUstensils;
    }
}