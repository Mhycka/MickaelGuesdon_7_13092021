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
            // console.log(recipe.ingredients);
            for(const ing of recipe.ingredients){
                if (!ingredients.includes(ing.ingredient.toLowerCase()))
                    ingredients.push(ing.ingredient.toLowerCase());
            }
        }
        return ingredients;
    }

    static getAllAppliances(app) {
        let appliances = [];
        app.forEach((recipe) => {
            if (!appliances.includes(recipe.appliance.toLowerCase()))
                appliances.push(recipe.appliance.toLowerCase());
        });
        return appliances;
    }

    static getAllUstensils(ust) {
        let ustensils = [];
        ust.forEach((recipe) => {
            recipe.ustensils.forEach((ustensil) => {
                if (!ustensils.includes(ustensil.toLowerCase()))
                    ustensils.push(ustensil.toLowerCase());
            });
        });
        return ustensils;
    }
}