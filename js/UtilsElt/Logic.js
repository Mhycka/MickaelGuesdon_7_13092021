// 'use strict';

export default class Logic {
    // get all the recipes for each categories for create by default
    static getAllIngredients(ing) {
        let ingredients = [];
        // ing.forEach((recipe) => {
        //     recipe.ingredients.forEach((ing) => {
        //         if (!ingredients.includes(ing.ingredient.toLowerCase()))
        //             ingredients.push(ing.ingredient.toLowerCase());
        //     });
        // });
        for(const recipe of ing){
            for(const ing of recipe.ingredients){
                if (!ingredients.includes(ing.ingredient.toLowerCase()))
                    ingredients.push(ing.ingredient.toLowerCase());
            }
        }
        return ingredients;
    }

    static getAllAppliances(app) {
        let appliances = [];
        // app.forEach((recipe) => {
        //     if (!appliances.includes(recipe.appliance.toLowerCase()))
        //         appliances.push(recipe.appliance.toLowerCase());
        // });
        for(const recipe of app){
            if (!appliances.includes(recipe.appliance.toLowerCase()))
                appliances.push(recipe.appliance.toLowerCase());
        }
        return appliances;
    }

    static getAllUstensils(ust) {
        let ustensils = [];
        // console.log(ust)
        // ust.forEach((recipe) => {
        //     recipe.ustensils.forEach((ustensil) => {
        //         if (!ustensils.includes(ustensil.toLowerCase()))
        //             ustensils.push(ustensil.toLowerCase());
        //     });
        // });
        for(const recipe of ust){
            for(const ust of recipe.ustensils){
                if (!ustensils.includes(ust.toLowerCase()))
                    ustensils.push(ust.toLowerCase());  
            }        
        }
        return ustensils;
    }
}