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


    // static searchByTags (recipes, tagIng, tagApp, tagUst) {
    //     let result
    //     // console.log(tagIng)
    //     // console.log(tagApp)
    //     // console.log(tagUst)

    //     const tag = Array.prototype.push.apply(tagIng ,tagApp, tagUst);
    //     console.log(tag)
    // }




    // ingredients tag
    static searchByIngTags(recipes, tagIng) {
        let resultIngredients = [];
       
        for(const recipe of recipes){

            //For par rapport au Tag (1 - 2...)
                //recipe.ingredients.include(tag)
                    //PUSH (AREFLEICHIR)
    
            for(const elt of recipe.ingredients){
                // console.log(elt)
                let test = Utils.normalizeText(elt.ingredient);


                for (const tag of tagIng) {
                    // console.log(tag)
                    // if(tagIng.includes(tag) ) {
                    //     console.log('true')
                    // }

                    if( tagIng.includes(test)){
                        // console.log(recipe)
                        resultIngredients.push(recipe);            
                    }
                }
                // if( tagIng.includes(test)){
                //     resultIngredients.push(recipe);            
                // }
            }
        }
        console.log(resultIngredients)
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
        console.log(resultAppliances)
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
        console.log(resultUstensils)
        return resultUstensils;
    }
}